import { Trophy, Star } from "lucide-react";

interface TraderLevelProps {
  level: number;
  xp: number;
}

export function TraderLevel({ level, xp }: TraderLevelProps) {
  const nextLevelXp = level * 1000;
  const progress = (xp % 1000) / 10;

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-cyber-primary" />
          Trader Level
        </h2>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-cyber-secondary" />
          <span className="text-2xl font-bold">{level}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>XP: {xp}</span>
          <span>Next: {nextLevelXp}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}