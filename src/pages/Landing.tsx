import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthOverlay } from "@/components/AuthOverlay";
import { ProfitCalculator } from "@/components/landing/ProfitCalculator";
import { Stats } from "@/components/landing/Stats";
import { ReferralCompetition } from "@/components/landing/ReferralCompetition";
import { TopEarnersLeaderboard } from "@/components/landing/TopEarnersLeaderboard";

const Landing = () => {
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-background">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyber-primary">SolanaQM</h1>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              Protect Your Investments from Scam Coins
            </h1>
            <p className="text-xl text-gray-300">
              Advanced meme coin sniping bot that detects and prevents scam tokens before they can harm investors
            </p>
            <div className="space-x-4">
              <Button 
                onClick={() => setShowAuthOverlay(true)}
                className="cyber-button"
              >
                Launch App
              </Button>
              <Button asChild variant="outline">
                <Link to="/documentation">Learn More</Link>
              </Button>
            </div>
          </div>
          <ProfitCalculator />
        </div>
      </section>

      <Stats />

      {/* Referral Competition Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <ReferralCompetition />
          <div className="cyber-card">
            <h2 className="text-2xl font-bold mb-4">Join the Competition</h2>
            <p className="text-gray-300 mb-6">
              Refer friends to earn rewards and climb the leaderboard. Top referrers get exclusive benefits and increased profit sharing.
            </p>
            <Button 
              onClick={() => setShowAuthOverlay(true)}
              className="cyber-button"
            >
              Start Referring
            </Button>
          </div>
        </div>
      </section>

      {/* Top Earners Leaderboard */}
      <TopEarnersLeaderboard />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="cyber-card text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Trade Safely?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders who trust our bot to protect their investments
          </p>
          <Button 
            onClick={() => setShowAuthOverlay(true)}
            className="cyber-button"
          >
            Get Started Now
          </Button>
        </div>
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