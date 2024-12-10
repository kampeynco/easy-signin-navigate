import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface StatCardProps {
  title: string
  current: number
  max: number
  showGetMore?: boolean
}

export const StatCard = ({ title, current, max, showGetMore }: StatCardProps) => {
  const percentage = (current / max) * 100

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        {showGetMore && (
          <Button variant="link" className="text-blue-600 h-auto p-0 text-xs">
            Get more {title}s
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div>
            <div className="text-2xl font-bold text-gray-900">{current}</div>
            <div className="text-xs text-gray-500">out of {max}</div>
          </div>
          <div className="ml-auto text-xl font-semibold text-gray-400">
            {percentage}%
          </div>
        </div>
        {title !== "Team Members" && (
          <Progress value={percentage} className="h-1 mt-3" />
        )}
      </CardContent>
    </Card>
  )
}