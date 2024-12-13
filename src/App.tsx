import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { WorkspaceProvider } from "@/contexts/WorkspaceContext"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { PublicRoute } from "@/components/auth/PublicRoute"

// Pages
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import WorkspaceSettings from "./pages/WorkspaceSettings"
import AcceptInvitation from "./pages/AcceptInvitation"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/signin",
    element: <PublicRoute><SignIn /></PublicRoute>
  },
  {
    path: "/signup",
    element: <PublicRoute><SignUp /></PublicRoute>
  },
  {
    path: "/workspace-settings",
    element: <ProtectedRoute><WorkspaceSettings /></ProtectedRoute>
  },
  {
    path: "/accept-invitation",
    element: <PublicRoute><AcceptInvitation /></PublicRoute>
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WorkspaceProvider>
          <RouterProvider router={router} />
          <Toaster />
        </WorkspaceProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App