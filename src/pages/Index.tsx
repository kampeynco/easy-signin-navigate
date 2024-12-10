import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"

const Index = () => {
  const navigate = useNavigate()
  const session = useSession()

  // Check if user has any workspaces
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Checking for existing workspaces...')
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          workspace_members!inner (
            role
          )
        `)
        .eq('workspace_members.user_id', session?.user?.id)
      
      if (error) {
        console.error('Error fetching workspaces:', error)
        throw error
      }
      
      return data || []
    },
    enabled: !!session?.user?.id
  })

  useEffect(() => {
    if (isLoading) return

    if (session) {
      // If user is logged in and has no workspaces, redirect to onboarding
      if (workspaces && workspaces.length === 0) {
        console.log('No workspaces found, redirecting to onboarding...')
        navigate('/onboarding')
      } else if (workspaces && workspaces.length > 0) {
        // If user has workspaces, redirect to dashboard
        console.log('Workspaces found, redirecting to dashboard...')
        navigate('/dashboard')
      }
    } else {
      // Show landing page content for non-authenticated users
      console.log('User not authenticated, showing landing page...')
    }
  }, [session, workspaces, isLoading, navigate])

  // Landing page content for non-authenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kampeyn</h1>
        <p className="text-xl text-gray-600">Sign in to get started!</p>
      </div>
    </div>
  )
}

export default Index