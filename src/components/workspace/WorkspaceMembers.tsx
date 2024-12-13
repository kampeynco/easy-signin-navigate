import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { MembersList } from "./members/MembersList"
import { useWorkspaceMembers } from "@/hooks/useWorkspaceMembers"
import { useMemberActions } from "./members/MemberActions"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { AddMemberDialog } from "./members/AddMemberDialog"
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

export function WorkspaceMembers() {
  const { selectedWorkspace } = useWorkspace()
  const { data: members, isLoading, error } = useWorkspaceMembers()
  const { 
    handleRoleChange, 
    handleRemoveMember, 
    confirmRemoveMember,
    cancelRemoveMember,
    pendingDeletion 
  } = useMemberActions()

  console.log('WorkspaceMembers component state:', { members, isLoading, error, selectedWorkspace })

  if (!selectedWorkspace) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Team Members</h2>
            <p className="text-sm text-muted-foreground">
              Please select a workspace to manage members.
            </p>
          </div>
        </div>
      </div>
    )
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
        <AddMemberDialog />
      </div>

      <MembersList 
        members={members || []}
        onRoleChange={handleRoleChange}
        onRemove={handleRemoveMember}
      />

      <AlertDialog 
        open={!!pendingDeletion} 
        onOpenChange={(open) => !open && cancelRemoveMember()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDeletion?.isPending ? 'Cancel Invitation' : 'Remove Member'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeletion?.isPending 
                ? `Are you sure you want to cancel the invitation for ${pendingDeletion.email}?`
                : `Are you sure you want to remove ${pendingDeletion?.email} from the workspace?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemoveMember}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveMember}>
              {pendingDeletion?.isPending ? 'Cancel Invitation' : 'Remove Member'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}