import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthOverlay } from "@/components/AuthOverlay";
import { ProfitCalculator } from "@/components/landing/ProfitCalculator";
import { Stats } from "@/components/landing/Stats";
import { ReferralCompetition } from "@/components/landing/ReferralCompetition";
import { TopEarnersLeaderboard } from "@/components/landing/TopEarnersLeaderboard";
import { ScamPreventionDemo } from "@/components/landing/ScamPreventionDemo";
import { motion } from "framer-motion";

const Landing = () => {
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent"
          >
            SolanaQM
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button 
              onClick={() => setShowAuthOverlay(true)}
              className="cyber-button"
            >
              Launch App
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent bg-clip-text text-transparent">
              Protect Your Investments from Scam Coins
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Advanced meme coin sniping bot that detects and prevents scam tokens before they can harm investors
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowAuthOverlay(true)}
                className="cyber-button text-lg px-8 py-6"
              >
                Launch App
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="text-lg px-8 py-6 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
              >
                <Link to="/documentation">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProfitCalculator />
          </motion.div>
        </div>
      </section>

      <Stats />
      <ScamPreventionDemo />

      {/* Referral Competition Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <ReferralCompetition />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="cyber-card backdrop-blur-xl bg-gradient-to-br from-cyber-background/80 to-cyber-background/40"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              Join the Competition
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Refer friends to earn rewards and climb the leaderboard. Top referrers get exclusive benefits and increased profit sharing.
            </p>
            <Button 
              onClick={() => setShowAuthOverlay(true)}
              className="cyber-button"
            >
              Start Referring
            </Button>
          </motion.div>
        </div>
      </section>

      <TopEarnersLeaderboard />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cyber-card text-center backdrop-blur-xl bg-gradient-to-br from-cyber-background/80 to-cyber-background/40"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent bg-clip-text text-transparent">
            Ready to Trade Safely?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust our bot to protect their investments
          </p>
          <Button 
            onClick={() => setShowAuthOverlay(true)}
            className="cyber-button text-lg px-8 py-6"
          >
            Get Started Now
          </Button>
        </motion.div>
      </section>

      <AuthOverlay 
        isOpen={showAuthOverlay} 
        onClose={() => setShowAuthOverlay(false)}
        defaultView="sign_up"
      />
    </div>
  );
};

export default Landing;