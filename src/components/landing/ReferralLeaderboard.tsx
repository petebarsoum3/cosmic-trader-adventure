import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function ReferralLeaderboard() {
  const { data: topReferrers, isLoading } = useQuery({
    queryKey: ['topReferrers'],
    queryFn: async () => {
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
      <div className="flex items-center gap-2 mb-6">
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
              <span className="text-sm font-mono">
                {referrer.referrer_id.slice(0, 8)}...{referrer.referrer_id.slice(-8)}
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