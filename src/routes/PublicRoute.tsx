import Navigation from "@/components/Navigation"

export const PublicRoute = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  )
}