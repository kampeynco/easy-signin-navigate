import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { WorkspaceGeneralSettings } from "@/components/workspace/WorkspaceGeneralSettings"
import { WorkspaceMembers } from "@/components/workspace/WorkspaceMembers"

const WorkspaceSettings = () => {
  return (
    <div className="flex-1 relative">
      <DashboardTopNav />
      <div className="p-8 pt-24 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Workspace Settings</h1>
          <p className="text-muted-foreground">Manage your workspace settings and team members.</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <WorkspaceGeneralSettings />
          </TabsContent>
          
          <TabsContent value="members" className="space-y-6">
            <WorkspaceMembers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default WorkspaceSettings