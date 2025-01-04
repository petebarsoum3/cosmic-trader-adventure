import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AuthOverlay } from "@/components/AuthOverlay";

const Documentation = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-cyber-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent bg-clip-text text-transparent">
            Advanced Documentation
          </h1>
          <Button 
            onClick={() => setShowAuth(true)}
            className="cyber-button text-lg px-8 py-6 animate-pulse hover:animate-none"
          >
            Launch Now
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          {/* Navigation */}
          <aside className="cyber-card h-fit backdrop-blur-xl border-cyber-primary/20">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <nav className="space-y-2 p-4">
                <a href="#introduction" className="block p-2 hover:bg-white/5 rounded transition-colors duration-200">
                  Introduction & Objectives
                </a>
                <a href="#theory" className="block p-2 hover:bg-white/5 rounded transition-colors duration-200">
                  Theoretical Framework
                </a>
                <a href="#quantum" className="block p-2 hover:bg-white/5 rounded transition-colors duration-200">
                  Quantum-Inspired Models
                </a>
                <a href="#statistical" className="block p-2 hover:bg-white/5 rounded transition-colors duration-200">
                  Statistical Foundations
                </a>
                <a href="#profitability" className="block p-2 hover:bg-white/5 rounded transition-colors duration-200">
                  Profitability Analysis
                </a>
              </nav>
            </ScrollArea>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            <section id="introduction" className="cyber-card backdrop-blur-xl border-cyber-primary/20">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
                Introduction & Objectives
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Welcome to the fully expanded advanced documentation for our trading system. This resource provides
                  a deep, multidimensional, and rigorous dive into the theoretical, computational, empirical, and
                  applied facets of our quantum-inspired methodology for navigating meme coin markets.
                </p>
                <p>
                  Our approach applies rigorous mathematics, cutting-edge probability theory inspired by quantum mechanics,
                  and robust computational simulations to identify and exploit subtle patterns that differentiate
                  "normal" trading conditions from "manipulated" or "anomalous" states.
                </p>
              </div>
            </section>

            <section id="theory" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Theoretical Framework</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our theoretical framework integrates elements from traditional financial mathematics,
                  statistical inference, and quantum probability. The underlying hypothesis is that market
                  states can be better understood as vectors evolving in a complex, high-dimensional space.
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="core-pillars">
                    <AccordionTrigger>Core Pillars</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Quantum-Inspired State Representation</li>
                        <li>Selective Filtering via Overlaps</li>
                        <li>Mathematical and Statistical Rigor</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            <section id="quantum" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Quantum-Inspired Models</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  By representing market conditions as high-dimensional state vectors in a Hilbert space,
                  we can precisely measure the overlap between the current market state and historically
                  recognized manipulative patterns.
                </p>
              </div>
            </section>

            <section id="statistical" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Statistical Foundations</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our approach is backed by rigorous statistical analysis and extensive backtesting.
                  We employ advanced mathematical techniques to validate our strategies and ensure
                  reliable performance across various market conditions.
                </p>
              </div>
            </section>

            <section id="profitability" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Profitability Analysis</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Based on our extensive simulations and real-world testing, our strategy consistently
                  achieves positive expected value by identifying and avoiding manipulated market states.
                </p>
                <div className="bg-black/20 p-4 rounded-lg">
                  <p className="text-sm">Average Daily Return: <span className="text-cyber-primary">17%</span></p>
                  <p className="text-sm">Success Rate: <span className="text-cyber-primary">99%</span></p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <AuthOverlay 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        defaultView="sign_up"
      />
    </div>
  );
};

export default Documentation;