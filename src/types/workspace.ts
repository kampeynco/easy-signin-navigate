export interface Workspace {
  id: string;
  name: string;
  created_at: string;
  updated_at?: string;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: string;
}