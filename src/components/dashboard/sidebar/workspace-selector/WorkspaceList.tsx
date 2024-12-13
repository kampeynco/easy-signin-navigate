import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Check } from "lucide-react"
import type { Workspace } from "@/types/workspace"

interface WorkspaceListProps {
  workspaces: Workspace[];
  onSelect: (workspaceId: string) => void;
  selectedWorkspaceId: string | null;
}

export function WorkspaceList({ workspaces, onSelect, selectedWorkspaceId }: WorkspaceListProps) {
  if (!workspaces?.length) {
    return (
      <DropdownMenuItem disabled>
        No workspaces available
      </DropdownMenuItem>
    )
  }

  return (
    <>
      {workspaces.map((workspace) => (
        <DropdownMenuItem 
          key={workspace.id}
          className="flex items-center gap-2 justify-between cursor-pointer hover:text-white"
          onSelect={(e) => {
            e.preventDefault()
            onSelect(workspace.id)
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {workspace.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{workspace.name}</span>
          </div>
          {selectedWorkspaceId === workspace.id && (
            <Check className="h-4 w-4 shrink-0" />
          )}
        </DropdownMenuItem>
      ))}
    </>
  )
}