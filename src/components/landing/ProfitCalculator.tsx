import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const ProfitCalculator = () => {
  const [investment, setInvestment] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const dailyRate = 0.07;
    const days = 30;
    let total = investment;
    for (let i = 0; i < days; i++) {
      total += total * dailyRate;
    }
    setProfit(total - investment);
  }, [investment]);

  return (
    <div className="cyber-card p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Profit Calculator</h3>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-400">$</span>
          <Input
            type="number"
            className="cyber-input pl-8 w-full"
            placeholder="Enter investment amount"
            onChange={(e) => setInvestment(Number(e.target.value))}
          />
        </div>
        <div className="p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-gray-400">Estimated profit in 30 days:</p>
          <p className="text-2xl font-bold text-cyber-primary">${profit.toFixed(2)}</p>
          <p className="text-xs text-gray-400">Based on our average daily return of 7%</p>
        </div>
      </div>
    </div>
  );
};