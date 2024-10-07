"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SendTestEmail from "./SendTestEmail";
import { useSearchForTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useSearchForContactListQuery } from "@/lib/features/contact-list/contactListApis";

import SearchableDropDown from "./SearchableDropDown";
import { useAppSelector } from "@/lib/hook";
import { useCreateACampaignMutation } from "@/lib/features/campaign/campaignApis";
import { toast } from "sonner";

export const campaignSchema = z.object({
  name: z.string().min(2),
  subject: z.string().min(2),
  mail_from: z.string().email(),
  template_id: z.string().min(10),
  contact_list_id: z.string().min(10),
  send_later: z.boolean(),
  scheduled_date: z.date().optional(),
});

const NewCampaignForm = () => {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      subject: "",
      mail_from: "",
      template_id: "",
      contact_list_id: "",
      send_later: false,
    },
  });

  const [createCampaign, { isLoading, error }] = useCreateACampaignMutation();

  const router = useRouter();

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const [sendLater, setSendLater] = useState(false);

  const handleSubmit = async (
    values: z.infer<typeof campaignSchema>,
    status: "draft" | "scheduled"
  ) => {
    try {
      const result = await createCampaign({
        ...values,
        status,
        project_id,
      }).unwrap();

      toast.success("Campaign created successfully");

      router.push(`/campaign/${result.id}`)

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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
              useSearchQuery={useSearchForContactListQuery}
              form={form}
              name={"contact_list_id"}
              placeholder="Search form email list"
              formLabel="Email List"
            />
            <FormField
              control={form.control}
              name="send_later"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg ">
                  <div className="space-y-0.5">
                    <FormLabel className="">Schedule for later</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        console.log("Checked", checked);
                        field.onChange(checked);
                        setSendLater(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {sendLater && (
              <FormField
                control={form.control}
                name="scheduled_date"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Schedule At</FormLabel>
                      <FormDescription>
                        Emails will be sent at schduled time
                      </FormDescription>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex space-x-5 justify-end">
              <Button
                onClick={() =>
                  form.handleSubmit((values) => handleSubmit(values, "draft"))()
                }
                name="draft"
                variant={"secondary"}
                type="button"
              >
                {" "}
                Save as draft{" "}
              </Button>
              <Button
                onClick={() =>
                  form.handleSubmit((values) =>
                    handleSubmit(values, "scheduled")
                  )()
                }
                name={"scheduled"}
                type="button"
              >
                {" "}
                Save{" "}
              </Button>
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
