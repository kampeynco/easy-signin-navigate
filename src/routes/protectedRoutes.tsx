import { Route } from "react-router-dom"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import Workflows from "@/pages/Workflows"
import WorkspaceSettings from "@/pages/WorkspaceSettings"
import ProfileSettings from "@/pages/ProfileSettings"
import Onboarding from "@/pages/Onboarding"

export const protectedRoutes = [
  <Route 
    key="/onboarding"
    path="/onboarding" 
    element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    } 
  />,
  <Route
    key="/dashboard/*"
    path="/dashboard/*"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="/workflows"
    path="/workflows"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Workflows />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="/workspace/settings"
    path="/workspace/settings"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <WorkspaceSettings />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
  <Route
    key="/profile/settings"
    path="/profile/settings"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <ProfileSettings />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />,
]