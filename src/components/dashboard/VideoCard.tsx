import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

export const VideoCard = () => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Getting Started Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-[#8B5CF6] rounded-lg overflow-hidden hover:opacity-95 transition-opacity cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white opacity-80" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}