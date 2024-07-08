import { ApiKeyTable } from 'src/schemas/api-key.schema';
import { ProjectAccess } from 'src/schemas/project-access.schema';
import { ProjectTable } from 'src/schemas/project.schema';
import { RoleTable } from 'src/schemas/role.schema';
import { UserTable } from 'src/schemas/user.schema';

export interface Database {
  users: UserTable;
  projects: ProjectTable;
  roles: RoleTable;
  project_acceess: ProjectAccess;
  api_keyes: ApiKeyTable;
}
