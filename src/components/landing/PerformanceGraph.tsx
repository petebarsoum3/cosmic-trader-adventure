import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const performanceData = [
  { date: "Jan", profit: 2500 },
  { date: "Feb", profit: 3800 },
  { date: "Mar", profit: 5200 },
  { date: "Apr", profit: 7800 },
  { date: "May", profit: 9600 },
  { date: "Jun", profit: 12400 },
];

export function PerformanceGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card h-[300px] w-full"
    >
      <h3 className="text-xl font-bold mb-4 text-cyber-primary">Historical Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={performanceData}>
          <defs>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#6EE7B7" />
          <YAxis stroke="#6EE7B7" />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(110, 231, 183, 0.1)",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#6EE7B7"
            fill="url(#profitGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}