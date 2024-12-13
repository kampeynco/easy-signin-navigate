import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import type { Workspace } from "@/types/workspace"

interface WorkspaceContextType {
  selectedWorkspaceId: string | null
  setSelectedWorkspaceId: (id: string | null) => void
  selectedWorkspace: Workspace | null
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const session = useSession()
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null)
  const { data: workspaces } = useWorkspaces(session?.user?.id)
  
  const selectedWorkspace = workspaces?.find(w => w.id === selectedWorkspaceId) || null

  // Auto-select the first workspace if none is selected and workspaces are available
  useEffect(() => {
    if (workspaces?.length && !selectedWorkspaceId) {
      console.log('WorkspaceContext: Auto-selecting first workspace')
      setSelectedWorkspaceId(workspaces[0].id)
    }
  }, [workspaces, selectedWorkspaceId])

  // Reset selection if the selected workspace is no longer available
  useEffect(() => {
    if (selectedWorkspaceId && workspaces?.length && !selectedWorkspace) {
      console.log('WorkspaceContext: Selected workspace no longer available, resetting selection')
      setSelectedWorkspaceId(workspaces[0].id)
    }
  }, [workspaces, selectedWorkspaceId, selectedWorkspace])

  return (
    <WorkspaceContext.Provider 
      value={{ 
        selectedWorkspaceId, 
        setSelectedWorkspaceId,
        selectedWorkspace
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider')
  }
  return context
}