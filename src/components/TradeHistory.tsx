import { useEffect, useState } from "react";
import { Trade } from "../types/trading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TradeHistoryProps {
  trades: Trade[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  return (
    <div className="cyber-card h-[400px]">
      <h2 className="text-xl font-bold mb-4">Trade History</h2>
      <ScrollArea className="h-[340px]">
        <div className="space-y-2">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="trade-row flex items-center justify-between p-2 rounded-md bg-white/5"
            >
              <div className="flex items-center gap-2">
                {trade.pnl >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span>{trade.symbol}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={trade.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                  ${trade.pnl.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}