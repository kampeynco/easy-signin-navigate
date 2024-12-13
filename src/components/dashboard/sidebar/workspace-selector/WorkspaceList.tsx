import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceListProps {
  workspaces: Workspace[];
  onSelect: (workspaceId: string) => void;
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
          className="flex items-center gap-2"
          onSelect={() => onSelect(workspace.id)}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{workspace.name}</span>
        </DropdownMenuItem>
      ))}
    </>
  )
}