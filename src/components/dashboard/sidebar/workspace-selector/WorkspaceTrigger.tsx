import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

interface WorkspaceTriggerProps {
  workspaceName: string;
  isLoading?: boolean;
}

export function WorkspaceTrigger({ workspaceName, isLoading }: WorkspaceTriggerProps) {
  if (isLoading) {
    return (
      <button disabled className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2">
        <div className="h-6 w-6 animate-pulse rounded-full bg-white/10" />
        <span className="flex-1 text-left text-sm">Loading workspaces...</span>
      </button>
    )
  }

  return (
    <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
      <Avatar className="h-6 w-6">
        <AvatarFallback>
          {workspaceName?.charAt(0) || 'W'}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 text-left text-sm">
        {workspaceName || 'Select workspace'}
      </span>
      <ChevronDown className="h-4 w-4 opacity-70" />
    </button>
  )
}