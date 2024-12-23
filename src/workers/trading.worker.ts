const TRADE_INTERVAL = 5000; // 5 seconds
const SYMBOLS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT'];
let isRunning = false;
let tradeTimeout: number;

function generateTrade() {
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const side = Math.random() > 0.5 ? 'long' : 'short';
  const entryPrice = Math.random() * 1000;
  const leverage = Math.floor(Math.random() * 20) + 1;
  const size = Math.random() * 100;
  const pnl = (Math.random() * 20) - 10;

  return {
    id: Math.random().toString(36).substring(7),
    symbol,
    side,
    entryPrice,
    leverage,
    size,
    pnl,
    timestamp: Date.now(),
  };
}

function startTrading() {
  isRunning = true;
  executeTrade();
}

function stopTrading() {
  isRunning = false;
  clearTimeout(tradeTimeout);
}

function executeTrade() {
  if (!isRunning) return;

  const trade = generateTrade();
  self.postMessage({ type: 'NEW_TRADE', trade });

  tradeTimeout = setTimeout(executeTrade, TRADE_INTERVAL);
}

self.onmessage = (e) => {
  const { type } = e.data;
  
  switch (type) {
    case 'START':
      startTrading();
      break;
    case 'STOP':
      stopTrading();
      break;
    default:
      break;
  }
};