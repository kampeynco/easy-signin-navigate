import { Settings, Moon, HelpCircle, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const profileMenuItems = [
  { icon: Settings, label: "Preferences", to: "#" },
  { icon: Moon, label: "Dark mode", to: "#" },
  { icon: HelpCircle, label: "Help", to: "#" },
]

export function UserMenu() {
  return (
    <div className="mt-auto border-t border-white/10 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>BR</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="font-medium">Brooklyn</div>
              <div className="text-sm opacity-70">Pro trial</div>
            </div>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" side="right">
          {profileMenuItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link to={item.to} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}