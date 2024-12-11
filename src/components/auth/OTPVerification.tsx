import { useEffect } from "react"
import { useLocation, Navigate, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OTPInput } from "./otp/OTPInput"
import { OTPActions } from "./otp/OTPActions"
import { useOTPVerification } from "./otp/useOTPVerification"
import { useToast } from "@/hooks/use-toast"

export const OTPVerification = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const email = location.state?.email

  useEffect(() => {
    console.log('OTPVerification: Component mounted')
    console.log('OTPVerification: Email from state:', email)
    
    if (!email) {
      console.log('OTPVerification: No email in state, will redirect to signup')
      toast({
        variant: "destructive",
        title: "Error",
        description: "No email found for verification. Please sign up again.",
      })
    }
  }, [email, toast])

  // If no email in state, redirect to signup
  if (!email) {
    console.log('OTPVerification: No email in state, redirecting to signup')
    return <Navigate to="/signup" replace />
  }

  const {
    otp,
    setOtp,
    isVerifying,
    isError,
    handleVerify,
    handleResend
  } = useOTPVerification(email, () => {
    console.log('OTPVerification: Verification complete, redirecting to onboarding')
    navigate('/onboarding', { replace: true })
    toast({
      title: "Success",
      description: "Your email has been verified. Let's set up your account.",
    })
  })

  console.log('OTPVerification: Rendering with OTP:', otp)

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <OTPInput 
            value={otp}
            onChange={setOtp}
            isError={isError}
          />
          <OTPActions
            onVerify={handleVerify}
            onResend={handleResend}
            isVerifying={isVerifying}
            isValid={otp.length === 6}
          />
        </CardContent>
      </Card>
    </div>
  )
}