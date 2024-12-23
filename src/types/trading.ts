export interface Trade {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  entryPrice: number;
  leverage: number;
  size: number;
  pnl: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface WalletState {
  balance: number;
  allocatedFunds: number;
  equity: number;
  level: number;
  xp: number;
  trades: Trade[];
  achievements: Achievement[];
}