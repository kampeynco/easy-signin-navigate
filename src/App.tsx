import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { AuthCallback } from "./components/auth/AuthCallback"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import { PublicRoute } from "./routes/PublicRoute"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { supabase } from "@/integrations/supabase/client"
import { OTPVerification } from "./components/auth/OTPVerification"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Onboarding from "./pages/Onboarding"
import Features from "./pages/Features"
import Pricing from "./pages/Pricing"
import Documentation from "./pages/Documentation"

const queryClient = new QueryClient()

const App = () => {
  console.log('App: Initializing...')
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth callback route - must be before other routes */}
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Public routes */}
              <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
              <Route path="/features" element={<PublicRoute><Features /></PublicRoute>} />
              <Route path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />
              <Route path="/docs" element={<PublicRoute><Documentation /></PublicRoute>} />
              <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/verify-email" element={<OTPVerification />} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

              {/* Protected routes */}
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="flex min-h-screen w-full">
                        <DashboardSidebar />
                        <Dashboard />
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}

export default App