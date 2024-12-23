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
    const fraudBots = Array(5).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw manipulation pattern
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      
      const amplitude = 50;
      const frequency = 0.02;
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height/2 + 
          Math.sin(x * frequency + frame * 0.02) * amplitude +
          Math.sin(x * frequency * 2 + frame * 0.03) * amplitude/2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Animate bots
      fraudBots.forEach(bot => {
        bot.x += bot.dx;
        bot.y += bot.dy;

        if (bot.x < 0 || bot.x > canvas.width) bot.dx *= -1;
        if (bot.y < 0 || bot.y > canvas.height) bot.dy *= -1;

        ctx.beginPath();
        ctx.fillStyle = '#ef4444';
        ctx.arc(bot.x, bot.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw protection shield
      ctx.beginPath();
      ctx.strokeStyle = '#6EE7B7';
      ctx.lineWidth = 3;
      ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx.stroke();

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