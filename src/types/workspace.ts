export interface Workspace {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  role?: string;
}

export interface WorkspaceMember {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: string;
}