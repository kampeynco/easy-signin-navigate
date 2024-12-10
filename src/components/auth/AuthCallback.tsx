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
        
        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search)
        const error = params.get('error')
        const errorDescription = params.get('error_description')
        
        if (error) {
          console.error('Auth callback error:', error, errorDescription)
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: errorDescription || "An error occurred during authentication"
          })
          navigate('/signin')
          return
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session retrieval error:', sessionError)
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Failed to retrieve session"
          })
          navigate('/signin')
          return
        }

        if (session) {
          console.log('Session found, redirecting to dashboard')
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in."
          })
          navigate('/dashboard')
        } else {
          console.log('No session found, redirecting to signin')
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "No session found"
          })
          navigate('/signin')
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred"
        })
        navigate('/signin')
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