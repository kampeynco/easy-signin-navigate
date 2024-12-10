import Navigation from "@/components/Navigation"

const Documentation = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Documentation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Learn how to get the most out of Kampeyn
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Comprehensive guides and documentation to help you start working with our platform as quickly as possible.
          </p>
        </div>
        {/* Documentation content will be implemented in future iterations */}
      </div>
    </div>
  )
}

export default Documentation