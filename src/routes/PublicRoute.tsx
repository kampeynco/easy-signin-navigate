import { useEffect } from "react"
import Navigation from "@/components/Navigation"

export const PublicRoute = ({ children }) => {
  useEffect(() => {
    console.log('PublicRoute: Rendering with children:', children?.type?.name)
  }, [children])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}