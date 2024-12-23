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

const Index = () => {
  const worker = useRef<Worker>();
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [allocatedFunds, setAllocatedFunds] = useState(0);
  const [equity, setEquity] = useState(0);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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