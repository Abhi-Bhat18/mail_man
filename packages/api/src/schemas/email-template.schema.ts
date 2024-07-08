import {
    ColumnType,
    Insertable,
    Selectable,
    Updateable
  } from 'kysely'

  export interface EmailTable { 
    id : string, 
    user_id : string,
    subject : string,
    to_address : string,
    text : string, 
    html : string, 
    attachment_exists : boolean,
    updated_at : ColumnType<Date, string, any>
    created_at : ColumnType<Date, string | undefined, never>
  }

  export type Email = Selectable<EmailTable>
  export type NewEmail = Insertable<EmailTable>
  export type EmailUpdate = Updateable<EmailTable>

