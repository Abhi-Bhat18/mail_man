"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { useGetContactsQuery } from "@/lib/features/contact-list/contactListApis";
import { useAppSelector } from "@/lib/hook";
import { DataTable } from "@/components/ui/data-table";
import { contactsColumn } from "./contacts-column";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import NewContact from "./NewContact";

const Contacts = () => {
  const pathName = usePathname();
  const contact_list_id = pathName.split("/").at(-1);
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { data, isLoading, error } = useGetContactsQuery({
    project_id,
    contact_list_id,
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Contacts</p>
        <Dialog>
          <DialogTrigger>
            <Button> Add contact </Button>
          </DialogTrigger>
          <DialogContent className="border-secondary">
            <DialogTitle>
              <p className="text-2xl">Add new contact</p>
            </DialogTitle>
            <DialogHeader>
              <NewContact />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full">
        {isLoading && <div>Loading...</div>}
        {!isLoading && !error && (
          <DataTable data={data} columns={contactsColumn} />
        )}
      </div>
    </div>
  );
};

export default Contacts;
