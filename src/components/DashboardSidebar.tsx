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
          <img 
            src="/lovable-uploads/b3bfeefb-4d63-4032-80a8-9e4200f651e7.png" 
            alt="Kampeyn Logo" 
            className="h-6 w-auto"
          />
          <span className="font-semibold">Kampeyn</span>
        </div>

        <WorkspaceSelector />
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-[calc(100vh-96px)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu />
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto">
          <UsageCard />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}