import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import type { Workspace } from "@/types/workspace"

export function useWorkspaces(userId?: string) {
  return useQuery({
    queryKey: ['workspaces', userId],
    queryFn: async () => {
      console.log('useWorkspaces: Fetching workspaces for user:', userId)
      
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          name,
          created_at,
          updated_at,
          workspace_members!inner (
            role,
            user_id
          )
        `)
        .eq('workspace_members.user_id', userId)
      
      if (error) {
        console.error('useWorkspaces: Error fetching workspaces:', error)
        throw error
      }
      
      console.log('useWorkspaces: Fetched workspaces:', data)
      return data as Workspace[]
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2
  })
}