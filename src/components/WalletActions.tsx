import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

const SOLANA_ADDRESS = "CUrJoDNft83ho7i9tcopxce4QYrXfxRQ3yp3oLemw6HU";

interface WalletActionsProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

export function WalletActions({ balance, onBalanceChange }: WalletActionsProps) {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const handleDepositNext = () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }
    setShowQR(true);
  };

  const handleDeposit = () => {
    toast({
      title: "No transaction detected",
      description: "Please wait for manual confirmation of your deposit.",
    });
    setIsDepositOpen(false);
    setAmount("");
    setShowQR(false);
  };

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

  const handleCloseDeposit = () => {
    setIsDepositOpen(false);
    setAmount("");
    setShowQR(false);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDepositOpen} onOpenChange={handleCloseDeposit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              {!showQR 
                ? "Enter the amount you want to deposit in USD"
                : "Send SOL to the address below. The equivalent USD amount will be credited to your account."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!showQR ? (
              <>
                <Input
                  type="number"
                  placeholder="Enter USD amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="cyber-input"
                />
                <Button onClick={handleDepositNext} className="w-full cyber-button">
                  Next
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-2">
                  <QRCodeSVG value={SOLANA_ADDRESS} size={200} />
                  <p className="text-sm font-mono bg-black/20 p-2 rounded break-all">{SOLANA_ADDRESS}</p>
                  <p className="text-sm text-center">Amount to deposit: ${amount} USD</p>
                </div>
                <Button onClick={handleDeposit} className="w-full cyber-button">
                  Confirm Sent
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw and your Solana address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter USD amount"
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