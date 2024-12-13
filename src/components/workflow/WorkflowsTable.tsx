import { useQuery } from "@tanstack/react-query"
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

export function WorkflowsTable() {
  const { selectedWorkspace } = useWorkspace()

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

  if (isLoading) {
    return <div>Loading workflows...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workflows?.map((workflow) => (
          <TableRow key={workflow.id}>
            <TableCell className="font-medium">{workflow.name}</TableCell>
            <TableCell>{workflow.is_active ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>{format(new Date(workflow.created_at), 'MMM d, yyyy')}</TableCell>
          </TableRow>
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
  )
}