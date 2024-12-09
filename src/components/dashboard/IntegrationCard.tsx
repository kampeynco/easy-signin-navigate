import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface IntegrationCardProps {
  icon: string | LucideIcon
  title: string
  buttonText: string
}

export const IntegrationCard = ({
  icon: Icon,
  title,
  buttonText,
}: IntegrationCardProps) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="w-10 h-10">
          {typeof Icon === "string" ? (
            <img src={Icon} alt={`${title} Logo`} className="w-full h-full object-contain" />
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
              <Icon className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        </div>
        <Button variant="outline" size="lg" className="hover:bg-gray-50">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}