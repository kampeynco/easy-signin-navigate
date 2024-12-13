import type { WorkspaceMember } from "./workspace-member"

export type WorkspaceMemberQueryResult = {
  members: WorkspaceMember[]
  isLoading: boolean
  error: Error | null
}

export type WorkspaceMemberResponse = {
  user_id: string
  workspace_id: string
  role: string
  profiles?: {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
  } | null
}