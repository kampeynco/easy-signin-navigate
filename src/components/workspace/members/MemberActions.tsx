import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useQueryClient } from "@tanstack/react-query"

export function useMemberActions() {
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  const queryClient = useQueryClient()

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

  const handleRemoveMember = async (memberId: string, isPending: boolean = false) => {
    if (!selectedWorkspace?.id) return

    try {
      let error;

      if (isPending) {
        // Delete from workspace_invitations table if it's a pending invitation
        const { error: invitationError } = await supabase
          .from('workspace_invitations')
          .delete()
          .eq('id', memberId)
          .eq('workspace_id', selectedWorkspace.id)

        error = invitationError
      } else {
        // Delete from workspace_members table if it's an active member
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
    }
  }

  return { handleRoleChange, handleRemoveMember }
}