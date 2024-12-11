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
        onClick={onResend}
        disabled={isVerifying}
      >
        Resend Code
      </Button>
    </div>
  )
}