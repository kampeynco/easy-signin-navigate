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
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null)

  // Fetch workspaces
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      console.log('Fetching workspaces for user:', session?.user?.id)
      
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          name,
          workspace_members!inner (
            role,
            user_id
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
      console.log('Creating workspace via Edge Function:', name)
      
      const { data, error } = await supabase.functions.invoke('create-workspace', {
        body: {
          name: name.trim(),
          userId: session?.user?.id
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

  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId)
    // Here you could also store the selected workspace in localStorage
    // or trigger other actions when a workspace is selected
  }

  if (isLoading) {
    return (
      <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading...</span>
      </button>
    )
  }

  const selectedWorkspace = workspaces?.find(w => w.id === selectedWorkspaceId) || workspaces?.[0]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {selectedWorkspace?.name?.charAt(0) || 'W'}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left text-sm">
              {selectedWorkspace?.name || 'Select Workspace'}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]">
          {workspaces?.map((workspace) => (
            <DropdownMenuItem 
              key={workspace.id}
              className="flex items-center gap-2"
              onSelect={() => handleWorkspaceSelect(workspace.id)}
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