import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { Building } from "lucide-react"

export function WorkspaceCreationForm() {
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
      
      const { data, error } = await supabase.functions.invoke('create-workspace', {
        body: {
          name: workspaceName.trim(),
          userId: session.user.id
        }
      })

      if (error) {
        console.error('Error creating workspace:', error)
        throw error
      }

      console.log('Workspace created successfully:', data)

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
    <>
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <Building className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Create Your Workspace</h1>
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
    </>
  )
}