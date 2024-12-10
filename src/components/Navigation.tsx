import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="border-b">
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
        <div className="ml-auto flex items-center space-x-4">
          <Link to="/signin" state={{ showEmailForm: false }}>
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;