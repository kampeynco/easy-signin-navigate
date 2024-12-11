import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
}

export const OTPInput = ({ value, onChange, isError }: OTPInputProps) => {
  return (
    <div className="flex justify-center">
      <InputOTP
        value={value}
        onChange={onChange}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots.map((slot, idx) => (
              <InputOTPSlot 
                key={idx} 
                {...slot} 
                index={idx}
                className={cn(
                  isError && "border-destructive focus:ring-destructive"
                )}
              />
            ))}
          </InputOTPGroup>
        )}
      />
    </div>
  )
}