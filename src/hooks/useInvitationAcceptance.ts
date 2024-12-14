import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "@supabase/auth-helpers-react"

export const useInvitationAcceptance = (token: string | null) => {
  const [isProcessing, setIsProcessing] = useState(true)
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
      return null
    }

    try {
      console.log('useInvitationAcceptance: Checking invitation with token:', token)
      
      const { data: invitation, error: invitationError } = await supabase
        .from('workspace_invitations')
        .select('*')
        .eq('token', token)
        .eq('is_pending', true)
        .single()

      if (invitationError) {
        console.error('useInvitationAcceptance: Error fetching invitation:', invitationError)
        throw new Error('Invalid invitation')
      }

      if (!invitation) {
        console.error('useInvitationAcceptance: No invitation found')
        throw new Error('Invalid invitation')
      }

      console.log('useInvitationAcceptance: Found invitation:', invitation)

      // Check if invitation has expired
      const expiresAt = new Date(invitation.expires_at)
      if (expiresAt < new Date()) {
        console.error('useInvitationAcceptance: Invitation expired at:', expiresAt)
        throw new Error('This invitation has expired')
      }

      return invitation
    } catch (error: any) {
      console.error('useInvitationAcceptance: Error:', error)
      toast({
        variant: "destructive",
        title: "Invalid invitation",
        description: error.message || "Please check your invitation link and try again"
      })
      return null
    }
  }

  const checkUserRegistration = async (email: string) => {
    console.log('useInvitationAcceptance: Checking if user exists:', email)
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      console.error('useInvitationAcceptance: Error checking user registration:', error)
    }
    
    return !!data && !error
  }

  const handleExistingUser = async (invitation: any) => {
    try {
      if (!session?.user?.id) {
        throw new Error('No authenticated user found')
      }

      console.log('handleExistingUser: Processing invitation for user:', session.user.id)

      // First delete the invitation to prevent race conditions
      const { error: deleteError } = await supabase
        .from('workspace_invitations')
        .delete()
        .eq('id', invitation.id)
        .eq('is_pending', true)

      if (deleteError) {
        console.error('Error deleting invitation:', deleteError)
        throw deleteError
      }

      console.log('handleExistingUser: Deleted invitation:', invitation.id)

      // Update user profile with invitation data
      const { error: profileError } = await supabase.rpc(
        'update_profile_from_invitation',
        { 
          _user_id: session.user.id,
          _invitation_id: invitation.id
        }
      )

      if (profileError) {
        console.error('Error updating profile:', profileError)
        throw profileError
      }

      console.log('handleExistingUser: Updated user profile')

      // Add user to workspace with invited role
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: invitation.workspace_id,
          user_id: session.user.id,
          role: invitation.role
        })

      if (memberError) {
        console.error('Error adding workspace member:', memberError)
        throw memberError
      }

      console.log('handleExistingUser: Added user to workspace')
      
      toast({
        title: "Success!",
        description: "You've successfully joined the workspace.",
      })
    } catch (error: any) {
      console.error('Error processing invitation:', error)
      toast({
        variant: "destructive",
        title: "Error accepting invitation",
        description: error.message || "Please try again or contact support"
      })
      throw error
    }
  }

  return {
    isProcessing,
    setIsProcessing,
    checkInvitation,
    handleExistingUser,
    checkUserRegistration
  }
}