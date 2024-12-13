import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

interface PendingDeletion {
  memberId: string
  email: string
  isPending: boolean
}

export function useWorkspaceMemberDeletion() {
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [pendingDeletion, setPendingDeletion] = useState<PendingDeletion | null>(null)

  const handleRemoveMember = (memberId: string, isPending: boolean = false, email: string) => {
    setPendingDeletion({ memberId, email, isPending })
  }

  const confirmRemoveMember = async () => {
    if (!pendingDeletion || !selectedWorkspace?.id) return

    const { memberId, isPending } = pendingDeletion

    try {
      let error;

      if (isPending) {
        // Log the attempt to delete the invitation
        console.log('Attempting to delete invitation:', { invitationId: memberId, workspaceId: selectedWorkspace.id })
        
        const { data, error: invitationError } = await supabase
          .from('workspace_invitations')
          .delete()
          .eq('id', memberId)
          .eq('workspace_id', selectedWorkspace.id)
          .select()

        error = invitationError
        console.log('Deletion response:', { data, error: invitationError })
      } else {
        console.log('Removing member:', { memberId, workspaceId: selectedWorkspace.id })
        const { error: memberError } = await supabase
          .from('workspace_members')
          .delete()
          .match({ 
            workspace_id: selectedWorkspace.id,
            user_id: memberId 
          })

        error = memberError
      }

      if (error) {
        console.error('Error in confirmRemoveMember:', error)
        throw error
      }

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
    pendingDeletion,
    handleRemoveMember,
    confirmRemoveMember,
    cancelRemoveMember
  }
}