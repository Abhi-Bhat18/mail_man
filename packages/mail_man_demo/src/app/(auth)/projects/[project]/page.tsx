import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectOverview from "./ProjectOverview";
import ProjectUsers from "./project-access/ProjectAccess";

const Project = () => {
  return (
    <Tabs defaultValue="overview" className="p-5 space-y-5">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="access">Project access</TabsTrigger>
        <TabsTrigger value="api-keys">Project API Keys</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="px-2">
        <ProjectOverview />
      </TabsContent>
      <TabsContent value="access">
        <ProjectUsers />
      </TabsContent>
    </Tabs>
  );
};

export default Project;
