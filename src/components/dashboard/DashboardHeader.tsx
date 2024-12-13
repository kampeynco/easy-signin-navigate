import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface DashboardHeaderProps {
  userName: string
}

export const DashboardHeader = memo(({ userName }: DashboardHeaderProps) => {
  const greeting = getTimeBasedGreeting()
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-tight">
        {greeting}, {userName}!
      </h1>
      <Button 
        asChild 
        className="bg-[#2B4079] hover:bg-[#1e2d54] text-white text-sm h-9 transition-colors"
      >
        <Link to="/create-workflow">Create Workflow</Link>
      </Button>
    </div>
  )
})

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

DashboardHeader.displayName = 'DashboardHeader'