"use client";
import React from "react";
import FileUpload from "./FileUpload";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

const importContactsSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file?.type === "text/csv", {
      message: "Only CSV files are allowed",
    })
    .refine((file) => file?.size > 0, {
      message: "File cannot be empty",
    }),
});

const ImportData = () => {
  const form = useForm({
    resolver: zodResolver(importContactsSchema),
  });

  const onSubmit = (values: z.infer<typeof importContactsSchema>) => {
    console.log("Values", values);
  };

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form>
          <p>Import Data</p>

          <div>
            {/* <FileUpload /> */}
          </div>
          <div className="space-y-5">
            <p>Instructions</p>
            <p>
              Upload a CSV file or a ZIP file with a single CSV file in it to
              bulk import subscribers. The CSV file should have the following
              headers with the exact column names. attributes (optional) should
              be a valid JSON string with double escaped quotes.
            </p>
            <div className="flex w-full justify-end">
              <Button type="submit">Import</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ImportData;
