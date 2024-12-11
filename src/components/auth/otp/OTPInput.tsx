import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const OTPInput = ({ value, onChange }: OTPInputProps) => {
  return (
    <div className="flex justify-center">
      <InputOTP
        value={value}
        onChange={onChange}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots.map((slot, idx) => (
              <InputOTPSlot key={idx} {...slot} index={idx} />
            ))}
          </InputOTPGroup>
        )}
      />
    </div>
  )
}