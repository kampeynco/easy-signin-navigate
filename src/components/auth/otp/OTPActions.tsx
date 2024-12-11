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
    onResend()
    setResendTimer(60)
    setCanResend(false)
  }

  return (
    <div className="flex flex-col space-y-2">
      <Button 
        onClick={onVerify} 
        disabled={isVerifying || !isValid}
      >
        {isVerifying ? "Verifying..." : "Verify Email"}
      </Button>
      <Button
        variant="ghost"
        onClick={handleResend}
        disabled={isVerifying || !canResend}
      >
        {canResend 
          ? "Resend Code" 
          : `Resend code in ${resendTimer}s`
        }
      </Button>
    </div>
  )
}