"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { resetDocument } from "@/components/email-builder/documents/editor/EditorContext";
import SaveTemplate from "../../templates/new-template/components/SaveTemplate";
import EmailBuilder from "@/components/email-builder/EmailBuilder";
const Template = () => {
  const path = usePathname();
  const id = path.split("/").at(-1);


  return (
    <div className="space-y-5">
      <div className="w-full flex items-center">
        <SaveTemplate />
      </div>
      <EmailBuilder />
    </div>
  );
};

export default Template;
