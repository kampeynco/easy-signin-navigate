import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Automate Your WordPress Tasks with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect your favorite apps and automate repetitive tasks. Build powerful workflows without writing a single line of code.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="text-base">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-8">
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 h-[400px] flex items-center justify-center">
              <p className="text-2xl font-semibold text-blue-900/70">Workflow Builder Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}