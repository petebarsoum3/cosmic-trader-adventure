import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { AuthOverlay } from "@/components/AuthOverlay";

const Index = () => {
  const [investment, setInvestment] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(1);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

  const calculateProfit = () => {
    const dailyReturn = 0.03; // 3% daily return
    const monthlyReturn = (investment * leverage * dailyReturn * 30).toFixed(2);
    return monthlyReturn;
  };

  const stats = [
    { value: 15482, label: "Active Trades" },
    { value: 892341, label: "Total Volume" },
    { value: 3219, label: "Active Users" },
    { value: 99, label: "Success Rate" },
  ];

  const features = [
    {
      icon: "💎",
      title: "AI-Powered Trading",
      description: "Advanced algorithms maximize your profits",
    },
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Execute trades in milliseconds",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description: "Smart stop-loss and take-profit",
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track your performance live",
    },
  ];

  const handleGetStarted = () => {
    if (!session) {
      setShowAuthOverlay(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-cyber-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 blur-3xl" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              SolanaQM
            </h1>
            <p className="text-xl text-gray-300">
              Advanced AI-powered trading bot that maximizes your profits in the Solana ecosystem
            </p>
            <Button 
              onClick={handleGetStarted}
              className="cyber-button text-lg px-8 py-4"
            >
              Start Trading Now
            </Button>
          </motion.div>

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
                <p className="text-3xl font-bold text-cyber-primary">${calculateProfit()}</p>
                <p className="text-xs text-gray-500 mt-2">Based on historical performance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-black/30 py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card text-center"
              >
                <div className="text-3xl font-bold text-cyber-primary mb-2">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyber-primary">
          Advanced Trading Features
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-cyber-primary">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container py-20"
      >
        <div className="cyber-card text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-cyber-primary">
            Ready to Start Trading?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of traders who trust our AI-powered bot
          </p>
          <Button 
            onClick={handleGetStarted}
            className="cyber-button text-lg px-8 py-4"
          >
            Get Started Now
          </Button>
        </div>
      </motion.div>

      <AuthOverlay 
        isOpen={showAuthOverlay} 
        onClose={() => setShowAuthOverlay(false)} 
      />
    </div>
  );
};

export default Index;