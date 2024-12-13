import { Link } from "react-router-dom"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useQuery } from "@tanstack/react-query"

export function UserMenu() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: userProfile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        throw error
      }

      return data
    },
    enabled: !!session?.user?.id,
  })

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) {
      return session?.user?.email?.charAt(0).toUpperCase() || 'U'
    }
    
    const firstInitial = firstName ? firstName.charAt(0) : ''
    const lastInitial = lastName ? lastName.charAt(0) : ''
    
    return (firstInitial + lastInitial).toUpperCase() || 'U'
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      navigate('/')
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      })
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!session) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {userProfile?.avatar_url && (
              <AvatarImage src={userProfile.avatar_url} alt="Profile" />
            )}
            <AvatarFallback className="bg-[#F1F0FB] text-[#403E43]">
              {getInitials(userProfile?.first_name, userProfile?.last_name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userProfile?.first_name 
                ? `${userProfile.first_name} ${userProfile.last_name || ''}`
                : session.user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile/settings" className="w-full cursor-pointer text-foreground hover:text-white focus:text-white">
            Profile Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/workspace/settings" className="w-full cursor-pointer text-foreground hover:text-white focus:text-white">
            Workspace Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 hover:text-red-500 focus:text-red-500" 
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}