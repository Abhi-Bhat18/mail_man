import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely, sql } from 'kysely';
import { Database } from '../database/database.types';
import { NewEmailTemplate } from '@/schemas/email-template.schema';
import { EmailTemplateQueryDto } from './dto/emailTemplateQuery.dto';

@Injectable()
export class EmailTemplateService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async getATemplateById(id: string) {
    return await this.db
      .selectFrom('email_templates as et')
      .where('et.id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async getAllTemplates(query: EmailTemplateQueryDto) {
    const { project_id } = query;

    return await this.db
      .selectFrom('email_templates as et')
      .where('et.project_id', '=', project_id)
      .innerJoin('users as u', 'u.id', 'et.created_by')
      .select([
        'et.id',
        'et.name',
        'et.status',
        'et.created_at',
        'et.updated_at',
        'et.json',
        'et.created_by',
        'u.first_name',
        'u.last_name',
      ])
      .execute();
  }

  async searchByName(query: string) {
    const searchPattern = `%${query}%`;
    const result = await this.db
      .selectFrom('email_templates')
      .where(
        ({ ref }) =>
          sql<boolean>`lower(${ref('name')}) like lower(${searchPattern})`,
      )
      .select(['id', 'name' ])
      .execute();
    console.log('Result', result);

    return result;
  }

  async insertTemplate(values: NewEmailTemplate) {
    return await this.db
      .insertInto('email_templates')
      .values(values)
      .returningAll()
      .executeTakeFirst();
  }
}
