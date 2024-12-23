import { useEffect, useRef, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { TraderLevel } from "@/components/TraderLevel";
import { TradeHistory } from "@/components/TradeHistory";
import { BotControl } from "@/components/BotControl";
import { WalletActions } from "@/components/WalletActions";
import { SupportTickets } from "@/components/SupportTickets";
import { useToast } from "@/hooks/use-toast";
import { AuthOverlay } from "@/components/AuthOverlay";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const worker = useRef<Worker>();
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [allocatedFunds, setAllocatedFunds] = useState(0);
  const [equity, setEquity] = useState(0);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    worker.current = new Worker(
      new URL('../workers/trading.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.current.onmessage = (e) => {
      const { type, trade } = e.data;
      switch (type) {
        case 'NEW_TRADE':
          // Add trade to history
          break;
        case 'BOT_STOPPED':
          toast({
            title: "Bot Stopped",
            description: "Trading bot has been stopped successfully",
          });
          break;
        case 'BOT_STARTED':
          toast({
            title: "Bot Started",
            description: "Trading bot is now running",
          });
          break;
      }
    };

    return () => worker.current?.terminate();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
      </div>
    );
  }

  const handleAction = (action: () => void) => {
    if (!session) {
      setShowAuthOverlay(true);
      return;
    }
    action();
  };

  const handleStartBot = () => {
    worker.current?.postMessage({ type: 'START' });
  };

  const handleStopBot = () => {
    worker.current?.postMessage({ type: 'STOP' });
  };

  return (
    <div className="container py-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-cyber-primary">SolanaQM</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <WalletCard
          balance={balance}
          allocatedFunds={allocatedFunds}
          equity={equity}
        />
        <TraderLevel level={1} xp={0} />
      </div>
      
      <WalletActions
        balance={balance}
        onBalanceChange={setBalance}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <BotControl
          allocatedFunds={allocatedFunds}
          onAllocate={(amount) => handleAction(() => setAllocatedFunds(amount))}
          onStart={() => handleAction(handleStartBot)}
          onStop={() => handleAction(handleStopBot)}
        />
        <TradeHistory trades={[]} />
      </div>

      <div className="mt-6">
        <SupportTickets />
      </div>

      <AuthOverlay 
        isOpen={showAuthOverlay} 
        onClose={() => setShowAuthOverlay(false)} 
      />
    </div>
  );
};

export default Index;