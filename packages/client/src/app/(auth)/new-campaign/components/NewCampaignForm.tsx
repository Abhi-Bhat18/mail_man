import React from "react";
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

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SendTestEmail from "./SendTestEmail";
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
              name={"email_list_id"}
              form={form}
              formLabel="Email List"
            />
            <SearchableDropDown
              name={"template_id"}
              form={form}
              formLabel="Template"
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
