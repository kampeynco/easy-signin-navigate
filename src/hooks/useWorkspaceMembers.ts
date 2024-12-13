import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { transformWorkspaceMember } from "@/utils/workspace-transforms"
import type { WorkspaceMemberResponse } from "@/types/workspace-queries"

export function useWorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  
  const fetchWorkspaceMembers = async () => {
    if (!selectedWorkspace?.id) {
      console.log('No workspace selected')
      return []
    }

    console.log('Fetching members for workspace:', selectedWorkspace.id)

    const { data, error } = await supabase
      .from('workspace_members')
      .select(`
        user_id,
        workspace_id,
        role,
        profiles (
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
    return (data as WorkspaceMemberResponse[])?.map(transformWorkspaceMember) || []
  }

  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: fetchWorkspaceMembers,
    enabled: !!selectedWorkspace?.id
  })

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedWorkspace?.id) return

    console.log('Setting up real-time subscription for workspace:', selectedWorkspace.id)

    const channel = supabase
      .channel(`workspace-members-${selectedWorkspace.id}`)
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
          queryClient.invalidateQueries({
            queryKey: ['workspace-members', selectedWorkspace.id]
          })
        }
      )
      .subscribe()

    return () => {
      console.log('Cleaning up real-time subscription')
      supabase.removeChannel(channel)
    }
  }, [selectedWorkspace?.id, queryClient])

  return { members, isLoading, error }
}