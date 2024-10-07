import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type Email = { 
    id : string,
    template_name : string, 
    email_list : string
    sent_at : Date, 
    sent_by : string, 
    delivered : string, 
    view_count  :string, 
    bounce_count : string, 
    click_count : string,
    status : 'scheduled' | 'sent' | 'draft'
}

export const emailColumns: ColumnDef<Email>[] = [
  {
    header: "Template",
    accessorKey: "template_name",
    cell: ({ row }) => {
      const { id, template_name } = row.original;

      return <Link href={`/templates/${id}`}>{template_name}</Link>;
    },
  },
  {
    header: "Email List",
    accessorKey: "email_list",
  },
  {
    header: "Sent By",
    accessorKey: "sent_by",
  },
  { 
    header : 'Status',
    accessorKey : 'status',
  },
  {
    header: "Sent/Scheduled At",
    accessorKey: "sent_at",
    cell: ({ row }) => {
      const { sent_at } = row.original;

      return <div>{sent_at.toDateString()}</div>;
    },
  },
  
];

export const emailsData: Email[] = [
  {
    id: "ca6e57a2-31bb-46f8-9a67-30369b8deaff",
    template_name: "Welcome Email",
    email_list: "New Subscribers",
    sent_at: new Date("2023-06-12T08:45:00"),
    sent_by: "Alice Johnson",
    delivered: "1200",
    view_count: "950",
    bounce_count: "50",
    click_count: "300",
    status: "sent",
  },
  {
    id: "f47b8cd3-b1da-4c1e-9dc2-732c78fae17d",
    template_name: "Holiday Sale",
    email_list: "Premium Customers",
    sent_at: new Date("2023-12-01T10:30:00"),
    sent_by: "Bob Smith",
    delivered: "8500",
    view_count: "7000",
    bounce_count: "500",
    click_count: "4500",
    status: "scheduled",
  },
  {
    id: "d6826a5e-2379-4ae7-badb-78a6a524d930",
    template_name: "Product Launch",
    email_list: "Tech Enthusiasts",
    sent_at: new Date("2023-05-20T12:15:00"),
    sent_by: "Charlie Davis",
    delivered: "9500",
    view_count: "8200",
    bounce_count: "300",
    click_count: "5100",
    status: "sent",
  },
  {
    id: "0f087d11-c3e7-4b3f-8f9c-04b4b18c3a32",
    template_name: "Back to School Offer",
    email_list: "Parents & Students",
    sent_at: new Date("2023-08-05T09:00:00"),
    sent_by: "David Lee",
    delivered: "7800",
    view_count: "6400",
    bounce_count: "400",
    click_count: "3700",
    status: "sent",
  },
  {
    id: "319e16cc-76c9-44a6-b2a0-1f512d87f6a3",
    template_name: "Spring Collection Launch",
    email_list: "Fashion Lovers",
    sent_at: new Date("2023-03-01T11:00:00"),
    sent_by: "Eve Miller",
    delivered: "5600",
    view_count: "4700",
    bounce_count: "350",
    click_count: "2100",
    status: "draft",
  },
  {
    id: "1a14674c-d857-4cb4-9154-34f6d7f0bc87",
    template_name: "Winter Warmers Promo",
    email_list: "Seasonal Buyers",
    sent_at: new Date("2023-12-05T14:45:00"),
    sent_by: "Frank Brown",
    delivered: "6800",
    view_count: "5700",
    bounce_count: "250",
    click_count: "3900",
    status: "scheduled",
  },
  {
    id: "b1420e4b-32f1-418a-9966-6698c258e7af",
    template_name: "Fitness New Year Tips",
    email_list: "Health & Fitness",
    sent_at: new Date("2023-01-10T07:30:00"),
    sent_by: "Grace Wilson",
    delivered: "7400",
    view_count: "6100",
    bounce_count: "400",
    click_count: "3100",
    status: "sent",
  },
  {
    id: "13df2b76-92ae-429b-bb26-8c68e4d848c5",
    template_name: "Cyber Monday Deals",
    email_list: "Online Shoppers",
    sent_at: new Date("2023-11-27T16:00:00"),
    sent_by: "Hannah Scott",
    delivered: "13400",
    view_count: "11500",
    bounce_count: "600",
    click_count: "7600",
    status: "sent",
  },
  {
    id: "789b1929-03bb-4a0d-89b9-b8bda07c16ff",
    template_name: "Valentine’s Day Gift Ideas",
    email_list: "Gift Buyers",
    sent_at: new Date("2023-02-05T13:00:00"),
    sent_by: "Ivy Anderson",
    delivered: "6700",
    view_count: "5200",
    bounce_count: "450",
    click_count: "2900",
    status: "scheduled",
  },
  {
    id: "b5df2d6a-f4f2-44ad-a99e-df59411f62ea",
    template_name: "Exclusive VIP Deals",
    email_list: "Premium Customers",
    sent_at: new Date("2023-07-15T09:15:00"),
    sent_by: "Jack Taylor",
    delivered: "9200",
    view_count: "7500",
    bounce_count: "500",
    click_count: "4300",
    status: "sent",
  },
];





