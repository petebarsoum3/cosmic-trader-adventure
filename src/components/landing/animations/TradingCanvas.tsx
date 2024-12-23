import { useEffect, useRef } from "react";

interface TradingCanvasProps {
  width?: number;
  height?: number;
}

export const TradingCanvas = ({ width = 800, height = 400 }: TradingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let frame = 0;
    const fraudBots = Array(8).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 3,
      dy: (Math.random() - 0.5) * 3,
      size: Math.random() * 3 + 2
    }));

    const trades = Array(15).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      age: Math.random() * 100,
      type: Math.random() > 0.5 ? 'buy' : 'sell'
    }));

    const drawPriceManipulation = (ctx: CanvasRenderingContext2D, frame: number) => {
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      
      const baseY = canvas.height/2;
      const amplitude = 70;
      const frequency = 0.02;
      
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      
      for (let x = 0; x < canvas.width; x++) {
        const normalY = baseY + Math.sin(x * frequency + frame * 0.02) * amplitude;
        const manipulationY = normalY + (Math.sin(frame * 0.1) * 50) * 
          Math.exp(-Math.pow(x - canvas.width/2, 2) / 10000);
        const noiseY = manipulationY + (Math.random() - 0.5) * 10;
        ctx.lineTo(x, noiseY);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawPriceManipulation(ctx, frame);

      trades.forEach(trade => {
        trade.age += 1;
        if (trade.age > 100) {
          trade.age = 0;
          trade.x = Math.random() * canvas.width;
          trade.y = Math.random() * canvas.height;
          trade.type = Math.random() > 0.5 ? 'buy' : 'sell';
        }

        const alpha = 1 - trade.age / 100;
        ctx.beginPath();
        ctx.fillStyle = trade.type === 'buy' ? 
          `rgba(34, 197, 94, ${alpha})` : 
          `rgba(239, 68, 68, ${alpha})`;
        ctx.arc(trade.x, trade.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      fraudBots.forEach(bot => {
        bot.x += bot.dx;
        bot.y += bot.dy;

        if (bot.x < 0 || bot.x > canvas.width) bot.dx *= -1;
        if (bot.y < 0 || bot.y > canvas.height) bot.dy *= -1;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.arc(bot.x, bot.y, bot.size, 0, Math.PI * 2);
        ctx.fill();

        fraudBots.forEach(otherBot => {
          const distance = Math.hypot(bot.x - otherBot.x, bot.y - otherBot.y);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 * (1 - distance/100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(bot.x, bot.y);
            ctx.lineTo(otherBot.x, otherBot.y);
            ctx.stroke();
          }
        });
      });

      const shieldRadius = 100 + Math.sin(frame * 0.05) * 5;
      ctx.beginPath();
      ctx.strokeStyle = '#6EE7B7';
      ctx.lineWidth = 3;
      ctx.arc(canvas.width/2, canvas.height/2, shieldRadius, 0, Math.PI * 2);
      ctx.stroke();

      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, shieldRadius-20,
        canvas.width/2, canvas.height/2, shieldRadius+20
      );
      gradient.addColorStop(0, 'rgba(110, 231, 183, 0.1)');
      gradient.addColorStop(1, 'rgba(110, 231, 183, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full rounded-lg bg-cyber-background/50"
    />
  );
};