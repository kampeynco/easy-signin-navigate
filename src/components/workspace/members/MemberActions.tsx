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

  const handleRemoveMember = async (memberId: string) => {
    if (!selectedWorkspace?.id) return

    try {
      const { error } = await supabase
        .from('workspace_members')
        .delete()
        .eq('workspace_id', selectedWorkspace.id)
        .eq('user_id', memberId)

      if (error) throw error

      await queryClient.invalidateQueries({
        queryKey: ['workspace-members', selectedWorkspace.id]
      })

      toast({
        title: "Member removed",
        description: "Team member has been removed successfully.",
      })
    } catch (error: any) {
      console.error('Error removing member:', error)
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      })
    }
  }

  return { handleRoleChange, handleRemoveMember }
}