"use client";
import React, { useState } from "react";
import ViewsChart from "./components/ViewsChart";
import EmailPieChart from "./components/EmailsPieChart";
import DatePicker from "@/components/datepicker/DatePicker";
import { DataTable } from "@/components/ui/data-table";
import { emailColumns, emailsData } from "./components/email-columns";
import Details from "./components/Details";
import { Separator } from "@/components/ui/separator";

const Campaign = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-5">
          <p className="text-2xl">Campaign Details</p>
          <Details data={[]} />
        </div>
        <div className="space-y-5 ">
          <p className="text-2xl">Campaign Views</p>
          <div className="p-5 space-y-5">
            <div className="flex">
              <div className="bg-muted/40 p-5 rounded-md ">
                <p>Deliveries</p>
                <p>10</p>
              </div>
              <Separator className="" orientation="vertical" />
              <div className="bg-muted/40">
                <p>Views</p>
                <p>10</p>
              </div>
            </div>
            <Separator />
            <div className="flex">
              <div className="bg-muted/40 p-5 rounded-md">
                <p>Views</p>
                <p>10</p>
              </div>
              <div className="bg-muted/40">
                <p>Clicks</p>
                <p>10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-2xl">Analytics</p>
        <div className="flex justify-end space-x-5">
          <DatePicker label={"Start Date"} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <ViewsChart />
        <EmailPieChart />
      </div>

      <div>
        <p className="text-2xl">Emails</p>
      </div>
      <div>
        <DataTable data={emailsData} columns={emailColumns} />
      </div>
    </div>
  );
};

export default Campaign;
