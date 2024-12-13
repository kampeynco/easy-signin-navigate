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

      console.log('Fetching members and invitations for workspace:', selectedWorkspace.id)

      // Fetch active members
      const { data: members, error: membersError } = await supabase
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

      if (membersError) {
        console.error('Error fetching workspace members:', membersError)
        throw membersError
      }

      // Fetch pending invitations
      const { data: invitations, error: invitationsError } = await supabase
        .from('workspace_invitations')
        .select('*')
        .eq('workspace_id', selectedWorkspace.id)
        .eq('status', 'pending')

      if (invitationsError) {
        console.error('Error fetching workspace invitations:', invitationsError)
        throw invitationsError
      }

      // Transform members data
      const activeMembers = members.map((member: any): WorkspaceMember => ({
        id: member.user_id,
        email: member.profiles.email || '',
        first_name: member.profiles.first_name || '',
        last_name: member.profiles.last_name || '',
        role: member.role,
        status: 'active'
      }))

      // Transform invitations to member format
      const pendingMembers = invitations.map((invitation): WorkspaceMember => ({
        id: invitation.id,
        email: invitation.email,
        first_name: '',
        last_name: '',
        role: invitation.role,
        status: 'pending'
      }))

      // Combine both arrays
      return [...activeMembers, ...pendingMembers]
    },
    enabled: !!selectedWorkspace?.id
  })
}