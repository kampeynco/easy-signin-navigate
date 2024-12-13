import type { WorkspaceMember } from "@/types/workspace-member"
import type { WorkspaceMemberResponse } from "@/types/workspace-queries"

export const transformWorkspaceMember = (
  member: WorkspaceMemberResponse
): WorkspaceMember => ({
  id: member.user_id,
  first_name: member.profiles?.first_name || '',
  last_name: member.profiles?.last_name || '',
  email: member.profiles?.email || '',
  role: member.role
})