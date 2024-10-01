'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const passwordSchema = z.object({ 
  current_password : z.string().min(8),
  new_password : z.string().min(8),
  confirm_password : z.string().min(8)
});



const Password = () => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver : zodResolver(passwordSchema),
    defaultValues :{ 
      current_password : '',
      new_password : '',
      confirm_password :'',
    }
  });

  return (
    <div className="p-5 flex bg-card rounded-md shadow-md">
      <div className="text-2xl basis-1/4">
        <p>Update password</p>
      </div>
      <div className="basis-3/4">
        <Form {...form}>
          <form className="space-y-5 max-w-96">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> Current Password </FormLabel>
                    <FormControl>
                      <Input placeholder="*****" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> New Password </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel> Confirm Password </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Password;
