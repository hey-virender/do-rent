import { AppSidebar } from "@/components/dashboard-landlord/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default page;
