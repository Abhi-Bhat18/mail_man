"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SendTestEmail from "./SendTestEmail";
import { useSearchForTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import CommandQuery from "./CommandQuery";
import SearchableDropDown from "./SearchableDropDown";

export const campaignSchema = z.object({
  name: z.string().min(2),
  subject: z.string().min(2),
  mail_from: z.string(),
  template_id: z.string(),
  email_list_id: z.string(),
});

const NewCampaignForm = () => {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {},
  });

  const [template, setTemplate] = useState("");

  return (
    <div className="flex space-x-5">
      <div className="basis-7/12 bg-card rounded-md p-5">
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New arrival" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Checkout new arrivals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail from</FormLabel>
                  <FormControl>
                    <Input placeholder="Checkout new arrivals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SearchableDropDown
              useSearchQuery={useSearchForTemplateQuery}
              form={form}
              name={"template_id"}
              placeholder="Search for templates"
              formLabel="Email template"
            />
            <SearchableDropDown
              useSearchQuery={useSearchForTemplateQuery}
              form={form}
              name={"email_list_id"}
              placeholder="Search form email list"
              formLabel="Email List"
            />
            <div className="flex space-x-5 justify-end">
              <Button variant={"secondary"}> Save as draft </Button>
              <Button> Save </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="basis-5/12">
        <SendTestEmail />
      </div>
    </div>
  );
};

export default NewCampaignForm;
