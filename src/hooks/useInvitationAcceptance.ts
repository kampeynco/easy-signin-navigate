import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "@supabase/auth-helpers-react"

export const useInvitationAcceptance = (token: string | null) => {
  const [isProcessing, setIsProcessing] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()
  const session = useSession()

  const checkInvitation = async () => {
    if (!token) {
      console.error('useInvitationAcceptance: No token provided')
      toast({
        variant: "destructive",
        title: "Invalid invitation",
        description: "No invitation token provided"
      })
      navigate('/')
      return
    }

    try {
      // Get invitation details
      const { data: invitation, error: invitationError } = await supabase
        .from('workspace_invitations')
        .select('*')
        .eq('token', token)
        .single()

      if (invitationError || !invitation) {
        console.error('useInvitationAcceptance: Error fetching invitation:', invitationError)
        throw new Error('Invalid or expired invitation')
      }

      if (invitation.status !== 'pending') {
        console.error('useInvitationAcceptance: Invitation is not pending')
        throw new Error('This invitation has already been used or expired')
      }

      return invitation
    } catch (error: any) {
      console.error('useInvitationAcceptance: Error checking invitation:', error)
      toast({
        variant: "destructive",
        title: "Error checking invitation",
        description: error.message || "Please try again or contact support"
      })
      navigate('/')
      return null
    }
  }

  const handleExistingUser = async (invitation: any) => {
    try {
      // Update user profile with invitation data
      const { error: profileError } = await supabase.rpc(
        'update_profile_from_invitation',
        { 
          _user_id: session?.user.id,
          _invitation_id: invitation.id
        }
      )

      if (profileError) {
        console.error('useInvitationAcceptance: Error updating profile:', profileError)
        throw profileError
      }

      // Add user to workspace
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: invitation.workspace_id,
          user_id: session?.user.id,
          role: invitation.role
        })

      if (memberError) {
        console.error('useInvitationAcceptance: Error adding member:', memberError)
        throw memberError
      }

      // Update invitation status
      const { error: updateError } = await supabase
        .from('workspace_invitations')
        .update({ status: 'accepted' })
        .eq('id', invitation.id)

      if (updateError) {
        console.error('useInvitationAcceptance: Error updating invitation:', updateError)
        throw updateError
      }

      console.log('useInvitationAcceptance: Successfully processed invitation')
      
      toast({
        title: "Welcome!",
        description: "You've successfully joined the workspace."
      })

      navigate('/dashboard')
    } catch (error: any) {
      console.error('useInvitationAcceptance: Error processing invitation:', error)
      toast({
        variant: "destructive",
        title: "Error accepting invitation",
        description: error.message || "Please try again or contact support"
      })
      navigate('/')
    }
  }

  const checkUserRegistration = async (email: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single()
    
    return !!data && !error
  }

  return {
    isProcessing,
    setIsProcessing,
    checkInvitation,
    handleExistingUser,
    checkUserRegistration
  }
}