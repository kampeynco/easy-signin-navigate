import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useToast } from "@/hooks/use-toast"
import { MembersList } from "./members/MembersList"

export function WorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []

      console.log('Fetching members for workspace:', selectedWorkspace.id)

      const { data: memberships, error: membershipsError } = await supabase
        .from('workspace_members')
        .select(`
          user_id,
          role,
          profiles (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('workspace_id', selectedWorkspace.id)

      if (membershipsError) {
        console.error('Error fetching members:', membershipsError)
        throw membershipsError
      }

      console.log('Fetched memberships:', memberships)

      return memberships.map((membership) => ({
        id: membership.profiles.id,
        first_name: membership.profiles.first_name,
        last_name: membership.profiles.last_name,
        email: membership.profiles.email,
        role: membership.role
      }))
    },
    enabled: !!selectedWorkspace?.id
  })

  // Set up real-time subscription
  useEffect(() => {
    if (!selectedWorkspace?.id) return

    const channel = supabase
      .channel('workspace-members')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workspace_members',
          filter: `workspace_id=eq.${selectedWorkspace.id}`
        },
        (payload) => {
          console.log('Workspace members changed:', payload)
          // Invalidate and refetch members when changes occur
          queryClient.invalidateQueries({
            queryKey: ['workspace-members', selectedWorkspace.id]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedWorkspace?.id, queryClient])

  const handleRoleChange = async (memberId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'member' : 'admin'
      
      const { error } = await supabase
        .from('workspace_members')
        .update({ role: newRole })
        .eq('workspace_id', selectedWorkspace?.id)
        .eq('user_id', memberId)

      if (error) throw error

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
    try {
      const { error } = await supabase
        .from('workspace_members')
        .delete()
        .eq('workspace_id', selectedWorkspace?.id)
        .eq('user_id', memberId)

      if (error) throw error

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Team Members</h2>
            <p className="text-sm text-muted-foreground">Loading members...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Team Members</h2>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <MembersList 
        members={members}
        onRoleChange={handleRoleChange}
        onRemove={handleRemoveMember}
      />
    </div>
  )
}