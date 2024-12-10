import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your All-in-One Automation Platform for WordPress & Beyond
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Effortlessly connect everything, automate everything. Build powerful workflows without code.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg" className="text-base">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 flow-root">
          <div className="relative rounded-xl bg-gray-900/5 p-8">
            <img
              src="/lovable-uploads/cd5303ec-55ff-4553-96da-08b1bd33051a.png"
              alt="App screenshot"
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}