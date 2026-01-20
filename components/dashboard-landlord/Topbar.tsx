"use client";
import {
  Menu,
  LayoutDashboard,
  ChartBarStacked,
  Wallet,
  MessageCircleMore,
} from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const Items = [
  {
    label: "Overview",
    
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
   
    icon: ChartBarStacked,
  },
  {
    label: "Income",
   
    icon: Wallet,
  },
  {
    label: "Chat",
    icon: MessageCircleMore,
  },
];

const Topbar = () => {
  const { dashboardActiveItem, setDashboardActiveItem } = useUIStore();
  return (
    <nav className="w-full flex items-center justify-around  bg-white border-b">
      {Items.map((item,index) => {
        const isActive = dashboardActiveItem === item.label;
        return (
          <Button
            key={index}
            
            size="sm"
            className={cn("text-xl flex items-center h-16 w-1/4 justify-center rounded-none", isActive && "bg-accent text-white hover:bg-accent")}
            onClick={() => setDashboardActiveItem?.(item.label)}
          >
            <item.icon className={"size-8"} />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default Topbar;
