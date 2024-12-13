export interface Workflow {
  id: string
  name: string
  is_active: boolean
  created_at: string
  workspace_id: string
  description?: string
  updated_at?: string
  created_by: string
}