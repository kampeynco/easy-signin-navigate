import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your All-in-One Automation Platform for Fundraising
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Automate Your Workflow & Streamline Your Fundraising Processes to focus on<span className="hidden md:inline"><br /></span> what matters most - your mission
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="text-base">
                Connect Your Apps <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-8">
            <div className="bg-gradient-to-b from-[#2B4079]/10 to-[#2B4079]/20 rounded-lg shadow-lg p-8 h-[400px] flex items-center justify-center">
              <p className="text-2xl font-semibold text-[#2B4079]/70">Visual Workflow Builder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}