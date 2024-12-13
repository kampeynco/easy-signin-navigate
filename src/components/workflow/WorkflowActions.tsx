import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ToggleLeft, ToggleRight } from "lucide-react"
import { Workflow } from "@/types/workflow"

interface WorkflowActionsProps {
  workflow: Workflow
  onDelete: (workflow: { id: string; name: string }) => void
  onToggleStatus: (workflowId: string, currentStatus: boolean) => void
}

export function WorkflowActions({ workflow, onDelete, onToggleStatus }: WorkflowActionsProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onToggleStatus(workflow.id, workflow.is_active)}
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
            onClick={() => onDelete({ id: workflow.id, name: workflow.name })}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}