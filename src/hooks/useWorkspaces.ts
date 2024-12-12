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
      
      // Sort workspaces to prioritize admin workspaces
      const sortedWorkspaces = data.workspaces.sort((a: Workspace, b: Workspace) => {
        if (a.role === 'admin' && b.role !== 'admin') return -1
        if (a.role !== 'admin' && b.role === 'admin') return 1
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
      
      console.log('useWorkspaces: Fetched and sorted workspaces:', sortedWorkspaces)
      return sortedWorkspaces as Workspace[]
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
    refetchOnWindowFocus: false
  })
}