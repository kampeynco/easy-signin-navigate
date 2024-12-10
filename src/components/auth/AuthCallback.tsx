import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/signin')
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard')
      } else if (!session) {
        navigate('/signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return null
}