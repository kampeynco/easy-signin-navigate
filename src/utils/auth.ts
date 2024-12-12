export const getRedirectUrl = () => {
  // Get the base URL and clean it
  const origin = window.location.origin;
  console.log("Original origin:", origin);
  
  // Clean the URL by removing any trailing slashes and malformed patterns
  const baseUrl = origin
    .replace(/\/+$/, '')     // Remove trailing slashes
    .replace(/:+\/$/, '')    // Remove trailing :/ pattern
    .replace(/:+$/, '');     // Remove any trailing colons
    
  console.log("Cleaned base URL:", baseUrl);
  
  // Construct the final redirect URL
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
};