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

interface OTPVerificationProps {
  email: string;
  onVerificationComplete?: () => void;
}

export const OTPVerification = ({ email, onVerificationComplete }: OTPVerificationProps) => {
  const {
    otp,
    setOtp,
    isVerifying,
    isError,
    handleVerify,
    handleResend
  } = useOTPVerification(email, onVerificationComplete)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
  )
}