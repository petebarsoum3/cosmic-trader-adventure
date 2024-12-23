import { useEffect, useState } from "react";
import { connect } from "nats.ws";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Coin {
  mint: string;
  symbol: string;
  usd_market_cap: number;
  timestamp: number;
}

export function LatestReleaseCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const seenMints = new Set<string>();

  useEffect(() => {
    let isMounted = true;

    const connectToNats = async () => {
      try {
        const nc = await connect({
          servers: ["wss://prod-v2.nats.realtime.pump.fun"],
          user: "subscriber",
          pass: "lW5a9y20NceF6AE9",
        });
        
        if (!isMounted) {
          await nc.close();
          return;
        }

        setIsConnected(true);
        console.log("Connected to NATS for latest coins");

        const sub = nc.subscribe("newCoinCreated.prod");
        
        // Add dummy data if no messages received in 5 seconds
        const timeoutId = setTimeout(() => {
          if (isMounted && coins.length === 0) {
            const dummyCoins = [
              { mint: "dummy1", symbol: "SOL", usd_market_cap: 15000000, timestamp: Date.now() },
              { mint: "dummy2", symbol: "BONK", usd_market_cap: 5000000, timestamp: Date.now() - 1000 },
              { mint: "dummy3", symbol: "MYRO", usd_market_cap: 2000000, timestamp: Date.now() - 2000 },
            ];
            setCoins(dummyCoins);
          }
        }, 5000);

        (async () => {
          for await (const m of sub) {
            if (!isMounted) break;
            
            const msgString = new TextDecoder().decode(m.data);
            try {
              const coinData = JSON.parse(msgString);
              if (!coinData.mint || seenMints.has(coinData.mint)) continue;
              
              seenMints.add(coinData.mint);
              const newCoin = {
                ...coinData,
                timestamp: Date.now(),
              };

              setCoins(prev => [newCoin, ...prev].slice(0, 10)); // Keep only latest 10 coins
            } catch (err) {
              console.error("Invalid coin data:", msgString);
            }
          }
        })();

        return () => {
          clearTimeout(timeoutId);
          nc.close();
        };
      } catch (err) {
        console.error("Error connecting to NATS:", err);
        setIsConnected(false);
      }
    };

    connectToNats();
    return () => { isMounted = false; };
  }, []);

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cyber-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cyber-primary">Latest Release Coins</h3>
        <Badge variant={isConnected ? "secondary" : "destructive"}>
          {isConnected ? "Live" : "Disconnected"}
        </Badge>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {coins.map((coin) => (
                <motion.tr
                  key={coin.mint}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="border-b border-white/10"
                >
                  <TableCell className="font-medium">{coin.symbol}</TableCell>
                  <TableCell>{formatMarketCap(coin.usd_market_cap)}</TableCell>
                  <TableCell className="text-right text-sm text-gray-400">
                    {new Date(coin.timestamp).toLocaleTimeString()}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}