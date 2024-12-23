import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { WorkspaceMember } from "@/types/workspace-member"

interface MemberListItemProps {
  member: WorkspaceMember
  isOnlyAdmin: boolean
  onRoleChange: (memberId: string, currentRole: string) => void
  onRemove: (memberId: string, isPending: boolean, email: string) => void
  onResendInvite?: (email: string) => void
}

export function MemberListItem({ 
  member, 
  isOnlyAdmin, 
  onRoleChange, 
  onRemove,
  onResendInvite
}: MemberListItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>
            {member.status === 'pending' ? '?' : `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {member.status === 'pending' ? member.email : `${member.first_name} ${member.last_name}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {member.status === 'pending' ? 'Invitation sent' : member.email}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {member.status === 'pending' ? (
            <Badge variant="secondary">Pending</Badge>
          ) : (
            <span className="text-sm text-muted-foreground">
              {member.role}
            </span>
          )}
        </div>
        {!isOnlyAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {member.status !== 'pending' && (
                <DropdownMenuItem 
                  onClick={() => onRoleChange(member.id, member.role)}
                >
                  Change Role
                </DropdownMenuItem>
              )}
              {member.status === 'pending' && onResendInvite && (
                <DropdownMenuItem 
                  onClick={() => onResendInvite(member.email)}
                >
                  Resend Invitation
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={() => onRemove(member.id, member.status === 'pending', member.email)}
                className="text-destructive"
              >
                {member.status === 'pending' ? 'Cancel Invitation' : 'Remove Member'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}