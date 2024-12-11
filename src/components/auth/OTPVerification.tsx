import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface OTPVerificationProps {
  email: string;
  onVerificationComplete?: () => void;
}

export const OTPVerification = ({ email, onVerificationComplete }: OTPVerificationProps) => {
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            value={otp}
            onChange={setOtp}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={handleVerify} 
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={isVerifying}
          >
            Resend Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}