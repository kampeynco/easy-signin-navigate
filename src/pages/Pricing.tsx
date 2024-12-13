import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

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

const Testimonial = ({ 
  author, 
  role, 
  content, 
  avatarUrl 
}: { 
  author: string
  role: string
  content: string
  avatarUrl?: string 
}) => (
  <div className="space-y-4">
    <p className="text-muted-foreground italic">{content}</p>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
)

const FAQ = () => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>What is Kampeyn?</AccordionTrigger>
      <AccordionContent>
        Kampeyn is a powerful automation platform that helps businesses streamline their workflows and increase productivity.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How does the pricing work?</AccordionTrigger>
      <AccordionContent>
        We offer flexible pricing plans starting from a free tier. You can choose the plan that best fits your needs and scale as your business grows.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Do you offer a money-back guarantee?</AccordionTrigger>
      <AccordionContent>
        Yes, we offer a 14-day money-back guarantee. If you're not satisfied with our service, we'll provide a full refund.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-4">
      <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
      <AccordionContent>
        We provide email support for all plans, with priority support for Pro users and dedicated support for Enterprise customers.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Features</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center">Pro</TableHead>
                  <TableHead className="text-center">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { feature: "Monthly tasks", free: "100", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Team members", free: "1", pro: "Up to 10", enterprise: "Unlimited" },
                  { feature: "Integrations", free: "5", pro: "50+", enterprise: "Custom" },
                  { feature: "API access", free: "No", pro: "Yes", enterprise: "Yes" },
                  { feature: "Custom workflows", free: "No", pro: "Yes", enterprise: "Yes" },
                  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom" },
                  { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell className="text-center">{row.free}</TableCell>
                    <TableCell className="text-center">{row.pro}</TableCell>
                    <TableCell className="text-center">{row.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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

        {/* Additional Resources */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">Comprehensive guides and API documentation</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">Join our active community of users</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-sm text-muted-foreground">Get help when you need it</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing