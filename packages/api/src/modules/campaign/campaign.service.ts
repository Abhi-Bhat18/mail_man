import {
  Injectable,
  OnModuleInit,
  Logger,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewCampaign } from '@/schemas/campaign.schema';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { NewEmail } from '@/schemas/email.schema';
import { generateUlid } from '@/utils/generators';
import { CreateCampaignDto } from './dto/newCampaign.dto';
import { EmailTemplateService } from '../email-template/emailTemplate.service';

interface IBatchCampaign {
  id: string;
  name: string;
  subject: string;
  mail_from: string;
  html: string;
  contact_list_id: string;
}

@Injectable()
export class CampaignService implements OnModuleInit {
  private db: Kysely<Database>;
  private readonly logger = new Logger(CampaignService.name);
  private isProcessing = false;
  private batchSize = this.configService.get<number>('BATCH_SIZE') || 1;
  private maxConcurrentBatches =
    this.configService.get<number>('CONCURRENT_BATCHES') || 5;
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
    private configService: ConfigService,
    private templateService: EmailTemplateService,
  ) {}

  async onModuleInit() {
    this.db = this.databaseService.getDb();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processCampaigns() {
    if (this.isProcessing) {
      this.logger.debug('Already processing campaigns, skipping...');
      return;
    }

    try {
      this.isProcessing = true;
      await this.processScheduledCampaigns();
    } catch (error) {
      this.logger.error('Error processing campaigns', error.stack);
    } finally {
      this.isProcessing = false;
    }
  }
  async getAllCampaigns(project_id: string) {
    return await this.db
      .selectFrom('campaigns as c')
      .where('c.project_id', '=', project_id)
      .leftJoin('users as u', 'u.id', 'c.created_by')
      .leftJoin('contact_lists as cl', 'cl.id', 'c.contact_list_id')
      .leftJoin('email_templates as et', 'et.id', 'c.template_id')
      .select([
        'c.name',
        'c.id',
        'c.subject',
        'c.mail_from',
        'u.first_name',
        'u.last_name',
        'c.created_by',
        'et.name as template_name',
        'c.template_id',
        'c.contact_list_id',
        'cl.name as contact_list_name',
        'c.scheduled_at',
        'c.status',
      ])
      .execute();
  }

  async createCampaign(values: NewCampaign) {
    return await this.db
      .insertInto('campaigns')
      .values(values)
      .returningAll()
      .executeTakeFirst();
  }

  async getACampaign(id: string) {
    return await this.db
      .selectFrom('campaigns')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  private async processScheduledCampaigns() {
    const campaigns = await this.db
      .selectFrom('campaigns')
      .leftJoin(
        'email_templates',
        'email_templates.id',
        'campaigns.template_id',
      )
      .select([
        'campaigns.name',
        'campaigns.id',
        'campaigns.contact_list_id',
        'campaigns.mail_from',
        'campaigns.subject',
        'email_templates.html',
      ])
      .where('campaigns.status', '=', 'scheduled')
      .where('campaigns.scheduled_at', '<=', new Date())
      .limit(5)
      .execute();

    await Promise.all(
      campaigns.map((campaign) => this.processCampaign(campaign)),
    );
  }

  private async processCampaign(campaign: IBatchCampaign) {
    this.logger.log(`Processing campaign ${campaign.name}`);

    await this.db
      .updateTable('campaigns')
      .set({ status: 'in_progress' })
      .where('id', '=', campaign.id)
      .execute();

    try {
      let processed = 0;
      let hasMore = true;

      while (hasMore) {
        const batch = await this.prepareBatch(
          campaign.contact_list_id,
          processed,
        );

        console.log('Batches', batch);

        if (batch.length === 0) {
          hasMore = false;
          break;
        }

        await this.processBatch(batch, campaign);
        processed += batch.length;

        this.logger.debug(
          `Processed ${processed} contacts for campaign ${campaign.id}`,
        );
      }

      await this.db
        .updateTable('campaigns')
        .set({
          status: 'completed',
        })
        .where('id', '=', campaign.id)
        .execute();
    } catch (error) {
      await this.db
        .updateTable('campaigns')
        .set({
          status: 'failed',
        })
        .where('id', '=', campaign.id)
        .execute();

      this.logger.error(`Campaign ${campaign.id} failed`, error.stack);
    }
  }

  private async prepareBatch(contact_list_id: string, processed: number) {
    const contacts = await this.db
      .selectFrom('contact_list_memberships as clm')
      .where('clm.contact_list_id', '=', contact_list_id)
      .leftJoin('contacts', 'contacts.id', 'clm.contact_id')
      .select(['contact_id', 'contacts.email'])
      .offset(processed)
      .limit(this.batchSize)
      .execute();

    return contacts;
  }

  private async processBatch(
    batch: Array<{ contact_id: string; email: string }>,
    campaign: IBatchCampaign,
  ): Promise<void> {
    const results = await Promise.allSettled(
      batch.map((contact) =>
        this.sendEmailToCampaignContact(contact, campaign),
      ),
    );

    const updatePromises = results.map((result, index) => {
      const contact = batch[index];

      if (result.status === 'fulfilled') {
        return this.createEmailRecord({
          id: generateUlid(),
          campaign_id: campaign.id,
          email: contact.email,
          status: 'sent',
        });
      } else {
        return this.createEmailRecord({
          id: generateUlid(),
          campaign_id: campaign.id,
          email: contact.email,
          status: 'failed',
        });
      }
    });

    await Promise.all(updatePromises);
  }

  private async sendEmailToCampaignContact(
    contact: { contact_id: string; email: string },
    campaign: IBatchCampaign,
  ) {
    return this.emailService.sendEmail(
      contact.email,
      campaign.subject,
      '',
      campaign.html,
      campaign.mail_from,
    );
  }

  async sendTestCampaignEmail(body: CreateCampaignDto, email: string) {
    // get the template and mailfrom
    const { mail_from, subject, template_id } = body;

    // get the tempalte
    const template = await this.templateService.getATemplateById(template_id);

    if (!template) throw new NotFoundException();

    // send the email
    const info = await this.emailService.sendEmail(
      'to',
      subject,
      '',
      template.html,
      email,
    );
  }

  private async createEmailRecord(emailRecord: NewEmail) {
    await this.db.insertInto('emails').values(emailRecord).execute();
  }

  async deleteCampaigns() {
    const deletedCampaigns = await this.db
      .deleteFrom('campaigns')
      .returningAll()
      .execute();
    return deletedCampaigns;
  }
}
