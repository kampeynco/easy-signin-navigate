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
import { useEffect, useState } from "react"

const profileMenuItems = [
  { icon: Settings, label: "Profile Settings", to: "/profile/settings" },
  { icon: Users, label: "Manage Workspace", to: "/workspace/settings" },
  { icon: HelpCircle, label: "Get Help", to: "#" },
]

export function UserMenu() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setUserProfile({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: user.email || ""
      })
    }

    fetchUserProfile()
  }, [])

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

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
    if (label !== "Manage Workspace" && label !== "Profile Settings") {
      toast({
        title: "Navigation",
        description: `Navigating to ${label}...`,
      })
    }
  }

  if (!userProfile) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-white">
              {getInitials(userProfile.firstName, userProfile.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium">
              {userProfile.firstName} {userProfile.lastName}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userProfile.firstName} {userProfile.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userProfile.email}
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
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}