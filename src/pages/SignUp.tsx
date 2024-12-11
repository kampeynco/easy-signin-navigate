import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { SignUpForm } from "@/components/auth/SignUpForm"

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleEmailSignUp = async (email: string, password: string) => {
    setIsLoading(true)
    console.log('Starting signup process...')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: true
          }
        }
      })

      if (error) throw error

      // Redirect to verification page with email in state
      navigate('/verify-email', { state: { email } })
      
      toast({
        title: "Verification Required",
        description: "Please check your email for the verification code.",
      })
      
    } catch (error: any) {
      console.error("Sign up error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm
            onSubmit={handleEmailSignUp}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp