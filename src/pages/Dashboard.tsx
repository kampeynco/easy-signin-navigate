import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, PlayCircle, Menu } from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const userName = "Lenox Ramsey Jr"

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Good Afternoon, {userName}!</h1>
        <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54] text-white">
          <Link to="/create-workflow">Create Workflow</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Task</CardTitle>
            <Button variant="link" className="text-blue-600 h-auto p-0">
              Get more Tasks
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-4xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">out of 1,000</div>
              </div>
              <div className="ml-auto text-3xl font-semibold text-muted-foreground">
                0%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-4xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">out of 5</div>
              </div>
              <div className="ml-auto text-3xl font-semibold text-muted-foreground">
                0%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[72px]">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Let's Get Started!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-6">
              Easiest way to automate your repeating tasks. We bring together your favorite apps and tools into one place, so you can finish more work in less time.
            </p>
            <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54] text-white">
              <Link to="/create-workflow">Create Workflow</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Getting Started Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-[#8B5CF6] rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-80" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Integrations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-10 h-10">
                <img 
                  src="/lovable-uploads/adb2244e-db69-4eaf-9458-a582f1297174.png" 
                  alt="WordPress Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">WordPress</h3>
              </div>
              <Button variant="outline" size="lg">Install & Activate</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                <Menu className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Apps</h3>
              </div>
              <Button variant="outline" size="lg">Connect your Apps</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard