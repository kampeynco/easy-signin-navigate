import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useSession } from "@supabase/auth-helpers-react"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { WorkspaceList } from "./workspace-selector/WorkspaceList"
import { WorkspaceTrigger } from "./workspace-selector/WorkspaceTrigger"

export function WorkspaceSelector() {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: workspaces, isLoading, error } = useWorkspaces(session?.user?.id)
  const { selectedWorkspaceId, setSelectedWorkspaceId, selectedWorkspace } = useWorkspace()

  const handleWorkspaceSelect = async (workspaceId: string) => {
    try {
      console.log('WorkspaceSelector: Switching to workspace:', workspaceId)
      setSelectedWorkspaceId(workspaceId)
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

  // If there are workspaces but none is selected, select the first one
  if (workspaces?.length > 0 && !selectedWorkspaceId) {
    console.log('WorkspaceSelector: Auto-selecting first workspace')
    handleWorkspaceSelect(workspaces[0].id)
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
        <WorkspaceTrigger 
          workspaceName={selectedWorkspace?.name} 
          isLoading={isLoading} 
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px]">
        <WorkspaceList 
          workspaces={workspaces || []} 
          onSelect={handleWorkspaceSelect}
          selectedWorkspaceId={selectedWorkspaceId} 
        />
        <Separator className="my-2" />
        <CreateWorkspaceDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}