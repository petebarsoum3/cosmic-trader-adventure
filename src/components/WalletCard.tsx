import { Card } from "@/components/ui/card";
import { Wallet, TrendingUp } from "lucide-react";

interface WalletCardProps {
  balance: number;
  allocatedFunds: number;
  equity: number;
}

export function WalletCard({ balance, allocatedFunds, equity }: WalletCardProps) {
  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-cyber-primary" />
          Wallet Overview
        </h2>
        <TrendingUp className="w-6 h-6 text-cyber-secondary" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Allocated</p>
          <p className="text-2xl font-bold">${allocatedFunds.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Equity</p>
          <p className="text-2xl font-bold">${equity.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}