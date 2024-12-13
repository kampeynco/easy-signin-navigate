import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { supabase } from "@/integrations/supabase/client"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { WorkflowTableRow } from "./WorkflowTableRow"
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog"
import type { Workflow } from "@/types/workflow"

export function WorkflowsTable() {
  const { selectedWorkspace } = useWorkspace()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [workflowToDelete, setWorkflowToDelete] = useState<{ id: string, name: string } | null>(null)

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

  const handleDeleteWorkflow = async () => {
    if (!workflowToDelete) return

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

    setWorkflowToDelete(null)
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

  if (isLoading) {
    return <div>Loading workflows...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows?.map((workflow) => (
            <WorkflowTableRow
              key={workflow.id}
              workflow={workflow}
              onDelete={setWorkflowToDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
          {workflows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No workflows found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteWorkflowDialog
        workflowToDelete={workflowToDelete}
        onOpenChange={() => setWorkflowToDelete(null)}
        onConfirm={handleDeleteWorkflow}
      />
    </>
  )
}
