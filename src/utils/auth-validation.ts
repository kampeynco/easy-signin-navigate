export const calculatePasswordStrength = (password: string): number => {
  let strength = 0
  
  // Basic length check
  if (password.length >= 8) strength += 20
  
  // Character type checks
  if (password.match(/[A-Z]/)) strength += 20
  if (password.match(/[0-9]/)) strength += 20
  if (password.match(/[^A-Za-z0-9]/)) strength += 20
  
  // Extra length bonus
  if (password.length >= 12) strength += 20
  
  return strength
}

export const validateEmail = (email: string): boolean => {
  // More comprehensive email validation than HTML5
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

export const isCommonPassword = (password: string): boolean => {
  const commonPasswords = [
    'password', 'password123', '123456', 'qwerty',
    'letmein', 'admin', 'welcome', 'monkey'
  ]
  return commonPasswords.includes(password.toLowerCase())
}