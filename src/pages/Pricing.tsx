import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText = "Get Started",
  popular = false 
}: {
  name: string
  price: string
  description: string
  features: string[]
  buttonText?: string
  popular?: boolean
}) => (
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

const Pricing = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Smart Automation, Smarter Pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A solution that scales with your business needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <PricingTier
            name="Free"
            price="0"
            description="Perfect for getting started with automation"
            features={[
              "Up to 100 tasks per month",
              "Basic integrations",
              "Email support",
              "Community access",
              "Basic analytics"
            ]}
          />
          
          <PricingTier
            name="Pro"
            price="49"
            description="For growing businesses needing more power"
            features={[
              "Unlimited tasks",
              "Advanced integrations",
              "Priority support",
              "Advanced analytics",
              "Custom workflows",
              "Team collaboration",
              "API access"
            ]}
            popular={true}
          />
          
          <PricingTier
            name="Enterprise"
            price="Custom"
            description="For large organizations with custom needs"
            features={[
              "Everything in Pro",
              "Custom integrations",
              "24/7 dedicated support",
              "Enterprise SLA",
              "Advanced security",
              "Custom training",
              "Dedicated success manager"
            ]}
            buttonText="Contact Sales"
          />
        </div>

        {/* Trust Badge */}
        <div className="mt-24 text-center">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">100% No-Risk Money Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">Try Kampeyn risk-free for 14 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold mb-12">Not sure which plan to choose?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">Free</th>
                  <th className="py-4 px-6 text-center">Pro</th>
                  <th className="py-4 px-6 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Monthly tasks",
                  "Team members",
                  "Custom workflows",
                  "API access",
                  "Priority support",
                  "Custom integrations",
                  "Advanced analytics",
                  "Enterprise SLA"
                ].map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-6">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      {index < 2 ? "100" : <Check className="mx-auto h-5 w-5 text-muted-foreground/50" />}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {index < 2 ? "Unlimited" : <Check className="mx-auto h-5 w-5 text-primary" />}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {index < 2 ? "Unlimited" : <Check className="mx-auto h-5 w-5 text-primary" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-24 text-center">
          <p className="text-sm text-muted-foreground">Trusted by Over 4,000,000+ Websites Worldwide</p>
          <div className="mt-8 flex justify-center gap-8 grayscale opacity-50">
            {/* Add partner logos here if needed */}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Button size="lg" className="px-8">Get Started with Kampeyn</Button>
        </div>
      </div>
    </div>
  )
}

export default Pricing