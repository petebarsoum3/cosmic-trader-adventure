import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Zap, Target, AlertTriangle, Timer, Trophy, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const [investment, setInvestment] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const { toast } = useToast();

  // Calculate time until January 1st
  useEffect(() => {
    const targetDate = new Date('2025-01-01T00:00:00');
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      setTimeLeft(difference);
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate profit based on 7% daily return
  useEffect(() => {
    const dailyRate = 0.07; // 7% daily
    const days = 30;
    let total = investment;
    for (let i = 0; i < days; i++) {
      total += total * dailyRate;
    }
    setProfit(total - investment);
  }, [investment]);

  const generateReferralCode = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to create a referral code",
          variant: "destructive"
        });
        return;
      }

      const customCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { error } = await supabase.from('referrals').insert({
        referrer_id: user.id,
        referred_id: user.id, // Temporary, will be updated when used
        custom_code: customCode
      });

      if (error) throw error;

      setReferralCode(customCode);
      toast({
        title: "Success!",
        description: "Your referral code has been created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate referral code",
        variant: "destructive"
      });
    }
  };

  const formatTimeLeft = () => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

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
          <div className="cyber-card p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Profit Calculator</h3>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">$</span>
                <Input
                  type="number"
                  className="cyber-input pl-8 w-full"
                  placeholder="Enter investment amount"
                  onChange={(e) => setInvestment(Number(e.target.value))}
                />
              </div>
              <div className="p-4 bg-black/20 rounded-lg">
                <p className="text-sm text-gray-400">Estimated profit in 30 days:</p>
                <p className="text-2xl font-bold text-cyber-primary">${profit.toFixed(2)}</p>
                <p className="text-xs text-gray-400">Based on our average daily return of 7%</p>
              </div>
            </div>
          </div>
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

      {/* Referral Competition Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 rounded-3xl mb-20">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-4">
            <Trophy className="w-12 h-12 text-cyber-primary animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              $50,000 Referral Competition
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Timer className="w-6 h-6 text-cyber-secondary" />
            <p className="text-2xl font-mono text-cyber-secondary">
              {formatTimeLeft()}
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl text-gray-300">
              Join our referral program and compete for a share of the $50,000 prize pool! 
              The more friends you bring, the bigger your share of the prize.
            </p>
            
            {referralCode ? (
              <div className="p-6 bg-black/40 rounded-xl border border-cyber-primary/50">
                <p className="text-lg text-gray-300 mb-2">Your Referral Code:</p>
                <p className="text-3xl font-mono text-cyber-primary">{referralCode}</p>
              </div>
            ) : (
              <Button 
                onClick={generateReferralCode}
                className="cyber-button text-lg py-6 px-8"
              >
                <Users className="mr-2 h-5 w-5" />
                Generate Your Referral Code
              </Button>
            )}

            <p className="text-sm text-gray-400">
              Current Top Referrer: 324 referrals • Prize Pool Progress: $32,450 / $50,000
            </p>
          </div>
        </div>
      </section>

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
