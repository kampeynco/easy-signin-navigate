import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator"
import { calculatePasswordStrength, validateEmail, isCommonPassword } from "@/utils/auth-validation"

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading: boolean
}

export const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset error
    setEmailError("")

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    // Check password
    if (isCommonPassword(password)) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Please choose a stronger password. This password is too common."
      })
      return
    }

    if (password === confirmPassword) {
      onSubmit(email, password)
    }
  }

  const strength = calculatePasswordStrength(password)
  const isValidPassword = strength >= 60 && !isCommonPassword(password)

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
            className={emailError ? "border-destructive" : ""}
          />
          {emailError && (
            <p className="text-sm text-destructive">{emailError}</p>
          )}
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
          disabled={isLoading || password !== confirmPassword || !isValidPassword}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </form>
  )
}