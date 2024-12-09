import { Globe } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { WorkspaceSelector } from "./dashboard/sidebar/WorkspaceSelector"
import { NavigationMenu } from "./dashboard/sidebar/NavigationMenu"
import { UsageCard } from "./dashboard/sidebar/UsageCard"

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0 overflow-hidden">
      <SidebarHeader className="flex flex-col gap-4 border-b border-white/10 p-4">
        {/* App Branding */}
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="font-semibold">Pointsale</span>
        </div>

        <WorkspaceSelector />
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu />
            <div className="h-16" />
            <UsageCard />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}