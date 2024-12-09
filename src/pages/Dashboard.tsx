import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const userName = "Lenox Ramsey Jr"

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Good Afternoon, {userName}!</h1>
        <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54]">
          <Link to="/create-workflow">Create Workflow</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Task</CardTitle>
            <Button variant="link" className="text-sm text-blue-600 h-auto p-0">
              Get more Tasks
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">out of 1,000</div>
              </div>
              <div className="ml-auto text-2xl font-semibold text-muted-foreground">
                0%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">out of 5</div>
              </div>
              <div className="ml-auto text-2xl font-semibold text-muted-foreground">
                0%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[60px]">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">👤</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Let's Get Started!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Easiest way to automate your repeating tasks. We bring together your favorite apps and tools into one place, so you can finish more work in less time.
            </p>
            <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54]">
              <Link to="/create-workflow">Create Workflow</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-purple-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-80" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Integrations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-8 h-8">
                <img 
                  src="/lovable-uploads/adb2244e-db69-4eaf-9458-a582f1297174.png" 
                  alt="WordPress Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">WordPress</h3>
              </div>
              <Button variant="outline">Install & Activate</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Apps</h3>
              </div>
              <Button variant="outline">Connect your Apps</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard