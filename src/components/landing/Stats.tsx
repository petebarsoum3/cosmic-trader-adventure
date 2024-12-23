import { Shield, Zap, Target, AlertTriangle } from "lucide-react";

export const Stats = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="cyber-card">
          <h3 className="text-3xl font-bold text-cyber-primary">15,482</h3>
          <p className="text-sm text-gray-400">Scams Prevented</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-3xl font-bold text-cyber-secondary">892,341</h3>
          <p className="text-sm text-gray-400">Protected Value</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-3xl font-bold text-cyber-accent">3,219</h3>
          <p className="text-sm text-gray-400">Active Users</p>
        </div>
        <div className="cyber-card">
          <h3 className="text-3xl font-bold text-cyber-primary">99%</h3>
          <p className="text-sm text-gray-400">Success Rate</p>
        </div>
      </div>
    </section>
  );
};