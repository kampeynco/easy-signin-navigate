import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Automate Your Fundraising Operations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Connect your fundraising tech stack and automate repetitive tasks. 
            Save time and focus on what matters most - your mission.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-[#2B4079] hover:bg-[#1e2d54]">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Streamline Your Fundraising Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Connect Apps</h3>
              <p className="text-muted-foreground">
                Easily connect your favorite fundraising tools and services in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Create Workflows</h3>
              <p className="text-muted-foreground">
                Build automated workflows that handle your repetitive tasks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Monitor Activity</h3>
              <p className="text-muted-foreground">
                Track your automation performance and troubleshoot issues easily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index