interface PasswordStrengthIndicatorProps {
  password: string
  strength: number
}

export const PasswordStrengthIndicator = ({ password, strength }: PasswordStrengthIndicatorProps) => {
  const getPasswordStrengthColor = (strength: number): string => {
    if (strength <= 20) return "bg-rose-500"
    if (strength <= 40) return "bg-red-500"
    if (strength <= 60) return "bg-amber-500"
    if (strength <= 80) return "bg-emerald-400"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number): string => {
    if (strength <= 20) return "Very Weak"
    if (strength <= 40) return "Weak"
    if (strength <= 60) return "Fair"
    if (strength <= 80) return "Strong"
    return "Very Strong"
  }

  return (
    <div className="space-y-2">
      <div className="w-full rounded-full overflow-hidden bg-secondary/20">
        <div 
          className={`h-2 transition-all ${getPasswordStrengthColor(strength)}`}
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Password strength: {getPasswordStrengthText(strength)}
      </p>
      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
        <li className={password.length >= 8 ? "text-emerald-500" : ""}>
          At least 8 characters
        </li>
        <li className={password.match(/[A-Z]/) ? "text-emerald-500" : ""}>
          At least one uppercase letter
        </li>
        <li className={password.match(/[0-9]/) ? "text-emerald-500" : ""}>
          At least one number
        </li>
        <li className={password.match(/[^A-Za-z0-9]/) ? "text-emerald-500" : ""}>
          At least one special character
        </li>
      </ul>
    </div>
  )
}