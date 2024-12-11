import { useEffect } from "react"
import Navigation from "@/components/Navigation"

export const PublicRoute = ({ children }) => {
  useEffect(() => {
    console.log('PublicRoute: Rendering with children:', children?.type?.name)
  }, [children])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  )
}