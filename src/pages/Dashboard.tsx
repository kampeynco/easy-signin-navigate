import { Menu } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { TeamMemberCard } from "@/components/dashboard/TeamMemberCard"
import { GetStartedCard } from "@/components/dashboard/GetStartedCard"
import { VideoCard } from "@/components/dashboard/VideoCard"
import { IntegrationCard } from "@/components/dashboard/IntegrationCard"

const Dashboard = () => {
  const userName = "Lenox Ramsey Jr"

  return (
    <div className="p-8 space-y-8">
      <DashboardHeader userName={userName} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Task" current={0} max={1000} showGetMore />
        <StatCard title="Active Workflows" current={0} max={5} />
        <TeamMemberCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GetStartedCard />
        <VideoCard />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Integrations</h2>
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
    </div>
  )
}

export default Dashboard