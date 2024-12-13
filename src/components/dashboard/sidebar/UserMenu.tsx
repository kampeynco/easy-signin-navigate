import { ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { UserAvatar } from "./user-menu/UserAvatar"
import { UserMenuItems } from "./user-menu/UserMenuItems"
import { useUserProfile } from "./user-menu/useUserProfile"

export function UserMenu() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const userProfile = useUserProfile()

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

  if (!userProfile) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
          <UserAvatar 
            firstName={userProfile.firstName} 
            lastName={userProfile.lastName} 
          />
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
        <UserMenuItems onLogout={handleLogout} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}