import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import type { WorkspaceMember } from "@/types/workspace"

export function useWorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []

      console.log('Fetching members for workspace:', selectedWorkspace.id)

      const { data: memberships, error: membershipsError } = await supabase
        .from('workspace_members')
        .select(`
          user_id,
          role,
          profiles (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('workspace_id', selectedWorkspace.id)

      if (membershipsError) {
        console.error('Error fetching members:', membershipsError)
        throw membershipsError
      }

      console.log('Fetched memberships:', memberships)

      return memberships.map((membership: any) => ({
        id: membership.profiles.id,
        first_name: membership.profiles.first_name,
        last_name: membership.profiles.last_name,
        email: membership.profiles.email,
        role: membership.role
      }))
    },
    enabled: !!selectedWorkspace?.id
  })

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedWorkspace?.id) return

    const channel = supabase
      .channel('workspace-members')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workspace_members',
          filter: `workspace_id=eq.${selectedWorkspace.id}`
        },
        (payload) => {
          console.log('Workspace members changed:', payload)
          // Invalidate and refetch members when changes occur
          queryClient.invalidateQueries({
            queryKey: ['workspace-members', selectedWorkspace.id]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedWorkspace?.id, queryClient])

  return { members, isLoading }
}