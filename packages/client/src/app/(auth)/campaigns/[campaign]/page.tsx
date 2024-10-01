'use client'
import React, { useState} from "react"; 
import ViewsChart from "./components/ViewsChart";
import EmailPieChart from "./components/EmailsPieChart";
import DatePicker from "@/components/datepicker/DatePicker";
import { DataTable } from "@/components/ui/data-table";
import { emailColumns, emailsData } from "./components/email-columns";

const Campaign = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Campaign Analytics</p>
        <div className="flex justify-end space-x-5">
          <DatePicker label={"Start Date"} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <ViewsChart/>
        <EmailPieChart/>
      </div>

      <div>
        <p className="text-2xl">Emails</p>
      </div>
      <div>
        <DataTable data={emailsData} columns={emailColumns}/>
      </div>

    </div>
  );
};


export default Campaign;
