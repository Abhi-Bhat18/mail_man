import { Kysely } from "kysely";

export const up = async (db : Kysely<any>) =>{ 
    await db.schema
    .alterTable('project_accesses')
    .renameColumn('grated_by','granted_by')
    .execute();
}
