import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import Navigation from "@/components/Navigation"

export const PublicRoute = ({ children }) => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('PublicRoute: Checking session state:', session ? 'Authenticated' : 'Not authenticated')
    
    if (session?.user) {
      console.log('PublicRoute: User is authenticated, redirecting to dashboard')
      navigate('/dashboard')
    }
  }, [session, navigate])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  )
}