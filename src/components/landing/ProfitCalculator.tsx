import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator } from "lucide-react";

export function ProfitCalculator() {
  const [investment, setInvestment] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(1);
  const [hourlyProfits, setHourlyProfits] = useState<any[]>([]);

  useEffect(() => {
    const hourlyRate = 0.17; // 17% per hour
    const hours = Array.from({ length: 24 }, (_, i) => i + 1);
    
    const profits = hours.map(hour => {
      const compoundedProfit = investment * leverage * Math.pow(1 + hourlyRate, hour);
      return {
        hour: `Hour ${hour}`,
        profit: Math.round(compoundedProfit * 100) / 100
      };
    });
    
    setHourlyProfits(profits);
  }, [investment, leverage]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="cyber-card"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-cyber-primary" />
        <h3 className="text-2xl font-bold">Profit Calculator</h3>
      </div>

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
          <label className="block text-sm mb-2">Leverage ({leverage}x)</label>
          <Slider
            value={[leverage]}
            onValueChange={(value) => setLeverage(value[0])}
            min={1}
            max={10}
            step={1}
            className="cyber-slider"
          />
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyProfits}>
              <XAxis 
                dataKey="hour" 
                stroke="#6EE7B7"
                fontSize={10}
                interval={3}
              />
              <YAxis 
                stroke="#6EE7B7"
                fontSize={10}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #6EE7B7",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#6EE7B7" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-black/30 border border-cyber-primary/20">
            <p className="text-sm text-gray-400">Hourly Return</p>
            <p className="text-2xl font-bold text-cyber-primary">17%</p>
          </div>
          <div className="p-4 rounded-lg bg-black/30 border border-cyber-primary/20">
            <p className="text-sm text-gray-400">24h Potential</p>
            <p className="text-2xl font-bold text-cyber-primary">
              ${hourlyProfits[23]?.profit.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}