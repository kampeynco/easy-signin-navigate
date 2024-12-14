import { useNavigate, useSearchParams } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { EmailSignInForm } from "@/components/auth/EmailSignInForm"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

const SignIn = () => {
  const session = useSession()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchParams] = useSearchParams()
  const invitationToken = searchParams.get('invitation')

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check for invitation token in URL params first, then localStorage
      const token = invitationToken || localStorage.getItem('pendingInvitationToken')
      if (token) {
        localStorage.removeItem('pendingInvitationToken')
        navigate(`/accept-invitation?token=${token}`)
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
    // If there's an invitation token, process it
    const token = invitationToken || localStorage.getItem('pendingInvitationToken')
    if (token) {
      localStorage.removeItem('pendingInvitationToken')
      navigate(`/accept-invitation?token=${token}`)
      return null
    }
    
    navigate('/dashboard')
    return null
  }

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EmailSignInForm onSubmit={handleSignIn} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn