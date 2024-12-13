import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

interface DashboardHeaderProps {
  userName: string
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return data
    }
  })

  const displayName = profile?.first_name || userName

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-tight">
        Good Afternoon, {displayName}!
      </h1>
      <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54] text-white text-sm h-9">
        <Link to="/create-workflow">Create Workflow</Link>
      </Button>
    </div>
  )
}