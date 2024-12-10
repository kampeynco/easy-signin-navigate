import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Navigation from "./components/Navigation"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { supabase } from "@/integrations/supabase/client"
import { useEffect, useState } from "react"

const queryClient = new QueryClient()

// Simplified AuthCallback component that handles the OAuth redirect
const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/signin')
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard')
      } else if (!session) {
        navigate('/signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return null
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return null // Or a loading spinner
  }

  if (!session) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth callback route */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Public routes */}
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
)

export default App