import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart";

const performanceData = [
  { date: "Jan", profit: 2500 },
  { date: "Feb", profit: 3800 },
  { date: "Mar", profit: 5200 },
  { date: "Apr", profit: 7800 },
  { date: "May", profit: 9600 },
  { date: "Jun", profit: 12400 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    theme: {
      light: "#6EE7B7",
      dark: "#6EE7B7",
    },
  },
};

export function PerformanceGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card h-[300px] w-full"
    >
      <h3 className="text-xl font-bold mb-4 text-cyber-primary">Historical Performance</h3>
      <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-profit)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-profit)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="var(--color-profit)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="var(--color-profit)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border border-border/50 bg-background p-2 shadow-xl">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground">Profit</span>
                          <span className="font-bold">
                            ${payload[0].value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="var(--color-profit)"
                fill="url(#profitGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </motion.div>
  );
}