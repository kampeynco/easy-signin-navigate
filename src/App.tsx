import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import Navigation from "./components/Navigation"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { supabase } from "@/integrations/supabase/client"

const queryClient = new QueryClient()

// Auth callback handler component
const AuthCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Auth callback component mounted");
        console.log("Current URL:", window.location.href);
        
        // Get the current URL and parse it
        const url = new URL(window.location.href);
        console.log("Parsed URL:", url);
        
        // Check for error in URL parameters
        const error = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');
        
        if (error) {
          console.error("Auth error:", error, errorDescription);
          window.location.href = '/signin';
          return;
        }
        
        // Check for access token in hash or query parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token') || url.searchParams.get('access_token');
        console.log("Access token present:", !!accessToken);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Session check result:", { session: !!session, error: sessionError });
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          window.location.href = '/signin';
          return;
        }
        
        if (session) {
          console.log("Valid session found, redirecting to dashboard");
          window.location.href = '/dashboard';
        } else {
          console.log("No session found, redirecting to signin");
          window.location.href = '/signin';
        }
      } catch (error) {
        console.error("Unexpected error in callback:", error);
        window.location.href = '/signin';
      }
    };

    handleCallback();
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth callback route */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Auth and public routes */}
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <main className="min-h-screen">
                    <Index />
                  </main>
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Navigation />
                  <main className="min-h-screen">
                    <SignIn />
                  </main>
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Navigation />
                  <main className="min-h-screen">
                    <SignUp />
                  </main>
                </>
              }
            />
            <Route
              path="/reset-password"
              element={
                <>
                  <Navigation />
                  <main className="min-h-screen">
                    <ResetPassword />
                  </main>
                </>
              }
            />

            {/* Protected Dashboard route */}
            <Route
              path="/dashboard"
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
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default App;