import { Settings, Users, HelpCircle, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface UserMenuItemsProps {
  onLogout: () => Promise<void>;
}

export const profileMenuItems = [
  { icon: Settings, label: "Profile Settings", to: "/profile/settings" },
  { icon: Users, label: "Manage Workspace", to: "/workspace/settings" },
  { icon: HelpCircle, label: "Get Help", to: "#" },
]

export function UserMenuItems({ onLogout }: UserMenuItemsProps) {
  const { toast } = useToast()

  const handleMenuItemClick = (label: string) => {
    if (label !== "Manage Workspace" && label !== "Profile Settings") {
      toast({
        title: "Navigation",
        description: `Navigating to ${label}...`,
      })
    }
  }

  return (
    <>
      {profileMenuItems.map((item) => (
        <DropdownMenuItem 
          key={item.label} 
          asChild
          onClick={() => handleMenuItemClick(item.label)}
        >
          <Link to={item.to} className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem 
        onClick={onLogout}
        className="flex items-center gap-2 text-destructive hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign out</span>
      </DropdownMenuItem>
    </>
  )
}