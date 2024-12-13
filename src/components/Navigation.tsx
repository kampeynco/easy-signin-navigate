import { memo } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b3bfeefb-4d63-4032-80a8-9e4200f651e7.png" 
              alt="Kampeyn Logo" 
              className="h-8 w-auto"
              loading="eager"
              width={32}
              height={32}
            />
            <span className="font-semibold text-lg">Kampeyn</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 mx-8">
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/docs">Documentation</NavLink>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/signin">
            <Button variant="ghost" className="text-sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm">Get Started Free</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Memoized NavLink component for better performance
const NavLink = memo(({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
  >
    {children}
  </Link>
))

NavLink.displayName = 'NavLink'

export default memo(Navigation)