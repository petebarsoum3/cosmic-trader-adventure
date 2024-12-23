import { Card } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const session = useSession();
  
  // Check if user is authenticated and is admin
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  const isAdmin = session.user?.user_metadata?.role === 'admin';
  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cyber-primary">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 cyber-card">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-cyber-primary">0</p>
          </Card>
          
          <Card className="p-6 cyber-card">
            <h3 className="text-lg font-semibold mb-2">Pending Deposits</h3>
            <p className="text-2xl font-bold text-cyber-secondary">0</p>
          </Card>
          
          <Card className="p-6 cyber-card">
            <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
            <p className="text-2xl font-bold text-cyber-accent">0</p>
          </Card>
          
          <Card className="p-6 cyber-card">
            <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
            <p className="text-2xl font-bold text-green-500">$0</p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;