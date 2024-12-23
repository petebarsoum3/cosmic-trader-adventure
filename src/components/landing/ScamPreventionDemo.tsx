import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, TrendingUp, TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";

export const ScamPreventionDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
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

    // Trading activity simulation
    const trades = Array(15).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      age: Math.random() * 100,
      type: Math.random() > 0.5 ? 'buy' : 'sell'
    }));

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw price manipulation pattern
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      
      // Create more dramatic price movements
      const baseY = canvas.height/2;
      const amplitude = 70;
      const frequency = 0.02;
      
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      
      for (let x = 0; x < canvas.width; x++) {
        // Normal trading pattern
        const normalY = baseY + 
          Math.sin(x * frequency + frame * 0.02) * amplitude;
        
        // Add sudden dumps and pumps
        const manipulationY = normalY + 
          (Math.sin(frame * 0.1) * 50) * Math.exp(-Math.pow(x - canvas.width/2, 2) / 10000);
        
        // Add high-frequency trading noise
        const noiseY = manipulationY + 
          (Math.random() - 0.5) * 10;
        
        ctx.lineTo(x, noiseY);
      }
      ctx.stroke();

      // Animate trading activity
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

      // Animate bots with varying sizes and speeds
      fraudBots.forEach(bot => {
        bot.x += bot.dx;
        bot.y += bot.dy;

        // Bounce off walls
        if (bot.x < 0 || bot.x > canvas.width) bot.dx *= -1;
        if (bot.y < 0 || bot.y > canvas.height) bot.dy *= -1;

        // Draw bot with trail effect
        ctx.beginPath();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.arc(bot.x, bot.y, bot.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby bots with lines to show coordination
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

      // Draw protection shield with pulse effect
      const shieldRadius = 100 + Math.sin(frame * 0.05) * 5;
      ctx.beginPath();
      ctx.strokeStyle = '#6EE7B7';
      ctx.lineWidth = 3;
      ctx.arc(canvas.width/2, canvas.height/2, shieldRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Add shield glow effect
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
    <section className="container mx-auto px-4 py-20 relative overflow-hidden">
      <div className="cyber-card">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
                How We Protect Your Investment
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Scam tokens use volume bots and fake transactions to create artificial price movements
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Bot className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    These bots manipulate charts to trick investors into thinking the token is more valuable
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-cyber-primary mt-1 flex-shrink-0" />
                  <p className="text-gray-300">
                    Our quant bot analyzes transaction patterns to detect and counter manipulation attempts
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="relative h-[400px]">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full rounded-lg bg-cyber-background/50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-cyber-background/80 p-4 rounded-lg backdrop-blur-sm border border-cyber-primary/20"
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 font-mono">Scam Detected</span>
                  <TrendingUp className="w-5 h-5 text-cyber-primary" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};