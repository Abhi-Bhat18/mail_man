'use client'
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

type Contact = {
  id: string;
  name: string;
  status: string;
  type: string;
  contacts: number;
  created_by: string;
  created_at: Date;
};

export const ContactListColumns: ColumnDef<Contact>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const { id, name } = row.original;
      return <Link href={`/contact-lists/contact?id=${id}`}>{name}</Link>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Created by",
    accessorKey: "created_by",
  },
  {
    header: "Created at",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <div>{created_at.toDateString()} </div>;
    },
  },
];

export const contactsData: Contact[] = [
  {
    id: "c3f9f64e-3e8e-4b0f-8fa4-2b9f5a9f9b9a",
    name: "John Doe",
    status: "active",
    type: "personal",
    contacts: 340,
    created_by: "johndoe123",
    created_at: new Date("2023-01-15T08:30:00Z"),
  },
  {
    id: "d74a5c19-dfc6-41c9-9b1b-df0f43ad4f9f",
    name: "Jane Smith",
    status: "inactive",
    type: "business",
    contacts: 120,
    created_by: "janesmith456",
    created_at: new Date("2022-11-22T14:45:00Z"),
  },
  {
    id: "e21f71fa-7c37-4459-b3f5-e4d60ff776f1",
    name: "Emily Johnson",
    status: "pending",
    type: "personal",
    contacts: 502,
    created_by: "emilyjohnson789",
    created_at: new Date("2023-05-10T10:15:00Z"),
  },
  {
    id: "b9a1a72f-991f-47e3-a92e-0e1e1b9ef90d",
    name: "Michael Brown",
    status: "active",
    type: "business",
    contacts: 670,
    created_by: "michaelbrown321",
    created_at: new Date("2022-09-07T16:20:00Z"),
  },
  {
    id: "f5e9820b-8a0d-4f6b-9f8b-c3e5f6b789f4",
    name: "Olivia Williams",
    status: "inactive",
    type: "personal",
    contacts: 234,
    created_by: "oliviawilliams654",
    created_at: new Date("2023-02-18T12:10:00Z"),
  },
];
