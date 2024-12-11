import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export const useOTPVerification = (email: string, onVerificationComplete?: () => void) => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter all 6 digits of the verification code.",
      })
      return
    }

    setIsVerifying(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Your email has been verified successfully.",
      })
      
      if (onVerificationComplete) {
        onVerificationComplete()
      }
      
      navigate('/auth/callback')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) throw error

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  return {
    otp,
    setOtp,
    isVerifying,
    handleVerify,
    handleResend
  }
}