export const getRedirectUrl = () => {
  // Remove any trailing slashes and ensure clean URL format
  const baseUrl = window.location.origin.replace(/\/$/, '');
  console.log("Base URL:", baseUrl);
  
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
};