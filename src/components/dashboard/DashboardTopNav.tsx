import { Bell, HelpCircle, Globe, BarChart3 } from "lucide-react"
import { UserMenu } from "./sidebar/UserMenu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function DashboardTopNav() {
  return (
    <header className="h-14 border-b bg-white flex items-center px-4">
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#2B4079]" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button variant="ghost" className="hidden md:flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Explore Integrations</span>
        </Button>

        <Button variant="ghost" className="hidden md:flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm">Usage</span>
        </Button>

        <Button variant="ghost" className="hidden md:inline-flex">
          Free (Legacy)
        </Button>

        <Separator orientation="vertical" className="mx-2 h-6" />
        
        <UserMenu />
      </div>
    </header>
  )
}