import { WorkspaceInfoForm } from "./settings/WorkspaceInfoForm"
import { DeleteWorkspaceCard } from "./settings/DeleteWorkspaceCard"
import { useWorkspace } from "@/contexts/WorkspaceContext"

export function WorkspaceGeneralSettings() {
  const { selectedWorkspace } = useWorkspace()

  if (!selectedWorkspace) {
    return null
  }

  return (
    <div className="space-y-6">
      <WorkspaceInfoForm />
      <DeleteWorkspaceCard />
    </div>
  )
}