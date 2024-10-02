import { Database } from '@/modules/database/database.types';
import { Kysely } from 'kysely';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .alterTable('contact_lists')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable('campaigns')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable('email_templates')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema
    .alterTable('contact_lists')
    .dropColumn('project_id')
    .execute();

  await db.schema.alterTable('campaigns').dropColumn('project_id').execute();

  await db.schema
    .alterTable('email_templates')
    .dropColumn('project_id')
    .execute();
};
