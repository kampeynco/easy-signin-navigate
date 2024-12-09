import {
  LayoutGrid,
  FolderClosed,
  PlayCircle,
  History,
  AppWindow,
  BookOpen,
  Settings,
  Moon,
  HelpCircle,
  ChevronDown,
  Zap,
  Plus,
  Globe,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

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

const profileMenuItems = [
  { icon: Settings, label: "Preferences", to: "#" },
  { icon: Moon, label: "Dark mode", to: "#" },
  { icon: HelpCircle, label: "Help", to: "#" },
]

const workspaces = [
  { name: "Personal", avatar: "P" },
  { name: "Acme Corp", avatar: "A" },
  { name: "Startup Inc", avatar: "S" },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="flex flex-col gap-4 border-b border-white/10 p-4">
        {/* App Branding */}
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="font-semibold">Pointsale</span>
        </div>

        {/* Workspace Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md bg-white/5 p-2 hover:bg-white/10">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <span className="flex-1 text-left text-sm">My Workspace</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.name} className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{workspace.avatar}</AvatarFallback>
                </Avatar>
                <span>{workspace.name}</span>
              </DropdownMenuItem>
            ))}
            <Separator className="my-2" />
            <DropdownMenuItem className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create New Workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-white/10 data-[active=true]:bg-white/10"
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
                    className="hover:bg-white/10 data-[active=true]:bg-white/10"
                  >
                    <Link to={item.to}>
                      <item.icon className="h-5 w-5 opacity-70" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="h-16" />

            <div className="mx-4 mb-8 rounded-lg bg-white/5 p-4">
              <div className="mb-4">
                <div className="text-sm font-medium">Starter Plan (Current Plan)</div>
              </div>
              <Separator className="mb-4 bg-white/10" />
              
              {/* Tasks Usage */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Tasks</span>
                  <span className="text-sm text-muted-foreground">(0 out of 1000)</span>
                </div>
                <Progress value={0} className="h-1 bg-white/10" />
              </div>

              {/* Workflows Usage */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Workflows</span>
                  <span className="text-sm text-muted-foreground">(0 out of 5)</span>
                </div>
                <Progress value={0} className="h-1 bg-white/10" />
              </div>

              <Button className="w-full justify-center gap-2" variant="secondary">
                <Zap className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

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
      </SidebarContent>
    </Sidebar>
  )
}
