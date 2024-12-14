import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { WorkspaceAvatar } from "./WorkspaceAvatar"
import type { Workspace } from "@/types/workspace"

interface WorkspaceListProps {
  workspaces: Workspace[]
  onSelect: (workspaceId: string) => void
}

export function WorkspaceList({ workspaces, onSelect }: WorkspaceListProps) {
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
          onSelect={() => onSelect(workspace.id)}
          className="flex items-center gap-2 cursor-pointer text-foreground hover:text-white focus:text-white"
        >
          <WorkspaceAvatar name={workspace.name} />
          <span>{workspace.name}</span>
        </DropdownMenuItem>
      ))}
    </>
  )
}