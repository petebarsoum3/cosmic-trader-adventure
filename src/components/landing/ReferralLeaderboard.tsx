import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, UserRound, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Demo data for development
const DEMO_REFERRERS = [
  { referrer_id: "7b8e9f2a-1c3d-4e5f-6g7h-8i9j0k1l2m3n", referral_count: 12 },
  { referrer_id: "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p", referral_count: 8 },
  { referrer_id: "9p8o7n6m-5l4k-3j2i-1h0g-9f8e7d6c5b4a", referral_count: 6 },
  { referrer_id: "3f4g5h6i-7j8k-9l0m-1n2o-3p4q5r6s7t8u", referral_count: 4 },
  { referrer_id: "5t6u7v8w-9x0y-1z2a-3b4c-5d6e7f8g9h0i", referral_count: 3 },
];

const USERNAMES = {
  "7b8e9f2a-1c3d-4e5f-6g7h-8i9j0k1l2m3n": "CryptoWhale",
  "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p": "TradingPro",
  "9p8o7n6m-5l4k-3j2i-1h0g-9f8e7d6c5b4a": "SolanaKing",
  "3f4g5h6i-7j8k-9l0m-1n2o-3p4q5r6s7t8u": "MoonTrader",
  "5t6u7v8w-9x0y-1z2a-3b4c-5d6e7f8g9h0i": "DiamondHands",
};

export function ReferralLeaderboard() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const nye = new Date("2024-12-31T23:59:59");
      const now = new Date();
      const difference = nye.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data: topReferrers, isLoading } = useQuery({
    queryKey: ['topReferrers'],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_REFERRERS;
      }
      const { data, error } = await supabase.rpc('get_top_referrers', { limit_count: 5 });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="cyber-card animate-pulse">
        <div className="h-48 bg-gray-700/20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card"
    >
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 rounded-lg">
        <h3 className="text-2xl font-bold text-cyber-primary mb-2">50,000 USDT Prize Pool</h3>
        <div className="flex items-center justify-center gap-2 text-xl">
          <Timer className="w-5 h-5 text-cyber-secondary animate-pulse" />
          <span className="font-mono">{timeLeft}</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">Until New Year's Eve - Highest Referrals Win!</p>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-cyber-primary" />
        <h2 className="text-xl font-bold">Top Referrers</h2>
      </div>
      
      <div className="space-y-4">
        {topReferrers?.map((referrer, index) => (
          <div
            key={referrer.referrer_id}
            className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-cyber-primary">#{index + 1}</span>
              <UserRound className="w-5 h-5 text-cyber-secondary" />
              <span className="text-sm font-mono">
                {process.env.NODE_ENV === 'development' 
                  ? USERNAMES[referrer.referrer_id as keyof typeof USERNAMES]
                  : `${referrer.referrer_id.slice(0, 8)}...${referrer.referrer_id.slice(-8)}`
                }
              </span>
            </div>
            <span className="text-cyber-secondary font-bold">
              {referrer.referral_count} referrals
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}