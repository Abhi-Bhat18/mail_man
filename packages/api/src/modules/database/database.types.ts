import { CampaignTable } from '@/schemas/campaign.schema';
import { ContactListTable } from '@/schemas/contact-list.schema';
import { ContactTable } from '@/schemas/contacts.schema';
import { EmailTemplateTable } from '@/schemas/email-template.schema';
import { ApiKeyTable } from 'src/schemas/api-key.schema';
import { ProjectAccess } from 'src/schemas/project-access.schema';
import { ProjectTable } from 'src/schemas/project.schema';
import { RoleTable } from 'src/schemas/role.schema';
import { UserTable } from 'src/schemas/user.schema';

export interface Database {
  users: UserTable;
  projects: ProjectTable;
  roles: RoleTable;
  project_accesses: ProjectAccess;
  api_keyes: ApiKeyTable;
  contact_lists: ContactListTable;
  contacts: ContactTable;
  campaigns: CampaignTable;
  email_templates: EmailTemplateTable;
}
