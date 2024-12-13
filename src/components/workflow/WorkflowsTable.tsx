import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { supabase } from "@/integrations/supabase/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { MoreHorizontal, ToggleLeft, ToggleRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

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
      return data
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
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows?.map((workflow) => (
            <TableRow key={workflow.id}>
              <TableCell className="font-medium">{workflow.name}</TableCell>
              <TableCell>{workflow.is_active ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>{format(new Date(workflow.created_at), 'MMM d, yyyy')}</TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleToggleStatus(workflow.id, workflow.is_active)}
                >
                  {workflow.is_active ? (
                    <ToggleRight className="h-4 w-4" />
                  ) : (
                    <ToggleLeft className="h-4 w-4" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => setWorkflowToDelete({ id: workflow.id, name: workflow.name })}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {workflows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No workflows found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={!!workflowToDelete} onOpenChange={() => setWorkflowToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{workflowToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteWorkflow}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}