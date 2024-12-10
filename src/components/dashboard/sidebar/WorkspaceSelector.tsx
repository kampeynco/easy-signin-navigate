import { useEffect, useState } from "react"
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
import { CreateWorkspaceDialog } from "../workspace/CreateWorkspaceDialog"
import { useSession } from "@supabase/auth-helpers-react"

interface Workspace {
  id: string
  name: string
}

export function WorkspaceSelector() {
  const { toast } = useToast()
  const session = useSession()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const { data, error } = await supabase
          .from("workspaces")
          .select(`
            id,
            name
          `)
          .order("created_at", { ascending: false })

        if (error) throw error

        setWorkspaces(data || [])
        if (data && data.length > 0 && !selectedWorkspace) {
          setSelectedWorkspace(data[0])
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching workspaces:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load workspaces",
        })
        setLoading(false)
      }
    }

    if (session?.user) {
      fetchWorkspaces()
    }
  }, [session?.user, toast])

  const handleWorkspaceChange = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    toast({
      title: "Workspace Changed",
      description: `Switched to ${workspace.name} workspace.`,
    })
  }

  if (loading) {
    return (
      <div className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {selectedWorkspace?.name.charAt(0) || "W"}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 text-left text-sm">
              {selectedWorkspace?.name || "Select Workspace"}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]">
          {workspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              className="flex items-center gap-2"
              onClick={() => handleWorkspaceChange(workspace)}
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback>{workspace.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{workspace.name}</span>
            </DropdownMenuItem>
          ))}
          <Separator className="my-2" />
          <CreateWorkspaceDialog />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}