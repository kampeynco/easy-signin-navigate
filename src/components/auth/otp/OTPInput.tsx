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
  console.log('OTPInput: Rendering with value:', value);
  
  return (
    <div className="flex justify-center">
      <InputOTP
        value={value}
        onChange={onChange}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots?.map((slot, index) => (
              <InputOTPSlot 
                key={index} 
                {...slot}
                className={cn(
                  "w-10 h-10 text-center border-2",
                  isError && "border-destructive focus:ring-destructive"
                )}
              />
            )) || 
            Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot 
                key={index}
                index={index}
                className={cn(
                  "w-10 h-10 text-center border-2",
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