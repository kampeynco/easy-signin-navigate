import { Link, useLocation } from "react-router-dom"
import {
  LayoutGrid,
  PlayCircle,
  History,
  AppWindow,
  BookOpen,
} from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const topMenuItems = [
  { icon: LayoutGrid, label: "Dashboard", to: "/dashboard" },
  { icon: PlayCircle, label: "Workflows", to: "/workflows" },
  { icon: History, label: "History", to: "#" },
]

const bottomMenuItems = [
  { icon: AppWindow, label: "Apps", to: "#" },
  { icon: BookOpen, label: "Recipes", to: "#" },
]

export function NavigationMenu() {
  const { toast } = useToast()
  const location = useLocation()

  const handleNavigation = (label: string) => {
    if (location.pathname !== "/dashboard") {
      toast({
        title: "Navigation",
        description: `Navigating to ${label}...`,
      })
    }
  }

  return (
    <SidebarMenu>
      {topMenuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            className="hover:bg-white/10 data-[active=true]:bg-white/10 hover:text-white"
          >
            <Link 
              to={item.to}
              onClick={() => handleNavigation(item.label)}
            >
              <item.icon className="h-5 w-5 opacity-70" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      
      <Separator className="my-4 bg-white/10" />
      
      {bottomMenuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            className="hover:bg-white/10 data-[active=true]:bg-white/10 hover:text-white"
          >
            <Link 
              to={item.to}
              onClick={() => handleNavigation(item.label)}
            >
              <item.icon className="h-5 w-5 opacity-70" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}