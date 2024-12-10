export const getRedirectUrl = () => {
  // Get the full origin (protocol + hostname + port)
  const baseUrl = window.location.origin;
  console.log("Full window.location:", {
    origin: window.location.origin,
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port
  });
  console.log("Base URL:", baseUrl);
  
  // Construct the redirect URL
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
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