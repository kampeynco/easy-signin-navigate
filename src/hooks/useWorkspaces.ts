import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import type { Workspace } from "@/types/workspace"

export function useWorkspaces(userId?: string) {
  return useQuery({
    queryKey: ['workspaces', userId],
    queryFn: async () => {
      console.log('useWorkspaces: Fetching workspaces for user:', userId)
      
      if (!userId) {
        console.log('useWorkspaces: No user ID provided')
        return []
      }

      const { data, error } = await supabase.functions.invoke('get-user-workspaces')
      
      if (error) {
        console.error('useWorkspaces: Error fetching workspaces:', error)
        throw error
      }
      
      console.log('useWorkspaces: Fetched workspaces:', data.workspaces)
      return data.workspaces as Workspace[]
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Only retry once to avoid unnecessary API calls
    refetchOnWindowFocus: false // Prevent unnecessary refetches
  })
}