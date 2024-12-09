import { Link } from "react-router-dom"
import {
  LayoutGrid,
  FolderClosed,
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

const topMenuItems = [
  { icon: LayoutGrid, label: "Dashboard", to: "/dashboard" },
  { icon: PlayCircle, label: "Workflows", to: "#" },
  { icon: FolderClosed, label: "Folders", to: "#" },
]

const bottomMenuItems = [
  { icon: History, label: "History", to: "#" },
  { icon: AppWindow, label: "Apps", to: "#" },
  { icon: BookOpen, label: "Recipes", to: "#" },
]

export function NavigationMenu() {
  return (
    <SidebarMenu>
      {topMenuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            asChild
            className="hover:bg-white/10 data-[active=true]:bg-white/10 hover:text-white"
          >
            <Link to={item.to}>
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
            <Link to={item.to}>
              <item.icon className="h-5 w-5 opacity-70" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}