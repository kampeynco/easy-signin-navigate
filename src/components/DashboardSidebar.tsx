import {
  LayoutGrid,
  BarChart2,
  FileBarChart,
  FileText,
  Files,
  Building2,
  Trash2,
  Settings,
  Moon,
  HelpCircle,
  ChevronDown,
  Zap,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mainMenuItems = [
  { icon: LayoutGrid, label: "Dashboard", to: "/dashboard" },
  { icon: BarChart2, label: "Product analytics", to: "#" },
  { icon: FileBarChart, label: "Reporting", to: "#" },
  { icon: FileText, label: "Order summary", to: "#" },
  { icon: Files, label: "Invoices", to: "#" },
  { icon: Building2, label: "Manufactures", to: "#" },
  { icon: Trash2, label: "Trash", to: "#" },
]

const profileMenuItems = [
  { icon: Settings, label: "Preferences", to: "#" },
  { icon: Moon, label: "Dark mode", to: "#" },
  { icon: HelpCircle, label: "Help", to: "#" },
]

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0">
      {/* Top Section - Workspace Menu */}
      <SidebarHeader className="border-b border-white/10 p-4">
        <button className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <span className="font-semibold">Pointsale</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </button>
      </SidebarHeader>

      {/* Middle Section - Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Main Menu Items */}
            <SidebarMenu>
              {mainMenuItems.map((item) => (
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

            {/* Pro Trial Card */}
            <div className="mx-4 my-6 rounded-lg bg-white/5 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>PT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">Current plan:</div>
                  <div className="text-sm opacity-70">Pro trial</div>
                </div>
              </div>
              <p className="mb-4 text-sm opacity-70">
                Upgrade to Pro to get the latest and exclusive features
              </p>
              <Button className="w-full justify-center gap-2" variant="secondary">
                <Zap className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile with Dropdown */}
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