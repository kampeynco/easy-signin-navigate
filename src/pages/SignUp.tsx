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
import { AuthOptions } from "@/components/auth/AuthOptions"
import { SignUpForm } from "@/components/auth/SignUpForm"

const SignUp = () => {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleGoogleSignUp = async () => {
    try {
      console.log("Starting Google sign up process...")
      
      // Get the current domain and construct the redirect URL
      const redirectUrl = `${window.location.origin}/auth/callback`
      console.log("Using redirect URL:", redirectUrl)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      
      if (error) {
        console.error("Google sign up error:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        })
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during sign up"
      })
    }
  }

  const handleEmailSignUp = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback` // Changed from redirectTo to emailRedirectTo
        }
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Account created successfully"
      })
      
      // The redirect will be handled by the callback
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
          {!showEmailForm ? (
            <AuthOptions 
              onGoogleClick={handleGoogleSignUp}
              onEmailClick={() => setShowEmailForm(true)}
            />
          ) : (
            <SignUpForm
              onBack={() => setShowEmailForm(false)}
              onSubmit={handleEmailSignUp}
              isLoading={isLoading}
            />
          )}
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