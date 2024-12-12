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
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Index: Checking for existing workspaces...')
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
      
      return data || []
    },
    enabled: !!session?.user?.id
  })

  useEffect(() => {
    if (isLoading) return

    if (session?.user) {
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
  }, [session, workspaces, isLoading, navigate])

  // Show landing page content for non-authenticated users
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default Index