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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {showGetMore && (
          <Button variant="link" className="text-blue-600 h-auto p-0">
            Get more {title}s
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-4xl font-bold">{current}</div>
            <div className="text-sm text-muted-foreground">out of {max}</div>
          </div>
          <div className="ml-auto text-3xl font-semibold text-muted-foreground">
            {percentage}%
          </div>
        </div>
        {title !== "Team Members" && (
          <Progress value={percentage} className="h-1 bg-white/10 mt-4" />
        )}
      </CardContent>
    </Card>
  )
}