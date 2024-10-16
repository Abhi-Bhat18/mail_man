import { Database } from '@/modules/database/database.types';
import { Kysely } from 'kysely';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .alterTable('contact_list_memberships')
    .dropColumn('project_id')
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema
    .alterTable('contact_list_memberships')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .execute();
};
