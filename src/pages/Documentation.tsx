import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthOverlay } from "@/components/AuthOverlay";
import { DocumentationSidebar } from "@/components/documentation/DocumentationSidebar";
import { DocumentationContent } from "@/components/documentation/DocumentationContent";
import { TrustFooter } from "@/components/documentation/TrustFooter";

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
          <DocumentationSidebar />
          <DocumentationContent />
        </div>
      </div>
      
      <TrustFooter />
      
      <AuthOverlay 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        defaultView="sign_up"
      />
    </div>
  );
};

export default Documentation;