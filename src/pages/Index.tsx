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

  // Simplified workspace query
  const { data: workspaces, isLoading, error } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Index: Starting workspace query for user:', session?.user?.id)
      
      // First, check if user exists in profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session?.user?.id)
        .single()

      if (profileError) {
        console.error('Index: Profile fetch error:', profileError)
        throw profileError
      }

      console.log('Index: Profile found:', profile)

      // Then get workspaces with a simpler query
      const { data, error } = await supabase
        .from('workspaces')
        .select('id')
        .eq('workspace_members.user_id', session?.user?.id)

      if (error) {
        console.error('Index: Workspace fetch error:', error)
        throw error
      }

      console.log('Index: Workspaces fetched:', data)
      return data || []
    },
    enabled: !!session?.user?.id,
    retry: false // Disable retries to prevent potential loops
  })

  useEffect(() => {
    console.log('Index: Effect running with:', {
      session: !!session,
      isLoading,
      workspacesCount: workspaces?.length,
      error: error?.message
    })

    if (isLoading) return

    if (session) {
      if (error) {
        console.error('Index: Navigation error:', error)
        // On error, default to onboarding
        navigate('/onboarding')
        return
      }

      if (!workspaces || workspaces.length === 0) {
        console.log('Index: No workspaces, redirecting to onboarding')
        navigate('/onboarding')
      } else {
        console.log('Index: Workspaces found, redirecting to dashboard')
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