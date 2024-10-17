"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useGetACampaignQuery } from "@/lib/features/campaign/campaignApis";

interface RowProps {
  fieldName: string;
  value: string;
}

const DetailRow: React.FC<RowProps> = ({ fieldName, value }) => {
  return (
    <div className="flex w-full space-x-5">
      <p className="basis-1/4">{fieldName}</p>
      <p className="basis-3/4">: {value}</p>
    </div>
  );
};

interface DetailsData {
  data: RowProps[];
}

const Details: React.FC<DetailsData> = () => {
  const pathName = usePathname();

  const id = pathName.split("/").at(-1);

  const { data, isLoading, isError } = useGetACampaignQuery({
    campaign_id: id,
  });

  if (isLoading) {
    return <div> Loading...</div>;
  } else if (!isLoading && !isError) {
    return (
      <div className="bg-muted/40 p-5 rounded-md space-y-2">
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Name</p>
          <p className="basis-2/3"> {data.name}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Subject</p>
          <p className="basis-2/3"> {data.subject}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Mail from</p>
          <p className="basis-2/3">{data.mail_from}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Template</p>
          <p className="basis-2/3">{data.template_name}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Status</p>
          <p className="basis-2/3">{data.status} </p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Scheduled</p>
          <p className="basis-2/3">{data.scheduled_at} </p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Created By</p>
          <p className="basis-2/3">{data.first_name + " " + data.last_name} </p>
        </div>
      </div>
    );
  }
};

export default Details;
