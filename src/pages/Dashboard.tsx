import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { GetStartedCard } from "@/components/dashboard/GetStartedCard"
import { StatCard } from "@/components/dashboard/StatCard"
import { useSession } from "@supabase/auth-helpers-react"

const Dashboard = () => {
  const session = useSession()
  const userName = session?.user?.email?.split('@')[0] || 'User'

  return (
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
          <GetStartedCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard