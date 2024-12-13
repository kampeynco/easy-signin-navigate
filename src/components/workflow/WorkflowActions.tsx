import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal } from "lucide-react"
import { Workflow } from "@/types/workflow"

interface WorkflowActionsProps {
  workflow: Workflow
  onDelete: (workflow: { id: string; name: string }) => void
  onToggleStatus: (workflowId: string, currentStatus: boolean) => void
}

export function WorkflowActions({ workflow, onDelete, onToggleStatus }: WorkflowActionsProps) {
  return (
    <>
      <Switch
        className="w-[44px] h-[24px] data-[state=checked]:bg-green-500"
        checked={workflow.is_active}
        onCheckedChange={() => onToggleStatus(workflow.id, workflow.is_active)}
      />
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