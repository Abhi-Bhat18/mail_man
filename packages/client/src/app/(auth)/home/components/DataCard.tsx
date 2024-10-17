import React from "react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface Props {
  cardName: string;
  data: number;
  cardContent: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const DataCard: React.FC<Props> = ({ cardName, cardContent, data, Icon }) => {
  return (
    <div className="bg-muted/40 rounded-md space-y-2 p-5 w-full">
      <p className="text-lg">{cardName}</p>
      <p className="text-2xl"> {data} </p>
      <div className="flex space-x-2 items-center">
        <Icon className="h-4 w-4"/>
        <p className="text-sm">{cardContent}</p>
      </div>
    </div>
  );
};

export default DataCard;
