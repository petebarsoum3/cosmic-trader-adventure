import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

const SOLANA_ADDRESS = "CUrJoDNft83ho7i9tcopxce4QYrXfxRQ3yp3oLemw6HU";
const NETWORK_FEE = 0.003; // SOL
const PAYMENT_WINDOW = 60; // minutes

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
  const [timeRemaining, setTimeRemaining] = useState(PAYMENT_WINDOW * 60);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQR && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQR, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
    setTimeRemaining(PAYMENT_WINDOW * 60);
    setShowQR(true);
  };

  const handleDeposit = () => {
    setTransactionChecked(true);
    toast({
      title: "Checking transaction",
      description: "Please wait while we confirm your deposit.",
    });
  };

  const handleCloseDeposit = () => {
    if (!transactionChecked) {
      setIsDepositOpen(false);
      setAmount("");
      setShowQR(false);
      setTransactionChecked(false);
      setTimeRemaining(PAYMENT_WINDOW * 60);
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
    setTimeRemaining(PAYMENT_WINDOW * 60);
  };

  const totalAmount = Number(amount) + NETWORK_FEE;

  return (
    <div className="space-y-4">
      <Dialog open={isDepositOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit SOL</DialogTitle>
            <DialogDescription>
              {!showQR 
                ? "Enter the amount you want to deposit (minimum 1 SOL)"
                : "Send the exact amount of SOL to complete your deposit"
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
                  Network fee: {NETWORK_FEE} SOL
                </div>
                <Button onClick={handleDepositNext} className="w-full cyber-button">
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-black/10 p-4 rounded-lg w-full">
                    <QRCodeSVG value={SOLANA_ADDRESS} size={200} className="mx-auto" />
                  </div>
                  <div className="w-full space-y-2">
                    <p className="text-sm font-mono bg-black/10 p-3 rounded break-all">{SOLANA_ADDRESS}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span>Amount to send:</span>
                      <span className="font-mono">{totalAmount.toFixed(3)} SOL</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Time remaining:</span>
                      <span className="font-mono">{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                </div>
                {!transactionChecked ? (
                  <Button onClick={handleDeposit} className="w-full cyber-button">
                    I've Sent the SOL
                  </Button>
                ) : (
                  <>
                    <div className="text-center text-sm space-y-2">
                      <p className="text-muted-foreground">
                        Verifying your transaction...
                      </p>
                      <Button onClick={handleManualClose} className="w-full cyber-button">
                        Close
                      </Button>
                    </div>
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