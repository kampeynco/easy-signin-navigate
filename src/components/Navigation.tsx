import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Navigation = () => {
  return (
    <nav className="bg-white border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b3bfeefb-4d63-4032-80a8-9e4200f651e7.png" 
              alt="Kampeyn Logo" 
              className="h-8 w-auto"
            />
            <span className="font-semibold text-lg">Kampeyn</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6 mx-8">
          <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link to="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Documentation
          </Link>
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

export default Navigation