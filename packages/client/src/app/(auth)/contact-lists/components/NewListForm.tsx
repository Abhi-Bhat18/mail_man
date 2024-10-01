"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const emailListSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(4).max(500),
});

const NewListForm = () => {
  const form = useForm<z.infer<typeof emailListSchema>>({
    resolver: zodResolver(emailListSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailListSchema>) => {
    console.log("Values from new email list", values);

    // 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-5">
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Name </FormLabel>
              <FormControl>
                <Input type="text" placeholder="List name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description </FormLabel>
              <FormControl>
                <Textarea className="h-[200px] resize-none" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex space-x-5 justify-end items-center">
          <Button variant={"secondary"}> Cancel </Button>
          <Button type="submit"> Submit </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewListForm;
