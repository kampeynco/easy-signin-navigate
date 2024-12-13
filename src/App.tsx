import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { WorkspaceProvider } from "@/contexts/WorkspaceContext"
import { AuthCallback } from "./components/auth/AuthCallback"
import { OTPVerification } from "./components/auth/OTPVerification"
import { supabase } from "@/integrations/supabase/client"
import { publicRoutes } from "./routes/publicRoutes"
import { protectedRoutes } from "./routes/protectedRoutes"

const queryClient = new QueryClient()

const App = () => {
  console.log('App: Initializing...')
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <WorkspaceProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                {/* Auth callback route - must be before other routes */}
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/verify-email" element={<OTPVerification />} />
                
                {/* Public routes */}
                {publicRoutes}

                {/* Protected routes */}
                {protectedRoutes}

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </WorkspaceProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}

export default App