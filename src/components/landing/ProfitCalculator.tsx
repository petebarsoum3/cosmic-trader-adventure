import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

export function ProfitCalculator() {
  const [investment, setInvestment] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(1);
  const [dailyProfit, setDailyProfit] = useState(0);

  useEffect(() => {
    const profitRate = 0.01; // 1% daily profit rate
    const estimatedProfit = investment * leverage * profitRate;
    setDailyProfit(estimatedProfit);
  }, [investment, leverage]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="cyber-card"
    >
      <h3 className="text-2xl font-bold mb-6 text-cyber-primary">Profit Calculator</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Investment Amount (USDT)</label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="cyber-input"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Leverage (1-10x)</label>
          <Slider
            value={[leverage]}
            onValueChange={(value) => setLeverage(value[0])}
            min={1}
            max={10}
            step={1}
            className="cyber-slider"
          />
          <span className="block text-right text-sm mt-1">{leverage}x</span>
        </div>
        <div className="p-4 rounded-lg bg-black/30 border border-cyber-primary/20">
          <p className="text-sm text-gray-400">Estimated Monthly Profit:</p>
          <p className="text-3xl font-bold text-cyber-primary">
            ${(dailyProfit * 30).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Based on historical performance</p>
        </div>
      </div>
    </motion.div>
  );
}