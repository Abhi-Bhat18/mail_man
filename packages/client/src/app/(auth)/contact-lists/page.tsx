import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import NewListForm from "./components/NewListForm";

import { DialogTitle } from "@radix-ui/react-dialog";
import { DataTable } from "@/components/ui/data-table";
import { ContactListColumns, contactsData } from "./components/list-column";

const EmailLists = () => {
  return (
    <div className="space-y-5">
      <div className="flex w-full justify-between items-center border-b border-b-gray-300 pb-2">
        <p className="text-2xl"> Contact Lists</p>
        <Dialog>
          <DialogTrigger>
            <Button className="space-x-2 items-center">
              <span className="">New contact List</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-5 border-secondary">
            <DialogTitle>
              <p className="text-xl">Create New Email List</p>{" "}
            </DialogTitle>
            <DialogHeader>
              <NewListForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable columns={ContactListColumns} data={contactsData} />
      </div>
    </div>
  );
};

export default EmailLists;
