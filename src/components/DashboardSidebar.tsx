import {
  History,
  Home,
  Link2,
  BookOpen,
  FolderClosed,
  AppWindow,
  ChevronDown,
  PanelLeftClose,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import { useSidebar } from "@/components/ui/sidebar"
import { MenuItem } from "@/components/ui/sidebar/types"

const menuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Link2, label: "Workflows", to: "/workflows" },
  { icon: FolderClosed, label: "Folders", to: "/folders" },
  { icon: History, label: "History", to: "/history" },
  { icon: AppWindow, label: "Apps", to: "/apps" },
  { icon: BookOpen, label: "Recipes", to: "/recipes" },
]

export function DashboardSidebar() {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar className="border-r-0">
      {/* Top Section - Workspace Menu */}
      <SidebarHeader className="border-b border-white/10 p-4">
        <button className="flex w-full items-center justify-between">
          <span className="font-semibold text-lg">Demleads's Team</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </SidebarHeader>

      {/* Middle Section - Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-white/10 data-[active=true]:bg-white/10"
                  >
                    <Link to={item.to}>
                      <item.icon className="h-5 w-5 opacity-70" />
                      <span className="text-base">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section - Plan Usage Card */}
        <div className="mt-auto px-4 py-6">
          <div className="rounded-lg bg-white/5 p-4">
            <h3 className="text-lg mb-4">Free (Legacy) Plan</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Task</span>
                  <span className="text-white/70">0 / 1,000</span>
                </div>
                <Progress value={0} className="h-1 bg-white/10" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Workflow</span>
                  <span className="text-white/70">0 / 5</span>
                </div>
                <Progress value={0} className="h-1 bg-white/10" />
              </div>

              <button className="w-full text-center text-white/70 hover:text-white transition-colors">
                See All Usage
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>

      {/* Footer - Collapse Button */}
      <SidebarFooter className="p-4 border-t border-white/10">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-full"
        >
          <PanelLeftClose className="h-5 w-5" />
          <span>Collapse Menu</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}