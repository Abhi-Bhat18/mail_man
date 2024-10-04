"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import { useGetAContactListsQuery } from "@/lib/features/contact-list/contactListApis";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContactListDetails = () => {
  const path = usePathname();
  const id = path.split("/").at(-1);
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { data, isLoading, isError } = useGetAContactListsQuery({
    project_id,
    contact_list_id: id,
  });

  if (isLoading) {
    <div className="w-full">Loading ...</div>;
  } else if (!isLoading && !isError) {
    return (
      <div className="basis-1/2 p-5 bg-card rounded-md relative">
        <div className="absolute right-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pencil className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-5">
          <div className="flex space-x-5">
            <p className="basis-1/3">Name</p> <p>{data.name}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3">Description</p> <p>{data.description}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3">Email Type</p> <p>{data.email_type}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3">Opt In</p> <p>{data.email_opt_in}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3">Created By</p>{" "}
            <p>{data.first_name + data.last_name}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3"> Last updated at</p>{" "}
            <p>{data.updated_at}</p>
          </div>
          <div className="flex space-x-5">
            <p className="basis-1/3">Created At</p> <p>{data.created_at}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ContactListDetails;
