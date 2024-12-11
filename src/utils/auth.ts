export const getRedirectUrl = () => {
  const baseUrl = window.location.origin;
  console.log("Base URL:", baseUrl);
  
  const redirectUrl = `${baseUrl}/auth/callback`;
  console.log("Final redirect URL:", redirectUrl);
  
  return redirectUrl;
};