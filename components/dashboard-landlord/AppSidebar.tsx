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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Label className="text-2xl font-bold">Landlord Dashboard</Label>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 px-4 py-3 hover:bg-neutral-100/10 rounded-md cursor-pointer"
            >
              {item.icon}
              <span className="text-lg">{item.label}</span>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
