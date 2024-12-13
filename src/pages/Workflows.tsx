import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav"
import { CreateWorkflowDialog } from "@/components/workflow/CreateWorkflowDialog"
import { WorkflowsTable } from "@/components/workflow/WorkflowsTable"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const Workflows = () => {
  return (
    <div className="flex-1 relative">
      <DashboardTopNav />
      <div className="p-8 pt-24 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Workflows</h1>
          <CreateWorkflowDialog>
            <Button className="bg-[#2B4079] hover:bg-[#1e2d54] text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </CreateWorkflowDialog>
        </div>

        <WorkflowsTable />
      </div>
    </div>
  )
}

export default Workflows