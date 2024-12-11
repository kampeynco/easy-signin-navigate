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
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('AuthCallback: Session error:', sessionError)
          throw sessionError
        }

        if (!session?.user) {
          console.log('AuthCallback: No valid session, redirecting to signin')
          throw new Error("No valid session found")
        }

        console.log('AuthCallback: User authenticated:', session.user.email)
        
        // Check for existing workspaces with proper error handling
        const { data: workspaces, error: workspacesError } = await supabase
          .from('workspaces')
          .select(`
            id,
            workspace_members!inner (
              role
            )
          `)
          .eq('workspace_members.user_id', session.user.id)
          .limit(1)
        
        if (workspacesError) {
          console.error('AuthCallback: Workspace query error:', workspacesError)
          throw workspacesError
        }

        if (!workspaces?.length) {
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
        console.error('AuthCallback: Error:', error.message)
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Please try signing in again"
        })
        navigate('/signin', { replace: true })
      }
    }

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('AuthCallback: Timeout reached, redirecting to signin')
      toast({
        variant: "destructive",
        title: "Authentication Timeout",
        description: "Please try signing in again"
      })
      navigate('/signin', { replace: true })
    }, 10000) // 10 second timeout

    handleAuthCallback()

    return () => clearTimeout(timeoutId)
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