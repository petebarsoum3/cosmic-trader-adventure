import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Documentation from "./pages/Documentation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  // Update document title for all routes
  document.title = "SolanaQM - Finally Profit On Meme Coins";
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/app" element={<Index />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;