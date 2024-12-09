import { Settings, Users, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const profileMenuItems = [
  { icon: Users, label: "Profile Settings", to: "#" },
  { icon: Settings, label: "Manage Workspace", to: "#" },
  { icon: HelpCircle, label: "Get Help", to: "#" },
]

export function UserMenu() {
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
          <DropdownMenuItem key={item.label} asChild>
            <Link to={item.to} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="#" className="flex items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}