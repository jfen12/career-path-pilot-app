import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-deep-teal border-b border-gold-ochre z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo size="sm" />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/networking" className="nav-link">
            Network
          </Link>
          <Link to="/development" className="nav-link">
            Development
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link to="/business/marketplace" className="nav-link">
            Business
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-soft-sand hover:text-gold-ochre">
            Sign In
          </Button>
          <Button className="bg-gold-ochre text-deep-teal hover:bg-gold-ochre/90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 