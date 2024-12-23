import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Power, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BotControlProps {
  allocatedFunds: number;
  balance: number; // Add balance prop
  onAllocate: (amount: number) => void;
  onStart: () => void;
  onStop: () => void;
}

export function BotControl({ 
  allocatedFunds, 
  balance, 
  onAllocate, 
  onStart, 
  onStop 
}: BotControlProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [leverage, setLeverage] = useState(1);
  const [dailyProfit, setDailyProfit] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Calculate estimated daily profit based on allocated funds and leverage
    const profitRate = 0.01; // 1% daily profit rate
    const estimatedProfit = allocatedFunds * leverage * profitRate;
    setDailyProfit(estimatedProfit);
  }, [allocatedFunds, leverage]);

  const handleStart = () => {
    if (allocatedFunds <= 0) {
      toast({
        title: "Insufficient Funds",
        description: "Please allocate funds before starting the bot",
        variant: "destructive",
      });
      return;
    }
    setIsRunning(true);
    onStart();
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop();
  };

  const handleAllocate = (value: number) => {
    if (value > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You cannot allocate more funds than your available balance",
        variant: "destructive",
      });
      return;
    }
    onAllocate(value);
  };

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Rocket className="w-6 h-6 text-cyber-primary" />
          Bot Control
        </h2>
        <Power className={`w-6 h-6 ${isRunning ? "text-green-500" : "text-red-500"}`} />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Allocated Funds (Max: ${balance.toFixed(2)})
          </label>
          <Input
            type="number"
            value={allocatedFunds}
            onChange={(e) => handleAllocate(Number(e.target.value))}
            className="cyber-input"
            max={balance}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Leverage: {leverage}x</label>
          <Slider
            value={[leverage]}
            onValueChange={([value]) => setLeverage(value)}
            min={1}
            max={20}
            step={1}
            className="cyber-slider"
          />
        </div>
        <div className="p-4 rounded-lg bg-black/20 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Estimated Daily Profit:</span>
            <span className="text-sm font-bold text-cyber-primary">${dailyProfit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Position Size:</span>
            <span className="text-sm font-bold text-cyber-secondary">
              ${(allocatedFunds * leverage).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleStart}
            disabled={allocatedFunds <= 0 || isRunning}
            className="cyber-button flex-1"
          >
            Start Bot
          </Button>
          <Button
            onClick={handleStop}
            disabled={!isRunning}
            variant="destructive"
            className="flex-1"
          >
            Stop Bot
          </Button>
        </div>
      </div>
    </div>
  );
}