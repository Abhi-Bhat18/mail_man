import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface EmailTemplateTable {
  id: string;
  html: string;
  created_by: string;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Email = Selectable<EmailTemplateTable>;
export type NewEmail = Insertable<EmailTemplateTable>;
export type EmailUpdate = Updateable<EmailTemplateTable>;
