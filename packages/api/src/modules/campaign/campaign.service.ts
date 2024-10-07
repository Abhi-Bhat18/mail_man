import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewCampaign } from '@/schemas/campaign.schema';

@Injectable()
export class CampaignService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private databaseService: DatabaseService) {}

  onModuleInit() {
    this.db = this.databaseService.getDb();
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
        'c.status'
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
}
