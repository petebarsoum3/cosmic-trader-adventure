import { Trophy, Medal, Award } from "lucide-react";

export const TopEarnersLeaderboard = () => {
  const topEarners = [
    { rank: 1, amount: 257432, name: "Maulable" },
    { rank: 2, amount: 191765, name: "eyyoo" },
    { rank: 3, amount: 88921, name: "PaulyD" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="cyber-card">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Earners This Month</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topEarners.map((earner) => (
            <div
              key={earner.rank}
              className="flex flex-col items-center p-6 rounded-lg bg-cyber-background/50 border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all hover:transform hover:scale-105"
            >
              <div className="mb-4">{getRankIcon(earner.rank)}</div>
              <div className="text-xl font-bold text-cyber-primary mb-2">
                #{earner.rank} - {earner.name}
              </div>
              <div className="text-2xl font-bold text-cyber-secondary">
                ${earner.amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mt-1">earned this month</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};