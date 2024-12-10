import { Menu } from "lucide-react"
import { useSession } from '@supabase/auth-helpers-react'
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { TeamMemberCard } from "@/components/dashboard/TeamMemberCard"
import { GetStartedCard } from "@/components/dashboard/GetStartedCard"
import { VideoCard } from "@/components/dashboard/VideoCard"
import { IntegrationCard } from "@/components/dashboard/IntegrationCard"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

const Dashboard = () => {
  const { session } = useSession()
  
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!session?.user?.id,
  })

  const userName = profile?.username || session?.user?.email?.split('@')[0] || 'User'

  return (
    <main className="flex-1 bg-[#f0f3fa] pt-16">
      <DashboardTopNav />
      
      {/* Header Section */}
      <div className="w-full bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <DashboardHeader userName={userName} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Task" current={0} max={1000} showGetMore />
          <StatCard title="Active Workflows" current={0} max={5} />
          <TeamMemberCard />
        </div>

        {/* Getting Started Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <GetStartedCard />
          <VideoCard />
        </div>

        {/* Integrations Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Integrations
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
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
    </main>
  )
}

export default Dashboard