import { format } from "date-fns"
import { TableCell, TableRow } from "@/components/ui/table"
import { WorkflowActions } from "./WorkflowActions"
import { Workflow } from "@/types/workflow"

interface WorkflowTableRowProps {
  workflow: Workflow
  onDelete: (workflow: { id: string; name: string }) => void
  onToggleStatus: (workflowId: string, currentStatus: boolean) => void
}

export function WorkflowTableRow({ workflow, onDelete, onToggleStatus }: WorkflowTableRowProps) {
  return (
    <TableRow key={workflow.id}>
      <TableCell className="font-medium">{workflow.name}</TableCell>
      <TableCell>{workflow.is_active ? 'Active' : 'Inactive'}</TableCell>
      <TableCell>{format(new Date(workflow.created_at), 'MMM d, yyyy')}</TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <WorkflowActions
          workflow={workflow}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      </TableCell>
    </TableRow>
  )
}