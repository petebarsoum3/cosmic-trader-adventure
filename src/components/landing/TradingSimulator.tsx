import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

export function TradingSimulator() {
  const [price, setPrice] = useState(100);
  const [balance, setBalance] = useState(1000);
  const [history, setHistory] = useState<string[]>([]);

  const trade = (direction: 'up' | 'down') => {
    const change = Math.random() * 10 - (direction === 'up' ? -3 : 5);
    const newPrice = Math.max(1, price + change);
    const profit = direction === 'up' ? 
      (change > 0 ? 100 : -100) :
      (change < 0 ? 100 : -100);
    
    setPrice(newPrice);
    setBalance(balance + profit);
    setHistory(prev => [`${direction === 'up' ? '📈' : '📉'} ${profit > 0 ? '+' : ''}${profit}`, ...prev.slice(0, 4)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card"
    >
      <h3 className="text-xl font-bold mb-4 text-cyber-primary">Trading Simulator</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Your Balance</p>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => trade('up')}
          className="flex-1 bg-green-500 hover:bg-green-600"
        >
          <ArrowUp className="mr-2" /> Buy
        </Button>
        <Button
          onClick={() => trade('down')}
          className="flex-1 bg-red-500 hover:bg-red-600"
        >
          <ArrowDown className="mr-2" /> Sell
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-400">Recent Trades:</p>
        {history.map((trade, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm border border-white/10 rounded p-2 bg-black/20"
          >
            {trade}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}