import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { WorkspaceProvider } from "@/contexts/WorkspaceContext"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { supabase } from "@/integrations/supabase/client"
import { ReactNode } from "react"

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <WorkspaceProvider>
          <TooltipProvider>
            <BrowserRouter>
              {children}
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </WorkspaceProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}