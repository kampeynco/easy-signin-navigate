import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@supabase/auth-helpers-react"
import { InvitationLoadingState } from "@/components/invitation/InvitationLoadingState"
import { useInvitationAcceptance } from "@/hooks/useInvitationAcceptance"

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const session = useSession()
  
  const {
    isProcessing,
    setIsProcessing,
    checkInvitation,
    handleExistingUser,
    checkUserRegistration
  } = useInvitationAcceptance(token)

  useEffect(() => {
    const processInvitation = async () => {
      console.log('AcceptInvitation: Starting invitation process')
      const invitation = await checkInvitation()
      if (!invitation) return

      // If user is logged in but not the invited user, redirect to dashboard
      if (session?.user && session.user.email !== invitation.email) {
        console.log('AcceptInvitation: User is not invitee, redirecting to dashboard')
        window.location.href = '/dashboard'
        return
      }

      // If user is not logged in
      if (!session?.user) {
        console.log('AcceptInvitation: User not authenticated, checking registration')
        const isRegistered = await checkUserRegistration(invitation.email)
        
        // Store token for after authentication
        localStorage.setItem('pendingInvitationToken', token!)
        
        if (isRegistered) {
          console.log('AcceptInvitation: User has account, redirecting to signin')
          window.location.href = `/signin?invitation=${token}`
        } else {
          console.log('AcceptInvitation: User needs to register, redirecting to signup')
          window.location.href = `/signup?invitation=${token}`
        }
        return
      }

      // If user is logged in and is the invited user
      if (session.user.email === invitation.email) {
        console.log('AcceptInvitation: Processing invitation for authenticated user')
        await handleExistingUser(invitation)
      }

      setIsProcessing(false)
    }

    processInvitation()
  }, [token, session])

  if (isProcessing) {
    return <InvitationLoadingState />
  }

  return null
}

export default AcceptInvitation