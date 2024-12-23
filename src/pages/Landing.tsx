import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Zap, Target, AlertTriangle } from "lucide-react";
import { ProfitCalculator } from "@/components/landing/ProfitCalculator";
import { ReferralCompetition } from "@/components/landing/ReferralCompetition";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cyber-background">
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
              <Button asChild className="cyber-button">
                <Link to="/dashboard">Launch App</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/documentation">Learn More</Link>
              </Button>
            </div>
          </div>
          <ProfitCalculator />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="cyber-card">
            <h3 className="text-3xl font-bold text-cyber-primary">15,482</h3>
            <p className="text-sm text-gray-400">Scams Prevented</p>
          </div>
          <div className="cyber-card">
            <h3 className="text-3xl font-bold text-cyber-secondary">892,341</h3>
            <p className="text-sm text-gray-400">Protected Value</p>
          </div>
          <div className="cyber-card">
            <h3 className="text-3xl font-bold text-cyber-accent">3,219</h3>
            <p className="text-sm text-gray-400">Active Users</p>
          </div>
          <div className="cyber-card">
            <h3 className="text-3xl font-bold text-cyber-primary">99%</h3>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Advanced Protection Features</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="cyber-card">
            <Shield className="w-12 h-12 text-cyber-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Scam Detection</h3>
            <p className="text-gray-400">Advanced algorithms detect malicious token contracts instantly</p>
          </div>
          <div className="cyber-card">
            <Zap className="w-12 h-12 text-cyber-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast Analysis</h3>
            <p className="text-gray-400">Analyze token contracts in milliseconds before they can cause harm</p>
          </div>
          <div className="cyber-card">
            <Target className="w-12 h-12 text-cyber-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">Precision Sniping</h3>
            <p className="text-gray-400">Execute trades with perfect timing on legitimate opportunities</p>
          </div>
          <div className="cyber-card">
            <AlertTriangle className="w-12 h-12 text-cyber-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
            <p className="text-gray-400">Comprehensive risk scoring system for all new tokens</p>
          </div>
        </div>
      </section>

      <ReferralCompetition />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="cyber-card text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Trade Safely?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders who trust our bot to protect their investments
          </p>
          <Button asChild className="cyber-button">
            <Link to="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;