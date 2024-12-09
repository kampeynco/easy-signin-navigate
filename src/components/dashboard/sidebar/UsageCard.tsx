import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function UsageCard() {
  return (
    <div className="mx-4 mb-8 rounded-lg bg-white/5 p-4">
      <div className="mb-4">
        <div className="text-sm font-medium">Starter (Current Plan)</div>
      </div>
      <Separator className="mb-4 bg-white/10" />
      
      {/* Tasks Usage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Tasks</span>
          <span className="text-sm text-muted-foreground">(0 out of 1000)</span>
        </div>
        <Progress value={0} className="h-1 bg-white/10" />
      </div>

      {/* Workflows Usage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Workflows</span>
          <span className="text-sm text-muted-foreground">(0 out of 5)</span>
        </div>
        <Progress value={0} className="h-1 bg-white/10" />
      </div>

      <Button className="w-full justify-center gap-2" variant="secondary">
        <Zap className="h-4 w-4" />
        Upgrade to Pro
      </Button>
    </div>
  )
}