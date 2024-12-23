import { ChevronDown } from "lucide-react"
import { WorkspaceAvatar } from "./WorkspaceAvatar"

interface WorkspaceSelectorButtonProps {
  workspaceName?: string
  isLoading?: boolean
  error?: Error | null
}

export function WorkspaceSelectorButton({ workspaceName, isLoading, error }: WorkspaceSelectorButtonProps) {
  if (isLoading) {
    return (
      <button disabled className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading workspaces...</span>
      </button>
    )
  }

  if (error) {
    return (
      <button disabled className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 text-red-500">
        <span className="flex-1 text-left text-sm">Error loading workspaces</span>
      </button>
    )
  }

  return (
    <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
      <WorkspaceAvatar name={workspaceName || ''} />
      <span className="flex-1 text-left text-sm">
        {workspaceName || 'Select workspace'}
      </span>
      <ChevronDown className="h-4 w-4 opacity-70" />
    </button>
  )
}