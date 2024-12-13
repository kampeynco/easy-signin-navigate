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

export function AddMemberDialog() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { selectedWorkspace } = useWorkspace()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")

  const addMember = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      console.log('AddMemberDialog: Adding member:', { email, role, workspaceId: selectedWorkspace?.id })
      
      if (!selectedWorkspace?.id) {
        throw new Error('No workspace selected')
      }

      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      if (userError || !userProfile) {
        throw new Error('User not found')
      }

      const { error } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: selectedWorkspace.id,
          user_id: userProfile.id,
          role: role
        })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', selectedWorkspace?.id] })
      toast({
        title: "Success",
        description: "Member added successfully",
      })
      setIsOpen(false)
      setEmail("")
      setRole("member")
    },
    onError: (error: any) => {
      console.error('AddMemberDialog: Error adding member:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to add member",
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
          <DialogTitle>Add Team Member</DialogTitle>
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
            {addMember.isPending ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}