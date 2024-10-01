"use client";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { projectAccessColumn, projectAccessData } from "./projectAccessColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import InviteUser from "./InviteUser";

const ProjectUsers = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl">Users</p>
          <Dialog>
            <DialogTrigger>
              <Button variant={"ghost"} className="space-x-1 items-center">
                <Plus className="h-4" />
                <span className="">Invite user</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-5">
              <DialogHeader>
                <p className="text-2xl">Invite Users</p>
              </DialogHeader>
              <InviteUser/>
            </DialogContent>
          </Dialog>
        </div>

        <div className="">
          <DataTable columns={projectAccessColumn} data={projectAccessData} />
        </div>
      </div>
    </div>
  );
};

export default ProjectUsers;
