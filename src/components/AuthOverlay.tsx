import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "sign_in" | "sign_up";
}

export function AuthOverlay({ isOpen, onClose, defaultView = "sign_up" }: AuthOverlayProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome aboard! 🚀",
          description: "Your account has been created successfully.",
        });
        navigate('/app');
        onClose();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, onClose, toast]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg border border-white/10 bg-black/90 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Your Account</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Auth
          supabaseClient={supabase}
          view={defaultView}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#6EE7B7',
                  brandAccent: '#10B981',
                  inputBackground: 'white',
                  inputText: 'black',
                  inputPlaceholder: 'gray',
                }
              }
            }
          }}
          providers={[]}
          onlyThirdPartyProviders={false}
          redirectTo="/app"
        />
      </div>
    </div>
  );
}