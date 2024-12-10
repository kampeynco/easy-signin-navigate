import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"

const Onboarding = () => {
  const [workspaceName, setWorkspaceName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const session = useSession()

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!workspaceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workspace name",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    
    try {
      // Insert workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({ name: workspaceName.trim() })
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

      toast({
        title: "Success",
        description: "Workspace created successfully",
      })
      
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating workspace:', error)
      toast({
        title: "Error",
        description: "Failed to create workspace",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to Kampeyn</h1>
          <p className="text-muted-foreground">Let's create your first workspace to get started</p>
        </div>

        <form onSubmit={handleCreateWorkspace} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              disabled={isCreating}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Workspace"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Onboarding