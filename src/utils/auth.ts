export const getRedirectUrl = () => {
  const origin = window.location.origin.replace(/\/$/, '');
  return `${origin}/auth/callback`;
};

export const handleGoogleAuth = async (supabase: any) => {
  try {
    console.log("Starting Google auth process...");
    const redirectUrl = getRedirectUrl();
    console.log("Using redirect URL:", redirectUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    
    return { error };
  } catch (error) {
    console.error("Unexpected error during Google auth:", error);
    return { error };
  }
};

export const handleEmailSignUp = async (supabase: any, email: string, password: string) => {
  try {
    const redirectUrl = getRedirectUrl();
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    return { error };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error };
  }
};