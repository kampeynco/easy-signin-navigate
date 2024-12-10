import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/signin')
          return
        }

        if (session) {
          console.log('Session found, redirecting to dashboard')
          navigate('/dashboard')
        } else {
          console.log('No session found, redirecting to signin')
          navigate('/signin')
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        navigate('/signin')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return null
}