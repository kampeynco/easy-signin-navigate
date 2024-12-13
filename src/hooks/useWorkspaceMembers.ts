import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import type { WorkspaceMember } from "@/types/workspace-member"

export function useWorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()

  return useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) {
        console.log('No workspace selected')
        return []
      }

      console.log('Fetching members for workspace:', selectedWorkspace.id)

      const { data, error } = await supabase
        .from('workspace_members')
        .select(`
          id,
          user_id,
          workspace_id,
          role,
          profiles:user_id (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('workspace_id', selectedWorkspace.id)

      if (error) {
        console.error('Error fetching workspace members:', error)
        throw error
      }

      console.log('Raw workspace members data:', data)

      return data.map((member: any): WorkspaceMember => ({
        id: member.user_id,
        email: member.profiles.email || '',
        first_name: member.profiles.first_name || '',
        last_name: member.profiles.last_name || '',
        role: member.role
      }))
    },
    enabled: !!selectedWorkspace?.id
  })
}