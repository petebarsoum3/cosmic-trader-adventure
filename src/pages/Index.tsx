import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { AuthOverlay } from "@/components/AuthOverlay";
import { Features } from "@/components/landing/Features";
import { ProfitCalculator } from "@/components/landing/ProfitCalculator";
import { TradingStats } from "@/components/landing/TradingStats";
import { TradingSimulator } from "@/components/landing/TradingSimulator";

const Index = () => {
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

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

          <ProfitCalculator />
        </div>
      </motion.div>

      {/* Trading Simulator */}
      <div className="container py-10">
        <TradingSimulator />
      </div>

      {/* Stats Section */}
      <div className="bg-black/30 py-20">
        <div className="container">
          <TradingStats />
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <Features />
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