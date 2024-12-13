import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberListItem } from "./MemberListItem"
import type { WorkspaceMember } from "@/types/workspace-member"

interface MembersListProps {
  members: WorkspaceMember[]
  onRoleChange: (memberId: string, currentRole: string) => void
  onRemove: (memberId: string) => void
}

export function MembersList({ members, onRoleChange, onRemove }: MembersListProps) {
  const isOnlyAdmin = members.length === 1 && members[0]?.role === 'admin'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Invite and manage your team members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <MemberListItem
              key={member.id}
              member={member}
              isOnlyAdmin={isOnlyAdmin}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}