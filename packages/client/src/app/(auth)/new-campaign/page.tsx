"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewCampaignForm from "./components/NewCampaignForm";

const NewCampaign = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-2xl">New Campaign</p>
      </div>
      <Tabs defaultValue="campaign" className="space-y-5">
        <TabsList>
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="campaign">
          <NewCampaignForm />
        </TabsContent>
        <TabsContent value="content">Preview your Mail Template</TabsContent>
      </Tabs>
    </div>
  );
};

export default NewCampaign;
