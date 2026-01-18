import { AppSidebar } from "@/components/dashboard-landlord/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};

export default page;
