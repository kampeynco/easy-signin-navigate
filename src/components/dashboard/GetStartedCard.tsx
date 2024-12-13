import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreateWorkflowDialog } from "@/components/workflow/CreateWorkflowDialog"
import { PlusCircle } from "lucide-react"

export const GetStartedCard = () => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Let's Get Started!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Easiest way to automate your repeating tasks. We bring together your
          favorite apps and tools into one place, so you can finish more work in
          less time.
        </p>
        <CreateWorkflowDialog>
          <Button className="bg-[#2B4079] hover:bg-[#1e2d54] text-white text-sm h-9">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </CreateWorkflowDialog>
      </CardContent>
    </Card>
  )
}