"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useAppSelector } from "@/lib/hook";
import DataCard from "./components/DataCard";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import EmailPieChart from "../campaign/[campaign]/components/EmailsPieChart";
import ViewsChart from "../campaign/[campaign]/components/ViewsChart";

interface IData {
  cardName: string;
  data: number;
  cardContent: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const dummyData: IData[] = [
  {
    cardName: "Campaigns",
    data: 55,
    cardContent: "Up by 55 %",
    Icon: TrendingUp,
  },
  {
    cardName: "Click Rate",
    data: 20,
    cardContent: "Up by 20%",
    Icon: TrendingDown,
  },
  {
    cardName: "Open Rate",
    data: 30,
    cardContent: "Down by 10%",
    Icon: TrendingDown,
  },
  {
    cardName: "Delivery Rate",
    data: 89,
    cardContent: "Down by 1%",
    Icon: TrendingUp,
  },
];
const Dashboard = () => {
  const first_name = useAppSelector((state) => state.auth.user?.first_name);
  const last_name = useAppSelector((state) => state.auth.user?.last_name);

  return (
    <div className="space-y-5">
      <p className="text-2xl"> Hello {first_name + " " + last_name}</p>
      <div className="flex space-x-5 w-full justify-between">
        {dummyData.map((data, index) => (
          <DataCard key={index} {...data} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-10">
        <ViewsChart />
        <EmailPieChart />
      </div>
    </div>
  );
};

export default Dashboard;
