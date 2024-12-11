import { Button } from "@/components/ui/button"

interface AuthOptionsProps {
  onEmailClick: () => void
}

export const AuthOptions = ({ onEmailClick }: AuthOptionsProps) => {
  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={onEmailClick}
    >
      Continue with email
    </Button>
  )
}