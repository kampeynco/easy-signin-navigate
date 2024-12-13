import { useState, useEffect } from "react"
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
import type { Workspace } from "@/types/workspace"
import { useQueryClient } from "@tanstack/react-query"

export function WorkspaceSelector() {
  const session = useSession()
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null)
  const { data: workspaces, isLoading, error } = useWorkspaces(session?.user?.id)
  const queryClient = useQueryClient()

  // Automatically select the first workspace if none is selected or current selection doesn't exist
  useEffect(() => {
    if (workspaces && workspaces.length > 0) {
      // If no workspace is selected or the selected workspace no longer exists
      if (!selectedWorkspaceId || !workspaces.find(w => w.id === selectedWorkspaceId)) {
        setSelectedWorkspaceId(workspaces[0].id)
      }
    } else {
      setSelectedWorkspaceId(null)
    }
  }, [workspaces, selectedWorkspaceId])

  const handleWorkspaceSelect = async (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId)
    // Invalidate queries that depend on the current workspace
    await queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    await queryClient.invalidateQueries({ queryKey: ['workflows'] })
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

  const selectedWorkspace = workspaces?.find(w => w.id === selectedWorkspaceId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
          <Avatar className="h-6 w-6">
            <AvatarFallback>
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
          workspaces.map((workspace: Workspace) => (
            <DropdownMenuItem 
              key={workspace.id}
              className="flex items-center gap-2"
              onSelect={() => handleWorkspaceSelect(workspace.id)}
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
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