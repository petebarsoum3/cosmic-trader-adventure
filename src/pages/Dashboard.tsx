import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { WalletCard } from "@/components/WalletCard";
import { BotControl } from "@/components/BotControl";
import { TradeHistory } from "@/components/TradeHistory";
import { TraderLevel } from "@/components/TraderLevel";
import { WalletActions } from "@/components/WalletActions";
import { SupportTickets } from "@/components/SupportTickets";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-cyber-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <WalletCard />
          <TraderLevel />
        </div>

        {/* Middle Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <BotControl />
          <WalletActions />
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <TradeHistory />
          <SupportTickets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;