import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-cyber-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
          Trading Bot Documentation
        </h1>

        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          {/* Navigation */}
          <aside className="cyber-card h-fit">
            <nav className="space-y-2">
              <a href="#getting-started" className="block p-2 hover:bg-white/5 rounded">
                Getting Started
              </a>
              <a href="#how-it-works" className="block p-2 hover:bg-white/5 rounded">
                How It Works
              </a>
              <a href="#faq" className="block p-2 hover:bg-white/5 rounded">
                FAQ
              </a>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            <section id="getting-started" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
              <div className="space-y-4">
                <p>
                  Our trading bot is designed to help you maximize your trading potential
                  through automated strategies and risk management.
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Create an account and verify your identity</li>
                  <li>Deposit funds into your trading wallet</li>
                  <li>Set your trading preferences and risk tolerance</li>
                  <li>Start the bot and monitor your trades</li>
                </ol>
              </div>
            </section>

            <section id="how-it-works" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4">
                <p>
                  Our bot uses advanced algorithms to analyze market conditions and execute
                  trades based on proven strategies:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Real-time market analysis</li>
                  <li>Technical indicator monitoring</li>
                  <li>Automated trade execution</li>
                  <li>Risk management protocols</li>
                </ul>
              </div>
            </section>

            <section id="faq" className="cyber-card">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How safe is my investment?</AccordionTrigger>
                  <AccordionContent>
                    Our bot implements strict risk management protocols and stop-loss
                    mechanisms to protect your investment. However, all trading carries
                    inherent risks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the minimum requirements?</AccordionTrigger>
                  <AccordionContent>
                    You need to have a verified account and meet the minimum deposit
                    requirements to start trading with our bot.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I customize trading strategies?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can adjust various parameters including risk levels,
                    trading pairs, and allocation amounts to match your trading style.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;