import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { Building } from "lucide-react"

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

    if (!session?.user?.id) {
      console.error('No user session found')
      toast({
        title: "Error",
        description: "Please sign in again",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    
    try {
      console.log('Creating workspace:', workspaceName)
      
      // Insert workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert([{ name: workspaceName.trim() }])
        .select()
        .single()

      if (workspaceError) {
        console.error('Error creating workspace:', workspaceError)
        throw workspaceError
      }

      console.log('Workspace created:', workspace)

      // Add creator as admin
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert([{
          workspace_id: workspace.id,
          user_id: session.user.id,
          role: 'admin'
        }])

      if (memberError) {
        console.error('Error adding workspace member:', memberError)
        throw memberError
      }

      console.log('Added user as workspace admin')

      toast({
        title: "Success",
        description: "Your workspace has been created",
      })
      
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Error in workspace creation:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to create workspace. Please try again.",
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
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Building className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to Kampeyn</h1>
          <p className="text-muted-foreground">Let's create your first workspace</p>
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