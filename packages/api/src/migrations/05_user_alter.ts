import { Database } from '@/modules/database/database.types';
import { Kysely } from 'kysely';

export const up = async (db: Kysely<Database>) => {
  await db.schema.alterTable('users').addColumn('contact', 'varchar').execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.alterTable('users').dropColumn('contact').execute();
};
