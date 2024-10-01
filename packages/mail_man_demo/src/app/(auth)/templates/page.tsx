'use client'
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { templateColumns, templateData } from "./templates-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Templates = () => {
  return (
    <section className="">
      <div className="flex justify-between items-center">
        <p>Templates</p>
        <Button variant={"link"}>
          <Link href={'/templates/new-template'} >New Template</Link>
        </Button>
      </div>
      <DataTable columns={templateColumns} data={templateData} />
    </section>
  );
};

export default Templates;
