import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Check } from "lucide-react"

interface Workspace {
  id: string;
  name: string;
}

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
          className="flex items-center gap-2 justify-between cursor-pointer"
          onSelect={(e) => {
            e.preventDefault()
            onSelect(workspace.id)
          }}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{workspace.name}</span>
          </div>
          {selectedWorkspaceId === workspace.id && (
            <Check className="h-4 w-4" />
          )}
        </DropdownMenuItem>
      ))}
    </>
  )
}