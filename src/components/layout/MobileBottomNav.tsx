
import { Home, User, Calendar, Briefcase, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: "/dashboard", label: "Home" },
    { icon: User, path: "/networking", label: "Network" },
    { icon: Calendar, path: "/development", label: "Develop" },
    { icon: Briefcase, path: "/jobs", label: "Jobs" },
    { icon: Menu, path: "/more", label: "More" }
  ];
  
  return (
    <nav className="mobile-nav">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-1 ${
                isActive ? "text-career-purple" : "text-career-gray"
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
