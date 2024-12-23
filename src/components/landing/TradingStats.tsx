import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatCardProps {
  value: number;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="cyber-card"
    >
      <div className="text-3xl font-bold text-cyber-primary mb-2">
        {count.toLocaleString()}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}

export function TradingStats() {
  const stats = [
    { value: 15482, label: "Active Trades" },
    { value: 892341, label: "Total Volume" },
    { value: 3219, label: "Active Users" },
    { value: 99, label: "Success Rate" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          label={stat.label}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}