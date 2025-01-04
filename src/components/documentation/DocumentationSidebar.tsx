import { ScrollArea } from "@/components/ui/scroll-area";

export const DocumentationSidebar = () => {
  return (
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
  );
};
