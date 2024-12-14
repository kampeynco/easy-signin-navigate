import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useSession } from "@supabase/auth-helpers-react"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export function WorkspaceSelector() {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: workspaces, isLoading, error } = useWorkspaces(session?.user?.id)
  const { selectedWorkspaceId, setSelectedWorkspaceId, selectedWorkspace } = useWorkspace()

  // Automatically select the first workspace if none is selected
  useEffect(() => {
    if (workspaces?.length && !selectedWorkspaceId) {
      console.log('WorkspaceSelector: Auto-selecting first workspace:', workspaces[0].id)
      handleWorkspaceSelect(workspaces[0].id)
    }
  }, [workspaces, selectedWorkspaceId])

  const handleWorkspaceSelect = async (workspaceId: string) => {
    try {
      console.log('WorkspaceSelector: Switching to workspace:', workspaceId)
      setSelectedWorkspaceId(workspaceId)
      
      // Invalidate all queries to refresh data
      await queryClient.invalidateQueries()
      
      toast({
        title: "Workspace switched",
        description: "Dashboard updated with selected workspace data",
      })
    } catch (error) {
      console.error('Error switching workspace:', error)
      toast({
        title: "Error",
        description: "Failed to switch workspace",
        variant: "destructive",
      })
    }
  }

  // Handle loading state
  if (isLoading) {
    return (
      <button disabled className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading workspaces...</span>
      </button>
    )
  }

  // Handle error state
  if (error) {
    console.error('WorkspaceSelector: Error:', error)
    return (
      <button disabled className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 text-red-500">
        <span className="flex-1 text-left text-sm">Error loading workspaces</span>
      </button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-[#F1F0FB] text-[#403E43]">
              {selectedWorkspace?.name?.charAt(0) || 'W'}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 text-left text-sm">
            {selectedWorkspace?.name || 'Select workspace'}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px]">
        {workspaces && workspaces.length > 0 ? (
          workspaces.map((workspace) => (
            <DropdownMenuItem 
              key={workspace.id}
              onSelect={() => handleWorkspaceSelect(workspace.id)}
              className="flex items-center gap-2 cursor-pointer text-foreground hover:text-white focus:text-white"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-[#F1F0FB] text-[#403E43]">
                  {workspace.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{workspace.name}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            No workspaces available
          </DropdownMenuItem>
        )}
        <Separator className="my-2" />
        <CreateWorkspaceDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}