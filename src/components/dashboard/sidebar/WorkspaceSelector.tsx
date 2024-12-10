import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "@supabase/auth-helpers-react"

export function WorkspaceSelector() {
  const { toast } = useToast()
  const session = useSession()
  const queryClient = useQueryClient()
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch workspaces
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Fetching workspaces...')
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          name,
          workspace_members!inner (
            role
          )
        `)
        .eq('workspace_members.user_id', session?.user?.id)
      
      if (error) {
        console.error('Error fetching workspaces:', error)
        throw error
      }
      
      console.log('Fetched workspaces:', data)
      return data || []
    },
    enabled: !!session?.user?.id
  })

  // Create workspace mutation
  const createWorkspace = useMutation({
    mutationFn: async (name: string) => {
      console.log('Creating workspace:', name)
      
      // Insert workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({ name })
        .select()
        .single()

      if (workspaceError) throw workspaceError

      // Add creator as admin
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: session?.user?.id,
          role: 'admin'
        })

      if (memberError) throw memberError

      return workspace
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      toast({
        title: "Success",
        description: "Workspace created successfully",
      })
      setIsDialogOpen(false)
      setNewWorkspaceName("")
    },
    onError: (error) => {
      console.error('Error creating workspace:', error)
      toast({
        title: "Error",
        description: "Failed to create workspace",
        variant: "destructive",
      })
    }
  })

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workspace name",
        variant: "destructive",
      })
      return
    }

    createWorkspace.mutate(newWorkspaceName)
  }

  if (isLoading) {
    return (
      <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading...</span>
      </button>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {workspaces?.[0]?.name?.charAt(0) || 'W'}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left text-sm">
              {workspaces?.[0]?.name || 'Select Workspace'}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]">
          {workspaces?.map((workspace) => (
            <DropdownMenuItem 
              key={workspace.id}
              className="flex items-center gap-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{workspace.name}</span>
            </DropdownMenuItem>
          ))}
          <Separator className="my-2" />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="flex items-center gap-2"
                onSelect={(e) => e.preventDefault()}
              >
                <Plus className="h-4 w-4" />
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
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}