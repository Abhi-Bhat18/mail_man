"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDocument } from "@/components/email-builder/documents/editor/EditorContext";
import { useRouter } from "next/navigation";

import { renderToStaticMarkup } from "@usewaypoint/email-builder";
import { useCreateNewTemplateMutation } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";
import { toast } from "sonner";

const templateSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  description: z
    .string()
    .min(4, "Description must contain at least 4 characters"),
});

const UpdateTemplate = () => {
  const router = useRouter();

  const [createTemplate, { isError, isLoading }] =
    useCreateNewTemplateMutation();

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const template = useAppSelector((state) => state.template);
  let name, description, template_id;
  if (template) {
    name = template.name;
    description = template.description;
    template_id = template.template_id;
  }
  console.log("Template", template);

  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: name ? name : "",
      description: description ? description : "",
    },
  });

  const document = useDocument();

  const handleSubmit = async (values: z.infer<typeof templateSchema>) => {
    try {
      const result = await createTemplate({
        ...values,
        project_id,
        json: document,
        html: renderToStaticMarkup(document, { rootBlockId: "root" }),
        status: "ready",
      }).unwrap();
      router.push(`/template/${result.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex space-x-5 items-end"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[400px]">
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter template name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-[400px]">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter template name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-5 w-full flex justify-end items-end">
          <Button variant={"secondary"}>Update as draft</Button>
          <Button type="submit" variant={"default"}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTemplate;
