import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export const AuthCallback = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Starting auth callback handling...')
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('AuthCallback: Session error:', sessionError)
          throw sessionError
        }

        if (!session?.user) {
          console.log('AuthCallback: No valid session, redirecting to signin')
          throw new Error("No valid session found")
        }

        console.log('AuthCallback: Session found for user:', session.user.id)

        // Check if email is confirmed
        if (!session.user.email_confirmed_at) {
          console.log('AuthCallback: Email not confirmed, redirecting to verification')
          navigate('/verify-email', { 
            state: { email: session.user.email },
            replace: true 
          })
          return
        }

        // Check for existing workspaces with detailed logging
        console.log('AuthCallback: Checking for existing workspaces...')
        const { data: workspaces, error: workspacesError } = await supabase
          .from('workspaces')
          .select(`
            id,
            workspace_members!inner (
              user_id,
              role
            )
          `)
          .eq('workspace_members.user_id', session.user.id)

        if (workspacesError) {
          console.error('AuthCallback: Workspace query error:', workspacesError)
          throw workspacesError
        }

        console.log('AuthCallback: Workspaces query result:', workspaces)

        // If no workspace exists, redirect to onboarding
        if (!workspaces || workspaces.length === 0) {
          console.log('AuthCallback: No workspaces found, redirecting to onboarding...')
          toast({
            title: "Welcome!",
            description: "Let's set up your first workspace.",
          })
          navigate('/onboarding', { replace: true })
        } else {
          console.log('AuthCallback: Existing workspaces found, redirecting to dashboard...')
          toast({
            title: "Welcome back!",
            description: "You're all set.",
          })
          navigate('/dashboard', { replace: true })
        }
        
      } catch (error: any) {
        console.error('AuthCallback: Error:', error)
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Please try signing in again"
        })
        navigate('/signin', { replace: true })
      }
    }

    handleAuthCallback()
  }, [navigate, toast])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-medium">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}