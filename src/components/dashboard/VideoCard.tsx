import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

export const VideoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Getting Started Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-[#8B5CF6] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white opacity-80" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}