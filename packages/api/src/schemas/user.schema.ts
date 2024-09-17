import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTable {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  refresh_token: string | null;
  google_access_token: string | null;
  google_refresh_token: string | null;
  created_at: ColumnType<Date, never, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
