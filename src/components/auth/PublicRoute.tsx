import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('PublicRoute: Checking session state:', session ? 'Authenticated' : 'Not authenticated')
    
    if (session?.user) {
      console.log('PublicRoute: User is authenticated, redirecting to dashboard')
      navigate('/')
    }
  }, [session, navigate])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  )
}