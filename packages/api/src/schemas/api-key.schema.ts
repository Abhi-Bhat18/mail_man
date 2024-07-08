import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface ApiKeyTable {
  id: string;
  created_by: string;
  api_access_key: string;
  api_secrete_key: string;
  project_id: string;
  updated_at: ColumnType<Date, string | undefined, string>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ApiKey = Selectable<ApiKeyTable>;
export type NewApiKey = Insertable<ApiKeyTable>;
export type ApiKeyUpdate = Updateable<ApiKeyTable>;
