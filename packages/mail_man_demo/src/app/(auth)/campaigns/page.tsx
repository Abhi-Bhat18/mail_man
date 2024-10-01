"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { campaignColumns, campaignsData } from "./components/campaign-columns";
import Link from "next/link";

const Campaigns = () => {
  return (
    <section className="w-full space-y-5">
      <div className="flex w-full justify-between items-center">
        <p>Campaigns </p>
        <Button variant={"link"}>
          <Link href={'/new-campaign'}> New Campaign </Link>
        </Button>
      </div>
      <DataTable columns={campaignColumns} data={campaignsData} />
    </section>
  );
};

export default Campaigns;
