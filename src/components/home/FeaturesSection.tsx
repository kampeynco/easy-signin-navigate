import { Rocket, Zap, Lock } from "lucide-react"

const features = [
  {
    title: "Quick Setup",
    description: "Get started in minutes with our intuitive setup process. No technical knowledge required.",
    icon: Rocket,
  },
  {
    title: "Powerful Automations",
    description: "Create complex workflows with our drag-and-drop builder. Connect multiple apps seamlessly.",
    icon: Zap,
  },
  {
    title: "Secure & Reliable",
    description: "Your data is protected with enterprise-grade security. Run your automations with confidence.",
    icon: Lock,
  },
]

export const FeaturesSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Automation Made Simple
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to automate your workflow
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Build powerful automations without code. Connect your favorite apps and let your workflows run on autopilot.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-start">
                <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">{feature.title}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}