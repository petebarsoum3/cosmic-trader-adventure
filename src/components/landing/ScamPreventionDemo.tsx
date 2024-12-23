import { motion } from "framer-motion";
import { Bot, TrendingUp, TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";
import { TradingCanvas } from "./animations/TradingCanvas";

export const ScamPreventionDemo = () => {
  return (
    <section className="container mx-auto px-4 py-20 relative overflow-hidden">
      <div className="cyber-card backdrop-blur-xl bg-gradient-to-br from-cyber-background/80 to-cyber-background/40">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent bg-clip-text text-transparent">
              How We Protect Your Investment
            </h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/20 transition-colors"
              >
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Volume Manipulation</h3>
                  <p className="text-gray-300">
                    Scam tokens use volume bots and fake transactions to create artificial price movements
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-red-500/10 hover:border-red-500/20 transition-colors"
              >
                <Bot className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Chart Manipulation</h3>
                  <p className="text-gray-300">
                    These bots manipulate charts to trick investors into thinking the token is more valuable
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-cyber-primary/10 hover:border-cyber-primary/20 transition-colors"
              >
                <ShieldCheck className="w-6 h-6 text-cyber-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-cyber-primary mb-1">Our Protection</h3>
                  <p className="text-gray-300">
                    Our quant bot analyzes transaction patterns to detect and counter manipulation attempts
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="relative h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <TradingCanvas />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-cyber-background/80 p-4 rounded-lg backdrop-blur-sm border border-cyber-primary/20">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 font-mono">Scam Detected</span>
                  <TrendingUp className="w-5 h-5 text-cyber-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};