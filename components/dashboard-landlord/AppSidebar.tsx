"use client";
import {
  Menu,
  LayoutDashboard,
  ChartBarStacked,
  Wallet,
  MessageCircleMore,
} from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/properties",
    icon: ChartBarStacked,
  },
  {
    label: "Income",
    href: "/income",
    icon: Wallet,
  },
  {
    label: "Chat",
    href: "/chat",
    icon: MessageCircleMore,
  },
];
const AppSidebar = () => {
  const { landordDashboardItemIndex, setLandordDashboardItemIndex } =
    useUIStore();
  return (
    <div className="bg-green-500 w-full h-full flex items-center px-4 py-8">
      <nav className="w-full h-full flex flex-col gap-32 overflow-hidden">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-center gap-3 justify-center text-lg  bg-primary text-white justify-start mb-2 p-6 rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={() => setLandordDashboardItemIndex?.(index)}
          >
            <item.icon className="size-32 " />
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;
