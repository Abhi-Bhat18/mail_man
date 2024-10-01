import React from "react";

const projectDetails = [
  { name: "Project Name", val: "Mail man" },

  { name: "Description", val: "Open source alternative to SES" },
  { name: "Project ID", val: "388h223" },
  { name: "Status", val: "Active" },
  { name: "Created By", val: "Abhishek Bhat" },
  { name: "Created At", val: "26th Sep 2024" },
];

const ProjectOverview = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h2 className="text-2xl">Overview</h2>
        {/* Project Details */}
        <div className="border border-background bg-card p-2 rounded-md">
          {projectDetails.map((detail, index) => {
            return (
              <div key={index} className="flex w-full p-2">
                <p className="basis-2/5">{detail.name}</p>
                <p className="basis-3/5">{detail.val}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-2xl">Project Settings</p>
      </div>
    </div>
  );
};

export default ProjectOverview;
