import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Label } from "../ui/label";
import {
  LayoutDashboard,
  ChartBarStacked,
  Wallet,
  MessageCircleMore,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Overview",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    label: "{Properties",
    icon: <ChartBarStacked className="size-5" />,
  },
  {
    label: "Income",
    icon: <Wallet className="size-5" />,
  },
  {
    label: "Chat",
    icon: <MessageCircleMore className="size-5" />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Label className="text-2xl font-bold">Landlord Dashboard</Label>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
