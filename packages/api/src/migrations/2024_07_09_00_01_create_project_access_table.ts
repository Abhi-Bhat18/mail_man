import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createTable('project_accesses')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('user_id', 'varchar', (col) => col.notNull())
    .addColumn('role_id', 'varchar', (col) => col.notNull())
    .addColumn('grated_by', 'varchar', (col) => col.notNull())
    .addColumn('grated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();
};

export const down = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('project_accesses').execute();
};
