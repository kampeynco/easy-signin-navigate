import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    if (password.length >= 12) strength += 20;
    
    return strength;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength <= 20) return "bg-rose-500";
    if (strength <= 40) return "bg-red-500";
    if (strength <= 60) return "bg-amber-500";
    if (strength <= 80) return "bg-emerald-400";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (strength: number): string => {
    if (strength <= 20) return "Very Weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Fair";
    if (strength <= 80) return "Strong";
    return "Very Strong";
  };

  const handleGoogleSignUp = async () => {
    try {
      console.log("Starting Google sign up process...");
      let redirectUrl;
      if (window.location.hostname === 'localhost') {
        redirectUrl = `${window.location.protocol}//${window.location.hostname}:8080/auth/callback`;
      } else {
        // Remove any trailing slashes and don't add port for production
        const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
        redirectUrl = `${baseUrl}/auth/callback`;
      }
      console.log("Full redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      console.log("Auth response:", { data, error });
      
      if (error) {
        console.error("Google sign up error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during sign up"
      });
    }
  };

  const strength = calculatePasswordStrength(password);

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleSignUp}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
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
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm your password" />
          </div>
          <Button className="w-full">Sign Up</Button>
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
  );
};

export default SignUp;