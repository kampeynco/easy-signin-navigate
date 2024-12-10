export const getRedirectUrl = () => {
  // Remove any trailing slashes and ensure proper URL formatting
  const origin = window.location.origin.replace(/:\/$/, '').replace(/:$/, '');
  return `${origin}/auth/callback`;
};

export const handleGoogleAuth = async (supabase: any) => {
  try {
    console.log("Starting Google auth process...");
    const redirectUrl = getRedirectUrl();
    console.log("Using redirect URL:", redirectUrl);
    
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
    
    return { data, error };
  } catch (error) {
    console.error("Unexpected error during Google auth:", error);
    return { data: null, error };
  }
};

export const handleEmailSignUp = async (supabase: any, email: string, password: string) => {
  try {
    const redirectUrl = getRedirectUrl();
    console.log("Email signup using redirect URL:", redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    return { data, error };
  } catch (error) {
    console.error("Sign up error:", error);
    return { data: null, error };
  }
};