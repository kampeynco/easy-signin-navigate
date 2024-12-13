import { useWorkspaceMemberDeletion } from "@/hooks/workspace/useWorkspaceMemberDeletion"
import { useWorkspaceRoleManagement } from "@/hooks/workspace/useWorkspaceRoleManagement"

export function useMemberActions() {
  const { 
    pendingDeletion,
    handleRemoveMember,
    confirmRemoveMember,
    cancelRemoveMember
  } = useWorkspaceMemberDeletion()

  const { handleRoleChange } = useWorkspaceRoleManagement()

  return {
    handleRoleChange,
    handleRemoveMember,
    confirmRemoveMember,
    cancelRemoveMember,
    pendingDeletion
  }
}