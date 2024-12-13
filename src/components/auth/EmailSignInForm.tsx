import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"

interface EmailSignInFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading?: boolean
}

export const EmailSignInForm = ({ onSubmit, isLoading }: EmailSignInFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email.trim(), password.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          required
          className="w-full"
        />
      </div>
      
      <PasswordInput
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        disabled={isLoading}
      />
      
      <div className="text-right">
        <Link 
          to="/reset-password" 
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}