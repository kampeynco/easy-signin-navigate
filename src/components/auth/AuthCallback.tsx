import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

// Updated interface to correctly extend Error
interface AuthError extends Error {
  status?: number;
}

export const AuthCallback = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const timeoutId = setTimeout(() => {
        console.error('AuthCallback: Timeout - auth callback took too long')
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "The authentication process timed out. Please try again."
        })
        navigate('/signin', { replace: true })
      }, 10000) // 10 second timeout

      try {
        console.log('AuthCallback: Starting auth callback handling...')
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('AuthCallback: Session error:', sessionError)
          if (sessionError.name === 'AuthApiError') {
            throw new Error('Authentication failed. Please try again.')
          }
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
      } catch (error: unknown) {
        console.error('AuthCallback: Error:', error)
        const errorMessage = error instanceof Error ? error.message : 'An unexpected authentication error occurred'
        
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: errorMessage
        })
        navigate('/signin', { replace: true })
      } finally {
        clearTimeout(timeoutId)
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