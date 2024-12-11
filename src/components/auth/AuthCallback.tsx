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

        if (session) {
          console.log('AuthCallback: Session found, checking workspaces...')
          
          const { data: workspaces, error: workspacesError } = await supabase
            .from('workspaces')
            .select('id')
            .limit(1)
          
          if (workspacesError) {
            console.error('AuthCallback: Workspaces error:', workspacesError)
            throw workspacesError
          }

          if (!workspaces?.length) {
            console.log('AuthCallback: No workspaces found, redirecting to onboarding...')
            toast({
              title: "Welcome!",
              description: "Let's set up your workspace."
            })
            navigate('/onboarding', { replace: true })
          } else {
            console.log('AuthCallback: Existing user, redirecting to dashboard...')
            toast({
              title: "Welcome back!",
              description: "You have been successfully signed in."
            })
            navigate('/dashboard', { replace: true })
          }
        } else {
          console.log('AuthCallback: No session found, redirecting to signin')
          throw new Error("No session found")
        }
      } catch (error: any) {
        console.error('AuthCallback: Unexpected error:', error)
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "An unexpected error occurred"
        })
        navigate('/signin', { replace: true })
      }
    }

    handleAuthCallback()
  }, [navigate, toast])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-medium">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}