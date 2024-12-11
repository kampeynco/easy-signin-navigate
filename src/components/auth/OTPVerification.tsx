import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const OTPVerification = () => {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const email = location.state?.email

  useEffect(() => {
    if (!email) {
      console.log('OTPVerification: No email in state, redirecting to signup')
      toast({
        variant: "destructive",
        title: "Error",
        description: "No email found for verification. Please sign up again.",
      })
      navigate('/signup', { replace: true })
    }
  }, [email, navigate, toast])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [resendTimer])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
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
        description: "Email verified successfully.",
      })
      navigate('/dashboard', { replace: true })
    } catch (error: any) {
      console.error('Verification error:', error)
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message || "Invalid verification code.",
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

      setResendTimer(60)
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend code.",
      })
    }
  }

  if (!email) return null

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '')
                if (value.length <= 6) {
                  setOtp(value)
                }
              }}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>
          <div className="space-y-2">
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying || otp.length !== 6}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="w-full"
            >
              {resendTimer > 0 
                ? `Resend code in ${resendTimer}s` 
                : "Resend Code"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}