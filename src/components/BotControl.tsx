import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Power, Rocket } from "lucide-react";

interface BotControlProps {
  allocatedFunds: number;
  onAllocate: (amount: number) => void;
  onStart: () => void;
  onStop: () => void;
}

export function BotControl({ allocatedFunds, onAllocate, onStart, onStop }: BotControlProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [leverage, setLeverage] = useState(1);

  const handleStart = () => {
    if (allocatedFunds <= 0) {
      return;
    }
    setIsRunning(true);
    onStart();
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop();
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
          <label className="text-sm text-muted-foreground">Allocated Funds</label>
          <Input
            type="number"
            value={allocatedFunds}
            onChange={(e) => onAllocate(Number(e.target.value))}
            className="cyber-input"
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