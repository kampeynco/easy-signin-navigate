import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { useWorkspace } from "@/contexts/WorkspaceContext"
import { useSession } from "@supabase/auth-helpers-react"

export function AddMemberDialog() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { selectedWorkspace } = useWorkspace()
  const session = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")

  const addMember = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      console.log('AddMemberDialog: Creating invitation:', { email, role, workspaceId: selectedWorkspace?.id })
      
      if (!selectedWorkspace?.id || !session?.user?.id) {
        throw new Error('No workspace selected or user not authenticated')
      }

      // Get inviter's profile for the email
      const { data: inviterProfile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', session.user.id)
        .single()

      // Create the invitation
      const { data: invitation, error: invitationError } = await supabase
        .from('workspace_invitations')
        .insert({
          workspace_id: selectedWorkspace.id,
          email: email,
          role: role,
          invited_by: session.user.id
        })
        .select()
        .single()

      if (invitationError) throw invitationError

      // Send invitation email
      const inviterName = `${inviterProfile?.first_name || ''} ${inviterProfile?.last_name || ''}`.trim() || 'A workspace admin'
      
      const { error: emailError } = await supabase.functions.invoke('send-invitation', {
        body: {
          invitationId: invitation.id,
          workspaceName: selectedWorkspace.name,
          toEmail: email,
          inviterName
        }
      })

      if (emailError) throw emailError

      return invitation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-invitations', selectedWorkspace?.id] })
      toast({
        title: "Invitation sent",
        description: "An invitation email has been sent to the user.",
      })
      setIsOpen(false)
      setEmail("")
      setRole("member")
    },
    onError: (error: any) => {
      console.error('AddMemberDialog: Error creating invitation:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      })
    }
  })

  const handleAddMember = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    addMember.mutate({ email, role })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="member@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Role
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleAddMember}
            disabled={addMember.isPending}
            className="w-full"
          >
            {addMember.isPending ? "Sending Invitation..." : "Send Invitation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}