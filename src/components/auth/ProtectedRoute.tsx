import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    console.log('ProtectedRoute: Checking session...')
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('ProtectedRoute: Session status:', session ? 'Found' : 'Not found')
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('ProtectedRoute: Auth state changed:', _event)
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return null // or a loading spinner
  }

  if (!session) {
    console.log('ProtectedRoute: No session, redirecting to signin')
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  console.log('ProtectedRoute: Session valid, rendering protected content')
  return <>{children}</>
}