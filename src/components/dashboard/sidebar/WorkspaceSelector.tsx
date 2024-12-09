import { ChevronDown, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const workspaces = [
  { name: "Personal", avatar: "P" },
  { name: "Acme Corp", avatar: "A" },
  { name: "Startup Inc", avatar: "S" },
]

export function WorkspaceSelector() {
  const { toast } = useToast()

  const handleWorkspaceChange = (workspace: string) => {
    toast({
      title: "Workspace Changed",
      description: `Switched to ${workspace} workspace.`,
    })
  }

  const handleCreateWorkspace = () => {
    toast({
      title: "Create Workspace",
      description: "Opening workspace creation form...",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <span className="flex-1 text-left text-sm">My Workspace</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px]">
        {workspaces.map((workspace) => (
          <DropdownMenuItem 
            key={workspace.name} 
            className="flex items-center gap-2"
            onClick={() => handleWorkspaceChange(workspace.name)}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback>{workspace.avatar}</AvatarFallback>
            </Avatar>
            <span>{workspace.name}</span>
          </DropdownMenuItem>
        ))}
        <Separator className="my-2" />
        <DropdownMenuItem 
          className="flex items-center gap-2"
          onClick={handleCreateWorkspace}
        >
          <Plus className="h-4 w-4" />
          <span>Create New Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}