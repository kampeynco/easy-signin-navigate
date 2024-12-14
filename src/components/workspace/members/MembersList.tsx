import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberListItem } from "./MemberListItem"
import type { WorkspaceMember } from "@/types/workspace-member"

interface MembersListProps {
  members: WorkspaceMember[]
  onRoleChange: (memberId: string, currentRole: string) => void
  onRemove: (memberId: string, isPending: boolean, email: string) => void
  onResendInvite: (email: string) => void
}

export function MembersList({ members, onRoleChange, onRemove, onResendInvite }: MembersListProps) {
  const adminCount = members.filter(member => member.role === 'admin').length
  const isOnlyAdmin = adminCount === 1

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Manage your team members and their roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <MemberListItem
              key={member.id}
              member={member}
              isOnlyAdmin={isOnlyAdmin && member.role === 'admin'}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
              onResendInvite={onResendInvite}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}