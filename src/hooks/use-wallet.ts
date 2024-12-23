import { useState, useEffect } from 'react';
import { WalletState, Trade, Achievement } from '../types/trading';
import { useToast } from './use-toast';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_deposit',
    title: 'First Steps',
    description: 'Make your first deposit',
    icon: 'Wallet',
    unlocked: false,
  },
  {
    id: 'thousand_club',
    title: '1000 USDT Club',
    description: 'Reach 1000 USDT in your wallet',
    icon: 'Trophy',
    unlocked: false,
  },
  {
    id: 'profitable_trader',
    title: 'Profitable Trader',
    description: 'Achieve 10% PnL',
    icon: 'TrendingUp',
    unlocked: false,
  },
];

const INITIAL_STATE: WalletState = {
  balance: 0,
  allocatedFunds: 0,
  equity: 0,
  level: 1,
  xp: 0,
  trades: [],
  achievements: INITIAL_ACHIEVEMENTS,
};

export function useWallet() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);
  const { toast } = useToast();

  useEffect(() => {
    const savedState = localStorage.getItem('walletState');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('walletState', JSON.stringify(state));
  }, [state]);

  const deposit = (amount: number) => {
    setState(prev => {
      const newBalance = prev.balance + amount;
      const newState = {
        ...prev,
        balance: newBalance,
        equity: newBalance + prev.allocatedFunds,
      };

      // Check achievements
      if (!prev.achievements.find(a => a.id === 'first_deposit')?.unlocked) {
        unlockAchievement('first_deposit');
      }
      if (newBalance >= 1000 && !prev.achievements.find(a => a.id === 'thousand_club')?.unlocked) {
        unlockAchievement('thousand_club');
      }

      return newState;
    });
  };

  const withdraw = (amount: number) => {
    if (amount > state.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance to withdraw this amount",
        variant: "destructive",
      });
      return false;
    }

    setState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      equity: prev.balance - amount + prev.allocatedFunds,
    }));
    return true;
  };

  const allocate = (amount: number) => {
    setState(prev => ({
      ...prev,
      allocatedFunds: amount,
      equity: prev.balance + amount,
    }));
  };

  const addTrade = (trade: Trade) => {
    setState(prev => {
      const newTrades = [trade, ...prev.trades].slice(0, 100);
      const totalPnl = newTrades.reduce((acc, t) => acc + t.pnl, 0);
      const pnlPercentage = (totalPnl / prev.allocatedFunds) * 100;

      // Check for profitable trader achievement
      if (pnlPercentage >= 10 && !prev.achievements.find(a => a.id === 'profitable_trader')?.unlocked) {
        unlockAchievement('profitable_trader');
      }

      return {
        ...prev,
        trades: newTrades,
        xp: prev.xp + Math.abs(trade.pnl),
        level: Math.floor(prev.xp / 1000) + 1,
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setState(prev => ({
      ...prev,
      achievements: prev.achievements.map(a =>
        a.id === achievementId ? { ...a, unlocked: true } : a
      ),
    }));

    toast({
      title: "Achievement Unlocked! 🏆",
      description: state.achievements.find(a => a.id === achievementId)?.title,
    });
  };

  return {
    ...state,
    deposit,
    withdraw,
    allocate,
    addTrade,
  };
}