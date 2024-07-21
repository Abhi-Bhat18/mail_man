import { AndWrapper, Kysely } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .alterTable('projects')
    .addColumn('description', 'varchar', (col) => col.notNull())
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.alterTable('projects').dropColumn('description').execute();
};
