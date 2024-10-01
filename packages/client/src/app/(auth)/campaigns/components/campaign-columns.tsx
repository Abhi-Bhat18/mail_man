import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

type Campaign = {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  created_by: string;
  status: string;
  templates: number;
  emails_sent: number;
  email_list: string;
};

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;
      return <Link href={`/campaigns/${id}`}>{name}</Link>;
    },
  },
  {
    header: "Created",
    accessorKey: "created_by",
  },
  {
    header: "Start Date",
    accessorKey: "start_date",
    cell: ({ row }) => {
      const { start_date } = row.original;

      return <div> {start_date.toDateString()} </div>;
    },
  },
  {
    header: "End Date",
    accessorKey: "end_date",
    cell: ({ row }) => {
      const { end_date } = row.original;

      return <div> {end_date.toDateString()} </div>;
    },
  },
  {
    header: "Email list",
    accessorKey: "email_list",
  },
  {
    header: "Emails sent",
    accessorKey: "emails_sent",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];

export const campaignsData: Campaign[] = [
  {
    id: "311e77b0-23ad-4257-b7a4-374f37f78cf9",
    name: "Campaign_1",
    start_date: new Date("2023-07-02"),
    end_date: new Date("2023-08-13"),
    created_by: "user_1",
    status: "paused",
    templates: 4,
    emails_sent: 1512,
    email_list: "list_A",
  },
  {
    id: "c434cbf0-89dd-4de3-af7f-3526addb4e21",
    name: "Campaign_2",
    start_date: new Date("2023-10-17"),
    end_date: new Date("2024-01-19"),
    created_by: "user_4",
    status: "active",
    templates: 7,
    emails_sent: 8917,
    email_list: "list_B",
  },
  {
    id: "320767fc-6dd7-4b42-96cc-1c233ba0239f",
    name: "Campaign_3",
    start_date: new Date("2023-03-04"),
    end_date: new Date("2023-03-14"),
    created_by: "user_2",
    status: "completed",
    templates: 9,
    emails_sent: 7955,
    email_list: "list_C",
  },
  {
    id: "1345db58-f1b7-4f8b-b1d7-b18152bb94d0",
    name: "Campaign_4",
    start_date: new Date("2023-01-08"),
    end_date: new Date("2023-02-28"),
    created_by: "user_2",
    status: "paused",
    templates: 7,
    emails_sent: 7847,
    email_list: "list_C",
  },
  {
    id: "0cd7752d-ff59-4d2c-9233-e3ec5e5953e3",
    name: "Campaign_5",
    start_date: new Date("2023-01-25"),
    end_date: new Date("2023-03-15"),
    created_by: "user_5",
    status: "draft",
    templates: 3,
    emails_sent: 8618,
    email_list: "list_A",
  },
  {
    id: "e083f7bd-29e2-4ba7-898c-6c59d3a51fad",
    name: "Campaign_6",
    start_date: new Date("2023-08-21"),
    end_date: new Date("2023-09-09"),
    created_by: "user_3",
    status: "completed",
    templates: 8,
    emails_sent: 1813,
    email_list: "list_B",
  },
  {
    id: "80ddaf67-d26d-4d8f-98e1-521f5712babb",
    name: "Campaign_7",
    start_date: new Date("2023-05-15"),
    end_date: new Date("2023-08-07"),
    created_by: "user_4",
    status: "draft",
    templates: 8,
    emails_sent: 9960,
    email_list: "list_A",
  },
  {
    id: "e8bd0811-523d-4e1f-9f6e-7309b659cd7c",
    name: "Campaign_8",
    start_date: new Date("2023-01-14"),
    end_date: new Date("2023-02-02"),
    created_by: "user_1",
    status: "completed",
    templates: 3,
    emails_sent: 6797,
    email_list: "list_B",
  },
  {
    id: "aa34190c-427d-4262-88fc-040a1517f904",
    name: "Campaign_9",
    start_date: new Date("2023-10-16"),
    end_date: new Date("2023-11-12"),
    created_by: "user_2",
    status: "draft",
    templates: 2,
    emails_sent: 7301,
    email_list: "list_A",
  },
  {
    id: "e7f5976e-1d36-49a7-bab3-eb68986ea173",
    name: "Campaign_10",
    start_date: new Date("2023-01-01"),
    end_date: new Date("2023-01-18"),
    created_by: "user_3",
    status: "paused",
    templates: 7,
    emails_sent: 7712,
    email_list: "list_C",
  },
];
