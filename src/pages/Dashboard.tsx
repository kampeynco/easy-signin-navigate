import { Menu } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { TeamMemberCard } from "@/components/dashboard/TeamMemberCard"
import { GetStartedCard } from "@/components/dashboard/GetStartedCard"
import { VideoCard } from "@/components/dashboard/VideoCard"
import { IntegrationCard } from "@/components/dashboard/IntegrationCard"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"

const Dashboard = () => {
  const userName = "Lenox Ramsey Jr"

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardTopNav />
      
      <div className="flex-1 bg-[#f0f3fa]">
        {/* Header Section */}
        <div className="w-full bg-white border-b">
          <div className="container px-4 md:px-8 py-6">
            <DashboardHeader userName={userName} />
          </div>
        </div>

        {/* Main Content */}
        <main className="container px-4 md:px-8 py-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Task" current={0} max={1000} showGetMore />
            <StatCard title="Active Workflows" current={0} max={5} />
            <TeamMemberCard />
          </div>

          {/* Getting Started Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <GetStartedCard />
            <VideoCard />
          </div>

          {/* Integrations Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Integrations
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <IntegrationCard
                icon="/lovable-uploads/adb2244e-db69-4eaf-9458-a582f1297174.png"
                title="WordPress"
                buttonText="Install & Activate"
              />
              <IntegrationCard
                icon={Menu}
                title="Apps"
                buttonText="Connect your Apps"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard