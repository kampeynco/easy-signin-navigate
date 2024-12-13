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
import { EmailSignInForm } from "@/components/auth/EmailSignInForm"

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleEmailSignIn = async (email: string, password: string) => {
    console.log('SignIn: Starting signin process for email:', email)
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password"
      })
      return
    }

    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      console.log('SignIn: Auth response:', { data, error })

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          console.log('SignIn: Email not confirmed, redirecting to verification page')
          navigate('/verify-email', { 
            state: { email },
            replace: true 
          })
          return
        }

        // Handle invalid credentials specifically
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Please check your email and password')
        }

        throw error
      }

      if (!data.session) {
        console.error('SignIn: No session in response')
        throw new Error('Failed to create session')
      }

      console.log('SignIn: Successfully signed in user:', data.session.user.email)
      
      toast({
        title: "Success",
        description: "Signed in successfully"
      })
      
      navigate('/dashboard')
    } catch (error: any) {
      console.error("Sign in error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EmailSignInForm
            onSubmit={handleEmailSignIn}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn