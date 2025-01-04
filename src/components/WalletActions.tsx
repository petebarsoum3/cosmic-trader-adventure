import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

const SOLANA_ADDRESS = "CUrJoDNft83ho7i9tcopxce4QYrXfxRQ3yp3oLemw6HU";
const SOL_TO_USD = 100; // Example rate: 1 SOL = $100 USD

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
  const [transactionChecked, setTransactionChecked] = useState(false);
  const { toast } = useToast();

  const handleDepositNext = () => {
    const solAmount = Number(amount);
    if (!amount || solAmount < 1) {
      toast({
        title: "Invalid amount",
        description: "Minimum deposit is 1 SOL",
        variant: "destructive",
      });
      return;
    }
    setShowQR(true);
  };

  const handleDeposit = () => {
    setTransactionChecked(true);
    toast({
      title: "No transaction detected",
      description: "Please wait for manual confirmation of your deposit.",
    });
  };

  const handleCloseDeposit = () => {
    if (!transactionChecked) {
      setIsDepositOpen(false);
      setAmount("");
      setShowQR(false);
      setTransactionChecked(false);
    }
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

  const handleDialogClose = (open: boolean) => {
    if (!open && !transactionChecked) {
      handleCloseDeposit();
    }
  };

  const handleManualClose = () => {
    setIsDepositOpen(false);
    setAmount("");
    setShowQR(false);
    setTransactionChecked(false);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDepositOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              {!showQR 
                ? "Enter the amount you want to deposit in SOL (minimum 1 SOL)"
                : "Send SOL to the address below"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!showQR ? (
              <>
                <Input
                  type="number"
                  placeholder="Enter SOL amount (min: 1 SOL)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.1"
                  className="cyber-input"
                />
                <div className="text-sm text-muted-foreground">
                  Estimated value: ${(Number(amount) * SOL_TO_USD).toFixed(2)} USD
                </div>
                <Button onClick={handleDepositNext} className="w-full cyber-button">
                  Next
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-2">
                  <QRCodeSVG value={SOLANA_ADDRESS} size={200} />
                  <p className="text-sm font-mono bg-black/20 p-2 rounded break-all">{SOLANA_ADDRESS}</p>
                  <p className="text-sm text-center">Amount to send: {amount} SOL</p>
                  <p className="text-sm text-center text-muted-foreground">
                    (≈ ${(Number(amount) * SOL_TO_USD).toFixed(2)} USD)
                  </p>
                </div>
                {!transactionChecked ? (
                  <Button onClick={handleDeposit} className="w-full cyber-button">
                    Check Transaction
                  </Button>
                ) : (
                  <>
                    <p className="text-center text-sm text-muted-foreground">
                      Waiting for transaction confirmation...
                    </p>
                    <Button onClick={handleManualClose} className="w-full cyber-button">
                      Close
                    </Button>
                  </>
                )}
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