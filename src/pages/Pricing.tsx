import { Button } from "@/components/ui/button"
import { PricingTier } from "@/components/pricing/PricingTier"
import { Testimonial } from "@/components/pricing/Testimonial"
import { FAQ } from "@/components/pricing/FAQ"
import { ComparisonTable } from "@/components/pricing/ComparisonTable"
import { TrustBadge } from "@/components/pricing/TrustBadge"
import { AdditionalResources } from "@/components/pricing/AdditionalResources"

const Pricing = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Smart Automation, Smarter Pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your business needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <PricingTier
            name="Starter"
            price="249"
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
            name="Grow"
            price="499"
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
            name="Scale"
            price="995"
            description="For large organizations with custom needs"
            features={[
              "Everything in Grow",
              "Custom integrations",
              "24/7 dedicated support",
              "Enterprise SLA",
              "Advanced security",
              "Custom training",
              "Dedicated success manager"
            ]}
          />
        </div>

        <TrustBadge />

        {/* Comparison Table */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold mb-12">Not sure which plan to choose?</h2>
          <ComparisonTable />
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              author="Sarah Johnson"
              role="Marketing Director"
              content="Kampeyn has transformed how we handle our marketing automation. The workflow builder is intuitive and powerful."
            />
            <Testimonial
              author="Michael Chen"
              role="Tech Lead"
              content="The API integration capabilities are fantastic. We've been able to connect all our tools seamlessly."
            />
            <Testimonial
              author="Emma Davis"
              role="Operations Manager"
              content="The customer support is exceptional. They've helped us optimize our automation processes significantly."
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <FAQ />
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-24 text-center">
          <p className="text-sm text-muted-foreground">Trusted by Over 4,000,000+ Websites Worldwide</p>
          <div className="mt-8 flex justify-center gap-8 grayscale opacity-50">
            {/* Add partner logos here */}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of satisfied customers using Kampeyn</p>
          <Button size="lg" className="px-8">Start Your Free Trial</Button>
        </div>

        <AdditionalResources />
      </div>
    </div>
  )
}

export default Pricing
