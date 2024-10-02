import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ContactListQueryDto } from './dto/contactListQuery.dto';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewContactList } from '@/schemas/contact-list.schema';

@Injectable()
export class ContactListService implements OnModuleInit {
  private db: Kysely<Database>;
  constructor(private dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }
  async getContactLists(query: ContactListQueryDto) {
    let { page, page_limit } = query;
    const { project_id } = query;

    page = Number(page) || 1;
    page_limit = Number(page_limit) || 10;

    return await this.db
      .selectFrom('contact_lists as cl')
      .where('cl.project_id', '=', project_id)
      .leftJoin('users as u', 'u.id', 'cl.created_by')
      .select([
        'cl.id as id',
        'cl.name as name',
        'cl.email_type as email_type',
        'cl.email_opt_in as email_opt_in',
        'cl.status',
        'cl.total_contacts',
        'u.first_name',
        'u.last_name',
        'cl.created_by',
        'cl.created_at'
      ])
      .offset((page - 1) * page_limit)
      .limit(page_limit)
      .execute();
  }

  async createContactList(body: NewContactList) {
    return await this.db
      .insertInto('contact_lists')
      .values(body)
      .returningAll()
      .executeTakeFirst();
  }
}
