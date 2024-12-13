import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import type { WorkspaceMember } from "@/types/workspace-member"
import type { Database } from "@/integrations/supabase/types"

// Define the shape of the profiles join data
type ProfilesJoin = {
  profiles: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}

// Combine the base workspace member type with the profiles join
type WorkspaceMemberRow = Database['public']['Tables']['workspace_members']['Row'] & ProfilesJoin

export function useWorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  
  const { data: members = [], isLoading, error } = useQuery({
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
          *,
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

      if (!data) return []

      // Transform the data to match our WorkspaceMember type
      return (data as WorkspaceMemberRow[]).map((member) => ({
        id: member.user_id,
        first_name: member.profiles?.first_name || '',
        last_name: member.profiles?.last_name || '',
        email: member.profiles?.email || '',
        role: member.role
      })) as WorkspaceMember[]
    },
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