import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import Navigation from "./components/Navigation"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import { DashboardSidebar } from "./components/DashboardSidebar"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
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

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <DashboardSidebar />
                  <Dashboard />
                </div>
              </SidebarProvider>
            }
          />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App