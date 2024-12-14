import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { MembersList } from "./members/MembersList"
import { useWorkspaceMembers } from "@/hooks/useWorkspaceMembers"
import { useMemberActions } from "./members/MemberActions"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { AddMemberDialog } from "./members/AddMemberDialog"
import { useSession } from "@supabase/auth-helpers-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
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
  const session = useSession()
  const { toast } = useToast()
  const { 
    handleRoleChange, 
    handleRemoveMember, 
    confirmRemoveMember,
    cancelRemoveMember,
    pendingDeletion 
  } = useMemberActions()

  const handleResendInvite = async (email: string) => {
    if (!selectedWorkspace || !session?.user) return

    try {
      const { data: invitation, error: invitationError } = await supabase
        .from('workspace_invitations')
        .select('id, token')
        .eq('email', email)
        .eq('workspace_id', selectedWorkspace.id)
        .eq('status', 'pending')
        .single()

      if (invitationError) throw invitationError

      const { error: resendError } = await supabase.functions.invoke('send-invitation-email', {
        body: {
          invitationId: invitation.id,
          workspaceName: selectedWorkspace.name,
          invitedByEmail: session.user.email,
        },
      })

      if (resendError) throw resendError

      toast({
        title: "Invitation Resent",
        description: `A new invitation email has been sent to ${email}`,
      })
    } catch (error: any) {
      console.error('Error resending invitation:', error)
      toast({
        title: "Error",
        description: "Failed to resend invitation email",
        variant: "destructive",
      })
    }
  }

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
        onResendInvite={handleResendInvite}
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