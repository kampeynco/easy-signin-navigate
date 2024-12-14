import { Route } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import Index from "@/pages/Index"
import Features from "@/pages/Features"
import Pricing from "@/pages/Pricing"
import Documentation from "@/pages/Documentation"
import SignIn from "@/pages/SignIn"
import SignUp from "@/pages/SignUp"
import ResetPassword from "@/pages/ResetPassword"
import AcceptInvitation from "@/pages/AcceptInvitation"

export const publicRoutes = [
  <Route key="/" path="/" element={<PublicRoute><Index /></PublicRoute>} />,
  <Route key="/features" path="/features" element={<PublicRoute><Features /></PublicRoute>} />,
  <Route key="/pricing" path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />,
  <Route key="/docs" path="/docs" element={<PublicRoute><Documentation /></PublicRoute>} />,
  <Route key="/signin" path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />,
  <Route key="/signup" path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />,
  <Route key="/reset-password" path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />,
  <Route key="/accept-invitation" path="/accept-invitation" element={<AcceptInvitation />} />,
]