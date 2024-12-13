import { useState } from "react"
import { Plus } from "lucide-react"
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
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

export function CreateWorkspaceDialog() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [workspaceName, setWorkspaceName] = useState("")

  const createWorkspace = useMutation({
    mutationFn: async (name: string) => {
      console.log('CreateWorkspaceDialog: Creating workspace:', name)
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.id) {
        throw new Error('No active session')
      }

      const { data, error } = await supabase.functions.invoke('create-workspace', {
        body: {
          name: name.trim(),
          userId: session.user.id
        }
      })

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      toast({
        title: "Success",
        description: "Workspace created successfully",
      })
      setIsOpen(false)
      setWorkspaceName("")
    },
    onError: (error) => {
      console.error('CreateWorkspaceDialog: Error creating workspace:', error)
      toast({
        title: "Error",
        description: "Failed to create workspace",
        variant: "destructive",
      })
    }
  })

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workspace name",
        variant: "destructive",
      })
      return
    }

    createWorkspace.mutate(workspaceName)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem 
          className="flex items-center gap-2 hover:text-white group"
          onSelect={(e) => e.preventDefault()}
        >
          <Plus className="h-4 w-4 group-hover:text-white" />
          <span>Create New Workspace</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <Button 
            onClick={handleCreateWorkspace}
            disabled={createWorkspace.isPending}
            className="w-full"
          >
            {createWorkspace.isPending ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}