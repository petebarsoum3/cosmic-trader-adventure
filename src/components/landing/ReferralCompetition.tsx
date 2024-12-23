import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Gift } from "lucide-react";

export const ReferralCompetition = () => {
  const { data: topReferrers, isLoading } = useQuery({
    queryKey: ['topReferrers'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_top_referrers', { limit_count: 5 });
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="cyber-card">
        <h2 className="text-2xl font-bold mb-4">$50,000 Referral Competition</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-6 h-6 text-cyber-primary" />
        <h2 className="text-2xl font-bold">$50,000 Referral Competition</h2>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-4 h-4 text-cyber-secondary" />
        <p className="text-gray-400">Top referrers share the prize pool</p>
      </div>
      <div className="space-y-4">
        {topReferrers?.map((referrer, index) => (
          <div 
            key={referrer.referrer_id} 
            className="flex justify-between items-center p-4 rounded-lg bg-cyber-background/50 border border-cyber-primary/20 hover:border-cyber-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-cyber-primary font-bold min-w-[2rem]">#{index + 1}</span>
              <span className="text-gray-300">
                {referrer.referrer_id === 'dfa4b29f-975d-4131-afa8-7452e7118343' 
                  ? 'SolanaQM' 
                  : `User ${referrer.referrer_id.slice(0, 6)}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyber-secondary font-bold">{referrer.referral_count}</span>
              <span className="text-gray-400">referrals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};