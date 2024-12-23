import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-cyber-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              Advanced Trading Bot
            </h1>
            <p className="text-xl text-gray-300">
              Experience automated trading with our cutting-edge AI technology. 
              Maximize your profits while minimizing risks.
            </p>
            <div className="space-x-4">
              <Button asChild className="cyber-button">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/documentation">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Trading Dashboard"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4">AI-Powered Trading</h3>
            <p className="text-gray-300">
              Our advanced algorithms analyze market trends and execute trades automatically.
            </p>
          </div>
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4">Risk Management</h3>
            <p className="text-gray-300">
              Built-in safeguards and stop-loss mechanisms protect your investments.
            </p>
          </div>
          <div className="cyber-card">
            <h3 className="text-xl font-bold mb-4">24/7 Operation</h3>
            <p className="text-gray-300">
              Never miss a trading opportunity with round-the-clock automated trading.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;