import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { AuthOptions } from "@/components/auth/AuthOptions"
import Navigation from "@/components/Navigation"

const SignIn = () => {
  const session = useSession()
  const navigate = useNavigate()

  const handleEmailClick = () => {
    // We'll implement email sign-in in a future update
    console.log("Email sign-in clicked")
  }

  useEffect(() => {
    if (session?.user) {
      // Check for pending invitation
      const pendingInvitationToken = localStorage.getItem('pendingInvitationToken')
      if (pendingInvitationToken) {
        localStorage.removeItem('pendingInvitationToken')
        navigate(`/accept-invitation?token=${pendingInvitationToken}`)
        return
      }
      navigate('/dashboard')
    }
  }, [session, navigate])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <AuthOptions onEmailClick={handleEmailClick} />
        </div>
      </div>
    </div>
  )
}

export default SignIn