import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/integrations/supabase/client"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useToast } from "@/hooks/use-toast"

interface Member {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  role: string
}

export function WorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const { toast } = useToast()
  
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['workspace-members', selectedWorkspace?.id],
    queryFn: async () => {
      if (!selectedWorkspace?.id) return []

      const { data: memberships, error: membershipsError } = await supabase
        .from('workspace_members')
        .select(`
          user_id,
          role,
          profiles:user_id (
            id,
            first_name,
            last_name,
            email:id(email)
          )
        `)
        .eq('workspace_id', selectedWorkspace.id)

      if (membershipsError) {
        console.error('Error fetching members:', membershipsError)
        throw membershipsError
      }

      // Transform the data to match our Member interface
      return memberships.map((membership: any) => ({
        id: membership.profiles.id,
        first_name: membership.profiles.first_name,
        last_name: membership.profiles.last_name,
        email: membership.profiles.email?.email || '',
        role: membership.role
      }))
    },
    enabled: !!selectedWorkspace?.id
  })

  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
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

  const isOnlyAdmin = members.length === 1 && members[0]?.role === 'admin'

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

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            Invite and manage your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {`${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {member.first_name} {member.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {member.role}
                  </span>
                  {!isOnlyAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleRoleChange(member.id, member.role === 'admin' ? 'member' : 'admin')}
                        >
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-destructive"
                        >
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}