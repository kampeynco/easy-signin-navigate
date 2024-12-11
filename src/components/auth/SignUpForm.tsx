import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator"

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading: boolean
}

export const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.match(/[A-Z]/)) strength += 20
    if (password.match(/[0-9]/)) strength += 20
    if (password.match(/[^A-Za-z0-9]/)) strength += 20
    if (password.length >= 12) strength += 20
    return strength
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      onSubmit(email, password)
    }
  }

  const strength = calculatePasswordStrength(password)

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
        />

        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
        />

        {password && (
          <PasswordStrengthIndicator 
            password={password} 
            strength={strength} 
          />
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || password !== confirmPassword || strength < 60}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </div>
    </form>
  )
}