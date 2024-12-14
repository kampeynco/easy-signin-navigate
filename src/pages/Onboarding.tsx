import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { Building, User } from "lucide-react"
import { ProfileForm } from "@/components/profile/ProfileForm"

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const [workspaceName, setWorkspaceName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [hasWorkspace, setHasWorkspace] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const session = useSession()

  useEffect(() => {
    const checkWorkspace = async () => {
      if (!session?.user?.id) return

      const { data: workspaces, error } = await supabase
        .from('workspace_members')
        .select('workspace_id')
        .eq('user_id', session.user.id)
        .single()

      if (!error && workspaces) {
        console.log('User already has a workspace:', workspaces)
        setHasWorkspace(true)
      }
    }

    checkWorkspace()
  }, [session])

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

  const handleProfileSubmit = () => {
    if (hasWorkspace) {
      // If user already has a workspace (invited user), go directly to dashboard
      navigate('/dashboard')
    } else {
      // Otherwise, proceed to workspace creation
      setStep(2)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        {step === 1 ? (
          <>
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Complete Your Profile</h1>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>

            <ProfileForm onSubmit={handleProfileSubmit} submitLabel="Continue" />
          </>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default Onboarding