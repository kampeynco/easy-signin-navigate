import {
  History,
  Home,
  Link2,
  BookOpen,
  FolderClosed,
  AppWindow,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const menuItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Link2, label: "Workflows", to: "/workflows" },
  { icon: FolderClosed, label: "Folders", to: "/folders" },
  { icon: History, label: "History", to: "/history" },
  { icon: AppWindow, label: "Apps", to: "/apps" },
  { icon: BookOpen, label: "Recipes", to: "/recipes" },
]

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Demleads's Team</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}