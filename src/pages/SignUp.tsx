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
import { getRedirectUrl } from "@/utils/auth"

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleEmailSignUp = async (email: string, password: string) => {
    setIsLoading(true)
    console.log('SignUp: Starting signup process for email:', email)

    try {
      const redirectTo = getRedirectUrl()
      console.log('SignUp: Using redirect URL:', redirectTo)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            email_confirm: true
          }
        }
      })

      if (error) {
        console.error('SignUp: Supabase error:', error)
        throw error
      }

      console.log('SignUp: Signup response:', data)

      if (data?.user) {
        console.log('SignUp: User created successfully, navigating to verification')
        navigate('/verify-email', { 
          state: { email },
          replace: true 
        })
        
        toast({
          title: "Check your email",
          description: "We've sent you a verification code.",
        })
      } else {
        console.error('SignUp: No user data in response')
        throw new Error("Signup failed - no user returned")
      }
      
    } catch (error: any) {
      console.error("SignUp error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account"
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