import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Timer, Trophy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';

export function ReferralCompetition() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const { toast } = useToast();
  const session = useSession();

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

  const generateReferralCode = async () => {
    try {
      if (!session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to create a referral code",
          variant: "destructive"
        });
        return;
      }

      const customCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { error } = await supabase.from('referrals').insert({
        referrer_id: session.user.id,
        referred_id: session.user.id,
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
        </div>
      </div>
    </section>
  );
}