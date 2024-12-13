import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { WorkspaceMember } from "@/types/workspace-member"

interface MemberListItemProps {
  member: WorkspaceMember
  isOnlyAdmin: boolean
  onRoleChange: (memberId: string, currentRole: string) => void
  onRemove: (memberId: string) => void
}

export function MemberListItem({ 
  member, 
  isOnlyAdmin, 
  onRoleChange, 
  onRemove 
}: MemberListItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>
            {`${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {member.first_name} {member.last_name}
          </p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          {member.role}
        </span>
        {!isOnlyAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onRoleChange(member.id, member.role)}
              >
                Change Role
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onRemove(member.id)}
                className="text-destructive"
              >
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}