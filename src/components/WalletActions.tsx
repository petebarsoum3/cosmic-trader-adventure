import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DepositDialogContent } from "./deposit/DepositDialogContent";

interface WalletActionsProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

export function WalletActions({ balance, onBalanceChange }: WalletActionsProps) {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const { toast } = useToast();

  const handleWithdraw = () => {
    const withdrawAmount = Number(amount);
    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    onBalanceChange(balance - withdrawAmount);
    toast({
      title: "Withdrawal request submitted",
      description: "Your withdrawal request is being processed.",
    });
    setIsWithdrawOpen(false);
    setAmount("");
    setWithdrawAddress("");
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DepositDialogContent onClose={() => setIsDepositOpen(false)} />
      </Dialog>

      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw SOL</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw and your Solana address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter SOL amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="cyber-input"
            />
            <Input
              placeholder="Enter Solana address"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              className="cyber-input"
            />
            <Button onClick={handleWithdraw} className="w-full cyber-button">
              Submit Withdrawal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4">
        <Button onClick={() => setIsDepositOpen(true)} className="cyber-button flex-1">
          Deposit
        </Button>
        <Button onClick={() => setIsWithdrawOpen(true)} className="cyber-button flex-1">
          Withdraw
        </Button>
      </div>
    </div>
  );
}