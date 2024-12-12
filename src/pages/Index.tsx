import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturesSection } from "@/components/home/FeaturesSection"

const Index = () => {
  const navigate = useNavigate()
  const session = useSession()

  // Check if user has any workspaces
  const { data: workspaces, isLoading, error } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Index: Checking for existing workspaces for user:', session?.user?.id)
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
        console.error('Index: Error fetching workspaces:', error)
        throw error
      }
      
      console.log('Index: Fetched workspaces:', data)
      return data || []
    },
    enabled: !!session?.user?.id
  })

  useEffect(() => {
    console.log('Index: Session status:', session ? 'Authenticated' : 'Not authenticated')
    console.log('Index: Loading status:', isLoading)
    console.log('Index: Workspaces:', workspaces)
    console.log('Index: Error:', error)

    if (isLoading) return

    if (session) {
      // If user is logged in and has no workspaces, redirect to onboarding
      if (workspaces && workspaces.length === 0) {
        console.log('Index: No workspaces found, redirecting to onboarding...')
        navigate('/onboarding')
      } else if (workspaces && workspaces.length > 0) {
        // If user has workspaces, redirect to dashboard
        console.log('Index: Workspaces found, redirecting to dashboard...')
        navigate('/dashboard')
      }
    }
  }, [session, workspaces, isLoading, navigate, error])

  // Landing page content for non-authenticated users
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default Index