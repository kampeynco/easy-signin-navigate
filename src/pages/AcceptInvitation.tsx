import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "@supabase/auth-helpers-react"

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const { toast } = useToast()
  const session = useSession()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const acceptInvitation = async () => {
      if (!token) {
        toast({
          variant: "destructive",
          title: "Invalid invitation",
          description: "No invitation token provided"
        })
        navigate('/')
        return
      }

      try {
        // First check if user is authenticated
        if (!session?.user) {
          // Store token in localStorage to use it after authentication
          localStorage.setItem('pendingInvitationToken', token)
          navigate('/signin')
          return
        }

        console.log('Accepting invitation with token:', token)

        // Get invitation details
        const { data: invitation, error: invitationError } = await supabase
          .from('workspace_invitations')
          .select('*')
          .eq('token', token)
          .single()

        if (invitationError || !invitation) {
          console.error('Error fetching invitation:', invitationError)
          throw new Error('Invalid or expired invitation')
        }

        if (invitation.status !== 'pending') {
          throw new Error('This invitation has already been used or expired')
        }

        // Add user to workspace
        const { error: memberError } = await supabase
          .from('workspace_members')
          .insert({
            workspace_id: invitation.workspace_id,
            user_id: session.user.id,
            role: invitation.role
          })

        if (memberError) {
          console.error('Error adding member:', memberError)
          throw memberError
        }

        // Update invitation status
        const { error: updateError } = await supabase
          .from('workspace_invitations')
          .update({ status: 'accepted' })
          .eq('id', invitation.id)

        if (updateError) {
          console.error('Error updating invitation:', updateError)
          throw updateError
        }

        toast({
          title: "Welcome!",
          description: "You've successfully joined the workspace."
        })

        // Redirect to dashboard
        navigate('/dashboard')

      } catch (error: any) {
        console.error('Error accepting invitation:', error)
        toast({
          variant: "destructive",
          title: "Error accepting invitation",
          description: error.message || "Please try again or contact support"
        })
        navigate('/')
      } finally {
        setIsProcessing(false)
      }
    }

    acceptInvitation()
  }, [token, navigate, toast, session])

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-medium">Processing invitation...</h2>
          <p className="text-muted-foreground">Please wait while we add you to the workspace.</p>
        </div>
      </div>
    )
  }

  return null
}

export default AcceptInvitation