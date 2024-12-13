import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { StatCard } from "@/components/dashboard/StatCard"
import { useSession } from "@supabase/auth-helpers-react"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

const Dashboard = () => {
  const session = useSession()
  const { selectedWorkspace } = useWorkspace()
  const userName = session?.user?.email?.split('@')[0] || 'User'

  // Fetch workflows for the selected workspace
  const { data: workflows } = useQuery({
    queryKey: ['workflows', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('workspace_id', selectedWorkspace.id)
      
      if (error) throw error
      return data || []
    },
    enabled: !!selectedWorkspace?.id
  })

  // Fetch team members for the selected workspace
  const { data: teamMembers } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []
      const { data, error } = await supabase
        .from('workspace_members')
        .select('*')
        .eq('workspace_id', selectedWorkspace.id)
      
      if (error) throw error
      return data || []
    },
    enabled: !!selectedWorkspace?.id
  })

  // Calculate active workflows
  const activeWorkflows = workflows?.filter(w => w.is_active)?.length || 0
  const totalWorkflows = workflows?.length || 0

  // Get team members count
  const teamMemberCount = teamMembers?.length || 0

  return (
    <div className="flex-1 relative">
      <DashboardTopNav />
      <div className="p-8 pt-24 space-y-8">
        <DashboardHeader userName={userName} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="Tasks" 
            current={0} 
            max={1000} 
            showGetMore 
          />
          <StatCard 
            title="Active Workflows" 
            current={activeWorkflows} 
            max={totalWorkflows || 5} 
          />
          <StatCard 
            title="Team Members" 
            current={teamMemberCount} 
            max={5} 
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard