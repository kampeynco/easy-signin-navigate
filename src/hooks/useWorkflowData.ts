import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Workflow } from "@/types/workflow"

export function useWorkflowData() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: workflows, isLoading } = useQuery({
    queryKey: ['workflows', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace) return []

      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .eq('workspace_id', selectedWorkspace.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Workflow[]
    },
    enabled: !!selectedWorkspace,
  })

  const handleDeleteWorkflow = async (workflowToDelete: { id: string; name: string }) => {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', workflowToDelete.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete workflow",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Workflow deleted successfully",
      })
      queryClient.invalidateQueries({ queryKey: ['workflows'] })
    }
  }

  const handleToggleStatus = async (workflowId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('workflows')
      .update({ is_active: !currentStatus })
      .eq('id', workflowId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update workflow status",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Workflow ${currentStatus ? 'deactivated' : 'activated'} successfully`,
      })
      queryClient.invalidateQueries({ queryKey: ['workflows'] })
    }
  }

  return {
    workflows,
    isLoading,
    handleDeleteWorkflow,
    handleToggleStatus
  }
}