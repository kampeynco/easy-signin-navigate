export const getRedirectUrl = () => {
  // Get the base URL
  const origin = window.location.origin;
  console.log("Original origin:", origin);
  
  // Clean the URL by removing any trailing slashes
  const baseUrl = origin.replace(/\/+$/, '');
  console.log("Cleaned base URL:", baseUrl);
  
  // Construct the final redirect URL
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
};