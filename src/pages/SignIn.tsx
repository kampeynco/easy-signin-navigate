import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { AuthOptions } from "@/components/auth/AuthOptions"
import { EmailSignInForm } from "@/components/auth/EmailSignInForm"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const SignIn = () => {
  const session = useSession()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleEmailClick = () => {
    setShowEmailForm(true)
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check for pending invitation
      const pendingInvitationToken = localStorage.getItem('pendingInvitationToken')
      if (pendingInvitationToken) {
        localStorage.removeItem('pendingInvitationToken')
        navigate(`/accept-invitation?token=${pendingInvitationToken}`)
        return
      }
      
      navigate('/dashboard')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
      })
    }
  }

  if (session?.user) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          
          {showEmailForm ? (
            <EmailSignInForm onSubmit={handleSignIn} />
          ) : (
            <AuthOptions onEmailClick={handleEmailClick} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn