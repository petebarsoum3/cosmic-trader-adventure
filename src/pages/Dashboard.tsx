import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { WalletCard } from "@/components/WalletCard";
import { TraderLevel } from "@/components/TraderLevel";
import { BotControl } from "@/components/BotControl";
import { WalletActions } from "@/components/WalletActions";
import { TradeHistory } from "@/components/TradeHistory";
import { SupportTickets } from "@/components/SupportTickets";

const Dashboard = () => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  const mockData = {
    balance: 1000,
    allocatedFunds: 500,
    equity: 1200,
    level: 2,
    xp: 750,
    trades: [
      {
        id: '1',
        symbol: 'BTC/USDT',
        side: 'long' as const,
        entryPrice: 45000,
        leverage: 1,
        size: 0.1,
        pnl: 100,
        timestamp: Date.now()
      }
    ]
  };

  return (
    <div className="min-h-screen bg-cyber-background p-4">
      <div className="container mx-auto space-y-8">
        {/* Top Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <WalletCard 
            balance={mockData.balance}
            allocatedFunds={mockData.allocatedFunds}
            equity={mockData.equity}
          />
          <TraderLevel level={mockData.level} xp={mockData.xp} />
        </div>

        {/* Middle Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <BotControl 
            allocatedFunds={mockData.allocatedFunds}
            onAllocate={(amount) => console.log('Allocate:', amount)}
            onStart={() => console.log('Bot started')}
            onStop={() => console.log('Bot stopped')}
          />
          <WalletActions 
            balance={mockData.balance}
            onBalanceChange={(amount) => console.log('Balance changed:', amount)}
          />
        </div>

        {/* Bottom Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <TradeHistory trades={mockData.trades} />
          <SupportTickets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;