import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export const useOTPVerification = (email: string, onVerificationComplete?: () => void) => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isError, setIsError] = useState(false)
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
    setIsError(false)
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      })

      if (error) {
        setIsError(true)
        throw error
      }

      toast({
        title: "Success",
        description: "Your email has been verified successfully.",
      })
      
      if (onVerificationComplete) {
        onVerificationComplete()
      }
      
      navigate('/onboarding')
    } catch (error: any) {
      setIsError(true)
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "The verification code is invalid or has expired.",
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
      setOtp("")
      setIsError(false)
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
    isError,
    handleVerify,
    handleResend
  }
}