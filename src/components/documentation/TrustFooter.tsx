import { Shield, Award, Users, Lock } from "lucide-react";

export const TrustFooter = () => {
  return (
    <footer className="bg-cyber-background/50 backdrop-blur-xl border-t border-cyber-primary/20 py-16 mt-20">
      <div className="container mx-auto px-4">
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-center text-center space-y-2">
            <Shield className="w-12 h-12 text-cyber-primary mb-2" />
            <h3 className="text-xl font-semibold text-cyber-primary">100% Secure</h3>
            <p className="text-gray-400">Military-grade encryption for all transactions</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Award className="w-12 h-12 text-cyber-secondary mb-2" />
            <h3 className="text-xl font-semibold text-cyber-secondary">Certified</h3>
            <p className="text-gray-400">Audited by leading security firms</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Users className="w-12 h-12 text-cyber-accent mb-2" />
            <h3 className="text-xl font-semibold text-cyber-accent">50K+ Users</h3>
            <p className="text-gray-400">Trusted by thousands globally</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2">
            <Lock className="w-12 h-12 text-cyber-primary mb-2" />
            <h3 className="text-xl font-semibold text-cyber-primary">$0 Lost</h3>
            <p className="text-gray-400">Perfect security track record</p>
          </div>
        </div>

        {/* Partners and Certifications */}
        <div className="border-t border-cyber-primary/20 pt-12">
          <h4 className="text-center text-lg text-gray-400 mb-8">Trusted By Industry Leaders</h4>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyber-primary/20" />
              <span className="text-gray-400">Solana</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyber-secondary/20" />
              <span className="text-gray-400">Certik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyber-accent/20" />
              <span className="text-gray-400">Hacken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyber-primary/20" />
              <span className="text-gray-400">OpenZeppelin</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};