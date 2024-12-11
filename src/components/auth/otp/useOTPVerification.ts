import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export const useOTPVerification = (email: string, onVerificationComplete?: () => void) => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()

  const handleVerify = async () => {
    if (otp.length !== 6) {
      console.log('useOTPVerification: Invalid OTP length')
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
      console.log('useOTPVerification: Verifying OTP for email:', email)
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      })

      if (error) {
        console.error('useOTPVerification: Verification error:', error)
        setIsError(true)
        throw error
      }

      console.log('useOTPVerification: Verification successful')
      toast({
        title: "Success",
        description: "Your email has been verified successfully.",
      })
      
      if (onVerificationComplete) {
        onVerificationComplete()
      }
    } catch (error: any) {
      console.error('useOTPVerification: Error:', error)
      setIsError(true)
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "The verification code is invalid or has expired.",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    try {
      console.log('useOTPVerification: Resending OTP to:', email)
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        console.error('useOTPVerification: Resend error:', error)
        throw error
      }

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      })
      setOtp("")
      setIsError(false)
    } catch (error: any) {
      console.error('useOTPVerification: Resend error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend verification code.",
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