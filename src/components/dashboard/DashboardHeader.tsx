import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface DashboardHeaderProps {
  userName: string
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Good Afternoon, {userName}!
      </h1>
      <Button asChild className="bg-[#2B4079] hover:bg-[#1e2d54] text-white">
        <Link to="/create-workflow">Create Workflow</Link>
      </Button>
    </div>
  )
}