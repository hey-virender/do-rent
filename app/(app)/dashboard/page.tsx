import AppSidebar from "@/components/dashboard-landlord/AppSidebar";


const page = () => {
  return (
    <main className="flex">
      <section className="max-w-[30%] h-screen overflow-clip">
        <AppSidebar />
      </section>
      <section>
        Dashboard Content
      </section>
      
    </main>
  );
};

export default page;
