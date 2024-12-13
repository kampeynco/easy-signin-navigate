import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

interface WorkspaceTriggerProps {
  workspaceName?: string | null;
  isLoading?: boolean;
}

export function WorkspaceTrigger({ workspaceName, isLoading }: WorkspaceTriggerProps) {
  if (isLoading) {
    return (
      <button 
        disabled 
        className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2"
        type="button"
      >
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading workspaces...</span>
      </button>
    )
  }

  return (
    <button 
      className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10 transition-colors"
      type="button"
    >
      <Avatar className="h-6 w-6">
        <AvatarFallback>
          {workspaceName ? workspaceName.charAt(0).toUpperCase() : 'W'}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 text-left text-sm truncate">
        {workspaceName || 'Select workspace'}
      </span>
      <ChevronDown className="h-4 w-4 opacity-70 shrink-0" />
    </button>
  )
}