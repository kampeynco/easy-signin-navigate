import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import type { WorkspaceMember } from "@/types/workspace-member"

export function useWorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []

      console.log('Fetching members for workspace:', selectedWorkspace.id)

      const { data, error } = await supabase
        .from('workspace_members')
        .select(`
          user_id,
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

      return data.map((member: any) => ({
        id: member.user_id,
        first_name: member.profiles?.first_name,
        last_name: member.profiles?.last_name,
        email: member.profiles?.email,
        role: member.role
      })) as WorkspaceMember[]
    },
    enabled: !!selectedWorkspace?.id
  })

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedWorkspace?.id) return

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
      supabase.removeChannel(channel)
    }
  }, [selectedWorkspace?.id, queryClient])

  return { members, isLoading, error }
}