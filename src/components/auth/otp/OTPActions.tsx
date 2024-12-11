import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface OTPActionsProps {
  onVerify: () => void;
  onResend: () => void;
  isVerifying: boolean;
  isValid: boolean;
}

export const OTPActions = ({ 
  onVerify, 
  onResend, 
  isVerifying, 
  isValid 
}: OTPActionsProps) => {
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    console.log('OTPActions: Timer started, can resend:', canResend);
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleResend = () => {
    console.log('OTPActions: Resending code');
    onResend()
    setResendTimer(60)
    setCanResend(false)
  }

  return (
    <div className="flex flex-col space-y-2">
      <Button 
        onClick={onVerify} 
        disabled={isVerifying || !isValid}
        className="w-full"
      >
        {isVerifying ? "Verifying..." : "Verify Email"}
      </Button>
      <Button
        variant="outline"
        onClick={handleResend}
        disabled={isVerifying || !canResend}
        className="w-full"
      >
        {canResend 
          ? "Resend Code" 
          : `Resend code in ${resendTimer}s`
        }
      </Button>
    </div>
  )
}