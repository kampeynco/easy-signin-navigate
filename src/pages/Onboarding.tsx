import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { User } from "lucide-react"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { WorkspaceCreationForm } from "@/components/onboarding/WorkspaceCreationForm"

const Onboarding = () => {
  const [step, setStep] = useState(1)
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
          <WorkspaceCreationForm />
        )}
      </div>
    </div>
  )
}

export default Onboarding
