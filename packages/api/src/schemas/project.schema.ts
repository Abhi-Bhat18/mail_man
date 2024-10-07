import { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export interface ProjectTable {
  id: string;
  name: string;
  description: string;
  created_by: string;
  status: 'active' | 'in-active' | 'deleted';
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string>;
}

export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type ProjectUpdate = Updateable<ProjectTable>;
