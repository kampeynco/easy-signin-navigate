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
      <CardContent className="flex items-center gap-3 p-4">
        <div className="w-8 h-8">
          {typeof Icon === "string" ? (
            <img src={Icon} alt={`${title} Logo`} className="w-full h-full object-contain" />
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-900">{title}</h3>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-gray-50 text-sm">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}