import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export const TeamMemberCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-[72px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}