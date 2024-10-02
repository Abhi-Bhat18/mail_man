import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface CampaignTable {
  id: string;
  name: string;
  description: string;
  subject: string;
  mail_from: string;
  send_later: true;
  send_date: Date;
  template_id: string;
  contact_list_id: string;
  status:
    | 'draft'
    | 'scheduled'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'canceled'
    | 'failed';
  project_id: string;
  created_by: string;
  total_deliveried: number;
  total_bounces: number;
  total_opens: number;
  total_clicks: number;
  total_unsubscribes: number;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Campaign = Selectable<CampaignTable>;
export type NewCampaign = Insertable<CampaignTable>;
export type UpdateCampaign = Updateable<CampaignTable>;
