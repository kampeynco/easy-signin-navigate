import { useEffect } from "react"
import Navigation from "@/components/Navigation"

export const PublicRoute = ({ children }) => {
  useEffect(() => {
    console.log('PublicRoute: Rendering with children:', children?.type?.name)
  }, [children])

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  )
}