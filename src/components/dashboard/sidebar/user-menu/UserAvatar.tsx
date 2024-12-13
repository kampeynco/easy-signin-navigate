import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  firstName: string;
  lastName: string;
}

export function UserAvatar({ firstName, lastName }: UserAvatarProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/placeholder.svg" />
      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
        {getInitials(firstName || '', lastName || '')}
      </AvatarFallback>
    </Avatar>
  )
}