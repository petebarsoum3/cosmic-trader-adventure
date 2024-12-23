import { useEffect, useRef, useState } from "react";
import { WalletCard } from "@/components/WalletCard";
import { TraderLevel } from "@/components/TraderLevel";
import { TradeHistory } from "@/components/TradeHistory";
import { BotControl } from "@/components/BotControl";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, MinusCircle } from "lucide-react";
import { AuthOverlay } from "@/components/AuthOverlay";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const worker = useRef<Worker>();
  const { toast } = useToast();
  const wallet = useWallet();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

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
      if (type === 'NEW_TRADE') {
        wallet.addTrade(trade);
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

  const handleDeposit = () => {
    const amount = Number(prompt('Enter deposit amount:'));
    if (amount > 0) {
      wallet.deposit(amount);
      toast({
        title: "Deposit Successful",
        description: `Added $${amount.toFixed(2)} to your wallet`,
      });
    }
  };

  const handleWithdraw = () => {
    const amount = Number(prompt('Enter withdrawal amount:'));
    if (amount > 0) {
      if (wallet.withdraw(amount)) {
        toast({
          title: "Withdrawal Successful",
          description: `Withdrawn $${amount.toFixed(2)} from your wallet`,
        });
      }
    }
  };

  const handleStartBot = () => {
    worker.current?.postMessage({ type: 'START' });
    toast({
      title: "Bot Started",
      description: "Trading bot is now running",
    });
  };

  const handleStopBot = () => {
    worker.current?.postMessage({ type: 'STOP' });
    toast({
      title: "Bot Stopped",
      description: "Trading bot has been stopped",
    });
  };

  return (
    <div className="container py-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <WalletCard
          balance={wallet.balance}
          allocatedFunds={wallet.allocatedFunds}
          equity={wallet.equity}
        />
        <TraderLevel level={wallet.level} xp={wallet.xp} />
      </div>
      
      <div className="flex gap-4 mb-6">
        <Button onClick={() => handleAction(handleDeposit)} className="cyber-button flex-1">
          <PlusCircle className="w-4 h-4 mr-2" />
          Deposit
        </Button>
        <Button onClick={() => handleAction(handleWithdraw)} className="cyber-button flex-1">
          <MinusCircle className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BotControl
          allocatedFunds={wallet.allocatedFunds}
          onAllocate={(amount) => handleAction(() => wallet.allocate(amount))}
          onStart={() => handleAction(handleStartBot)}
          onStop={() => handleAction(handleStopBot)}
        />
        <TradeHistory trades={wallet.trades} />
      </div>

      <AuthOverlay 
        isOpen={showAuthOverlay} 
        onClose={() => setShowAuthOverlay(false)} 
      />
    </div>
  );
};

export default Index;