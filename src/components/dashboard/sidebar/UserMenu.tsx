import { Settings, Users, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

const profileMenuItems = [
  { icon: Settings, label: "Profile Settings", to: "#" },
  { icon: Users, label: "Manage Workspace", to: "#" },
  { icon: HelpCircle, label: "Get Help", to: "#" },
]

export function UserMenu() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
    navigate('/signin')
  }

  const handleMenuItemClick = (label: string) => {
    toast({
      title: "Navigation",
      description: `Navigating to ${label}...`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium">Brooklyn</div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Brooklyn Simmons</p>
            <p className="text-xs leading-none text-muted-foreground">
              brooklyn@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
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
          asChild
          onClick={handleLogout}
        >
          <Link to="#" className="flex items-center gap-2 text-destructive hover:text-white">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}