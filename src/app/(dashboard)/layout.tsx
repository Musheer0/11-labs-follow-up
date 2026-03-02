import { cookies } from "next/headers";
import type React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cokies = await cookies();
  const isSidebarOpen = (await cokies.get("sidebar_state")?.value) === "true";
  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <DashboardSidebar />
      <SidebarInset>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
