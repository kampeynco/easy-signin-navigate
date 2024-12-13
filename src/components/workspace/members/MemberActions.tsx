import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface PendingDeletion {
  memberId: string
  email: string
  isPending: boolean
}

export function useMemberActions() {
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [pendingDeletion, setPendingDeletion] = useState<PendingDeletion | null>(null)

  const handleRoleChange = async (memberId: string, currentRole: string) => {
    if (!selectedWorkspace?.id) return

    try {
      const newRole = currentRole === 'admin' ? 'member' : 'admin'
      
      const { error } = await supabase
        .from('workspace_members')
        .update({ role: newRole })
        .eq('workspace_id', selectedWorkspace.id)
        .eq('user_id', memberId)

      if (error) throw error

      await queryClient.invalidateQueries({
        queryKey: ['workspace-members', selectedWorkspace.id]
      })

      toast({
        title: "Role updated",
        description: "Member role has been updated successfully.",
      })
    } catch (error: any) {
      console.error('Error updating role:', error)
      toast({
        title: "Error",
        description: "Failed to update member role",
        variant: "destructive",
      })
    }
  }

  const handleRemoveMember = async (memberId: string, isPending: boolean = false, email: string) => {
    setPendingDeletion({ memberId, email, isPending })
  }

  const confirmRemoveMember = async () => {
    if (!pendingDeletion || !selectedWorkspace?.id) return

    const { memberId, isPending } = pendingDeletion

    try {
      let error;

      if (isPending) {
        const { error: invitationError } = await supabase
          .from('workspace_invitations')
          .delete()
          .eq('id', memberId)
          .eq('workspace_id', selectedWorkspace.id)

        error = invitationError
      } else {
        const { error: memberError } = await supabase
          .from('workspace_members')
          .delete()
          .eq('workspace_id', selectedWorkspace.id)
          .eq('user_id', memberId)

        error = memberError
      }

      if (error) throw error

      await queryClient.invalidateQueries({
        queryKey: ['workspace-members', selectedWorkspace.id]
      })

      toast({
        title: isPending ? "Invitation cancelled" : "Member removed",
        description: isPending 
          ? "The invitation has been cancelled successfully."
          : "Team member has been removed successfully.",
      })
    } catch (error: any) {
      console.error('Error removing member:', error)
      toast({
        title: "Error",
        description: isPending 
          ? "Failed to cancel invitation"
          : "Failed to remove team member",
        variant: "destructive",
      })
    } finally {
      setPendingDeletion(null)
    }
  }

  const cancelRemoveMember = () => {
    setPendingDeletion(null)
  }

  return { 
    handleRoleChange, 
    handleRemoveMember,
    confirmRemoveMember,
    cancelRemoveMember,
    pendingDeletion 
  }
}
