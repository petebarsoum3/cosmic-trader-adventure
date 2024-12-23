import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  
  // Check if user is admin
  const isAdmin = session?.user?.user_metadata?.role === 'admin';
  
  if (!session) {
    return <Navigate to="/" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <SidebarInset>
          <div className="p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};