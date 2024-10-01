import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ScanSearch, ScanEye } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Template = {
  id: string;
  name: string;
  project_id: string;
  project_name: string;
  status: "active" | "de-activated";
  created_at: Date;
  created_by: string;
};

export const templateData: Template[] = [
  {
    id: "1",
    name: "Email Marketing Template",
    project_id: "1",
    project_name: "Marketing Campaign",
    status: "active",
    created_at: new Date("2023-02-01"),
    created_by: "John Doe",
  },
  {
    id: "2",
    name: "Product Launch Template",
    project_id: "2",
    project_name: "Product Development",
    status: "de-activated",
    created_at: new Date("2023-01-12"),
    created_by: "Jane Smith",
  },
  {
    id: "3",
    name: "Sales Outreach Template",
    project_id: "1",
    project_name: "Marketing Campaign",
    status: "active",
    created_at: new Date("2023-04-10"),
    created_by: "Samuel Johnson",
  },
  {
    id: "4",
    name: "User Onboarding Template",
    project_id: "3",
    project_name: "Customer Success",
    status: "active",
    created_at: new Date("2023-05-18"),
    created_by: "Michael Brown",
  },
  {
    id: "5",
    name: "Survey Feedback Template",
    project_id: "4",
    project_name: "Market Research",
    status: "de-activated",
    created_at: new Date("2022-12-22"),
    created_by: "Emily Davis",
  },
  {
    id: "6",
    name: "Content Calendar Template",
    project_id: "2",
    project_name: "Product Development",
    status: "active",
    created_at: new Date("2023-07-05"),
    created_by: "David Clark",
  },
  {
    id: "7",
    name: "Campaign Reporting Template",
    project_id: "5",
    project_name: "Campaign Analytics",
    status: "active",
    created_at: new Date("2023-03-30"),
    created_by: "Sophia Lewis",
  },
  {
    id: "8",
    name: "Project Management Template",
    project_id: "6",
    project_name: "Internal Operations",
    status: "active",
    created_at: new Date("2023-04-11"),
    created_by: "Olivia Martinez",
  },
  {
    id: "9",
    name: "Weekly Report Template",
    project_id: "5",
    project_name: "Campaign Analytics",
    status: "de-activated",
    created_at: new Date("2023-01-29"),
    created_by: "Liam Wilson",
  },
  {
    id: "10",
    name: "Blog Post Template",
    project_id: "7",
    project_name: "Content Creation",
    status: "active",
    created_at: new Date("2023-08-09"),
    created_by: "Ava Garcia",
  },
  {
    id: "11",
    name: "Newsletter Template",
    project_id: "1",
    project_name: "Marketing Campaign",
    status: "active",
    created_at: new Date("2023-03-20"),
    created_by: "John Doe",
  },
  {
    id: "12",
    name: "Product Update Template",
    project_id: "2",
    project_name: "Product Development",
    status: "de-activated",
    created_at: new Date("2023-05-13"),
    created_by: "Jane Smith",
  },
  {
    id: "13",
    name: "Employee Survey Template",
    project_id: "3",
    project_name: "Customer Success",
    status: "active",
    created_at: new Date("2023-06-15"),
    created_by: "Michael Brown",
  },
  {
    id: "14",
    name: "Event Invitation Template",
    project_id: "8",
    project_name: "Event Management",
    status: "active",
    created_at: new Date("2023-07-19"),
    created_by: "Sophia Lewis",
  },
  {
    id: "15",
    name: "Case Study Template",
    project_id: "9",
    project_name: "Research and Development",
    status: "de-activated",
    created_at: new Date("2022-11-08"),
    created_by: "David Clark",
  },
];

export const templateColumns: ColumnDef<Template>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;

      return <Link href={`/template/${id}`}>{name}</Link>;
    },
  },
  {
    accessorKey: "project_name",
    header: "Project",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const { created_at } = row.original;

      return <div>{created_at.toDateString()}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <>
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger>
                    <ScanEye className="h-4 w-4" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription className="h-[80vh] w-[80vw]">
                  You clicked on template {id}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
