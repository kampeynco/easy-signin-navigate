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
import { useEffect } from "react"
import { WorkspaceList } from "./workspace-selector/WorkspaceList"
import { WorkspaceSelectorButton } from "./workspace-selector/WorkspaceSelectorButton"

export function WorkspaceSelector() {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: workspaces, isLoading, error } = useWorkspaces(session?.user?.id)
  const { selectedWorkspaceId, setSelectedWorkspaceId, selectedWorkspace } = useWorkspace()

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <WorkspaceSelectorButton 
          workspaceName={selectedWorkspace?.name}
          isLoading={isLoading}
          error={error as Error}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px]">
        <WorkspaceList 
          workspaces={workspaces || []} 
          onSelect={handleWorkspaceSelect}
        />
        <Separator className="my-2" />
        <CreateWorkspaceDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}