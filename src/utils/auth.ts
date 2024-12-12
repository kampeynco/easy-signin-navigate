export const getRedirectUrl = () => {
  // Remove any trailing slashes, colons, and ensure clean URL format
  const baseUrl = window.location.origin
    .replace(/\/$/, '')  // Remove trailing slash
    .replace(/:\/?$/, ''); // Remove trailing colon
  
  console.log("Base URL:", baseUrl);
  
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
};