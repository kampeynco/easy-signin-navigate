interface PasswordRequirementsProps {
  password: string
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  return (
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
  )
}