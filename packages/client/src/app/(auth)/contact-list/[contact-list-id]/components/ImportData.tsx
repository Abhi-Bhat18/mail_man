"use client";
import React from "react";
import FileUpload from "./FileUpload";
import { Form } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(importContactsSchema),
  });

  const onFileSelect = (file: any) => {
    setValue("file", file);
  };

  return (
    <div className="space-y-5">
      <p>Import Data</p>
      <div>
        <FileUpload onFileSelect={onFileSelect} />
      </div>
      <div className="space-y-5">
        <p>Instructions</p>
        <p>
          Upload a CSV file or a ZIP file with a single CSV file in it to bulk
          import subscribers. The CSV file should have the following headers
          with the exact column names. attributes (optional) should be a valid
          JSON string with double escaped quotes.
        </p>
        <div className="flex w-full justify-end">
          <Button>Import</Button>
        </div>
      </div>
    </div>
  );
};

export default ImportData;
