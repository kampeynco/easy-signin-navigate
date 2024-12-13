import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { MembersList } from "./members/MembersList"
import { useWorkspaceMembers } from "@/hooks/useWorkspaceMembers"
import { useMemberActions } from "./members/MemberActions"

export function WorkspaceMembers() {
  const { data: members, isLoading, error } = useWorkspaceMembers()
  const { handleRoleChange, handleRemoveMember } = useMemberActions()

  console.log('WorkspaceMembers component state:', { members, isLoading, error })

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

  if (error) {
    console.error('Error in WorkspaceMembers:', error)
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Team Members</h2>
            <p className="text-sm text-destructive">
              Error loading members: {error.message}
            </p>
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
        members={members || []}
        onRoleChange={handleRoleChange}
        onRemove={handleRemoveMember}
      />
    </div>
  )
}