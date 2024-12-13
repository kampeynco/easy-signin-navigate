import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { StatCard } from "@/components/dashboard/StatCard"
import { VideoCard } from "@/components/dashboard/VideoCard"
import { IntegrationCard } from "@/components/dashboard/IntegrationCard"
import { useSession } from "@supabase/auth-helpers-react"
import { Mail } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"

const Dashboard = () => {
  const session = useSession()
  const userName = session?.user?.email?.split('@')[0] || 'User'

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 relative">
          <DashboardTopNav />
          <div className="p-8 pt-24 space-y-8">
            <DashboardHeader userName={userName} />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard title="Tasks" current={0} max={1000} showGetMore />
              <StatCard title="Active Workflows" current={0} max={5} />
              <StatCard title="Team Members" current={1} max={5} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <VideoCard />
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <div className="space-y-2">
                  <IntegrationCard
                    icon={Mail}
                    title="Email Integration"
                    buttonText="Connect"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard