"use client";
import { useUIStore } from "@/store/ui.store";
import dynamic from "next/dynamic";
import { JSX } from "react";
const Overview = dynamic(() => import("./Overview"));
const Properties = dynamic(() => import("./Properties"));
const Income = dynamic(() => import("./Income"));
const Chat = dynamic(() => import("./Chat"));

const sectionMap: Record<string, JSX.Element> = {
  Overview: <Overview />,
  Properties: <Properties />,
  Income: <Income />,
  Chat: <Chat />,
};
const LandlordDashboardContent = () => {
  const { dashboardActiveItem } = useUIStore();
  return (
    <section className="flex-1 bg-background">
      {sectionMap[dashboardActiveItem] ?? <Overview />}
    </section>
  );
};

export default LandlordDashboardContent;
