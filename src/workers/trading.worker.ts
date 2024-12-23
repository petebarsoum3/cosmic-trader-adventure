let isRunning = false;
let tradeInterval: ReturnType<typeof setInterval> | null = null;

const generateRandomTrade = () => {
  const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const pnl = (Math.random() * 200 - 100).toFixed(2);
  
  return {
    id: crypto.randomUUID(),
    symbol,
    pnl: Number(pnl),
    timestamp: new Date().toISOString(),
  };
};

self.onmessage = (e) => {
  const { type } = e.data;
  
  switch (type) {
    case 'START':
      if (!isRunning) {
        isRunning = true;
        tradeInterval = setInterval(() => {
          if (isRunning) {
            const trade = generateRandomTrade();
            self.postMessage({ type: 'NEW_TRADE', trade });
          }
        }, 5000);
      }
      break;
      
    case 'STOP':
      isRunning = false;
      if (tradeInterval) {
        clearInterval(tradeInterval);
        tradeInterval = null;
      }
      break;
  }
};

export {};