import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingTierProps {
  name: string
  price: string
  description: string
  features: string[]
  buttonText?: string
  popular?: boolean
}

export const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText = "Get Started",
  popular = false 
}: PricingTierProps) => (
  <div className={`rounded-lg border ${popular ? 'border-primary' : 'border-border'} p-6 relative`}>
    {popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-3xl font-bold">${price}</span>
        {price !== 'Custom' && <span className="text-sm text-muted-foreground">/month</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
    <Button className="w-full" variant={popular ? "default" : "outline"}>{buttonText}</Button>
    <ul className="mt-6 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-primary" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
)