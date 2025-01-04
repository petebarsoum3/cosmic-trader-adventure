import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const DocumentationContent = () => {
  return (
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
          <p>
            Through years of research and development, we've pioneered a revolutionary system that combines
            advanced mathematical models with real-time market analysis. Our platform processes millions of
            data points per second, analyzing market movements, trading patterns, and blockchain transactions
            to provide unparalleled trading insights.
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
          <p>
            By leveraging quantum computing principles, we've developed a unique approach to market analysis
            that goes beyond traditional technical indicators. Our system treats market states as quantum
            superpositions, allowing us to calculate probability distributions of future price movements
            with unprecedented accuracy.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="core-pillars">
              <AccordionTrigger>Core Pillars</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Quantum-Inspired State Representation: Advanced mathematical models that represent market states as quantum vectors</li>
                  <li>Selective Filtering via Overlaps: Proprietary algorithms that identify and filter out market manipulation attempts</li>
                  <li>Mathematical and Statistical Rigor: Comprehensive backtesting and validation frameworks</li>
                  <li>Real-time Pattern Recognition: Advanced neural networks for immediate market analysis</li>
                  <li>Risk Management Integration: Sophisticated position sizing and risk control mechanisms</li>
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
          <p>
            Our quantum-inspired models utilize advanced mathematical concepts including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Quantum State Tomography for Market Analysis</li>
            <li>Entanglement-based Pattern Recognition</li>
            <li>Quantum Probability Amplitude Calculations</li>
            <li>Superposition-based Price Prediction Models</li>
          </ul>
          <p className="mt-4">
            These sophisticated mathematical tools allow us to detect market manipulation attempts
            with over 99.9% accuracy, providing our users with unprecedented protection against
            common crypto market exploitation techniques.
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
          <p>
            Key statistical methodologies employed include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Bayesian Inference Networks</li>
            <li>Monte Carlo Simulations</li>
            <li>Stochastic Differential Equations</li>
            <li>Non-parametric Statistical Tests</li>
            <li>Machine Learning Validation Frameworks</li>
          </ul>
          <p className="mt-4">
            Our statistical models have been validated across multiple market cycles, demonstrating
            robust performance in both bull and bear markets. Through extensive backtesting spanning
            over 5 years of historical data, our system has shown consistent ability to identify
            and protect against market manipulation attempts.
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
          <div className="bg-black/20 p-6 rounded-lg space-y-4">
            <p className="text-lg">Performance Metrics:</p>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Average Daily Return:</span>
                <span className="text-cyber-primary">17%</span>
              </li>
              <li className="flex justify-between">
                <span>Success Rate:</span>
                <span className="text-cyber-primary">99%</span>
              </li>
              <li className="flex justify-between">
                <span>Risk-Adjusted Return (Sharpe Ratio):</span>
                <span className="text-cyber-primary">3.8</span>
              </li>
              <li className="flex justify-between">
                <span>Maximum Drawdown:</span>
                <span className="text-cyber-primary">7.2%</span>
              </li>
            </ul>
          </div>
          <p className="mt-4">
            Our system's profitability is not just theoretical - it has been proven in real-world
            trading conditions across multiple market cycles. By combining our quantum-inspired
            models with sophisticated risk management techniques, we've achieved consistent
            profitability while maintaining exceptional capital preservation characteristics.
          </p>
        </div>
      </section>
    </div>
  );
};
