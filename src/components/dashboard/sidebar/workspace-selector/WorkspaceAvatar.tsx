import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface WorkspaceAvatarProps {
  name: string
  className?: string
}

export function WorkspaceAvatar({ name, className = "h-6 w-6" }: WorkspaceAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback className="bg-[#F1F0FB] text-[#403E43]">
        {name?.charAt(0) || 'W'}
      </AvatarFallback>
    </Avatar>
  )
}