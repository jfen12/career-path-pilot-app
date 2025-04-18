import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Calendar, Briefcase, MoreHorizontal } from "lucide-react";
import MoreMenu from "./MoreMenu";

const MobileBottomNav = () => {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navItems = [
    { icon: Home, path: "/dashboard", label: "Home" },
    { icon: Users, path: "/networking", label: "Network" },
    { icon: Calendar, path: "/development", label: "Develop" },
    { icon: Briefcase, path: "/hiring", label: "Hiring" },
    { icon: MoreHorizontal, path: "/more", label: "More" }
  ];

  const handleMoreClick = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const handleCloseMoreMenu = () => {
    setShowMoreMenu(false);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-deep-teal border-t border-gold-ochre md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (item.path === "/more") {
                  handleMoreClick();
                } else {
                  handleCloseMoreMenu();
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === item.path ? "text-gold-ochre" : "text-soft-sand"
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {showMoreMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={handleCloseMoreMenu}
        >
          <div 
            className="fixed bottom-16 left-0 right-0 bg-deep-teal rounded-t-xl border-t border-gold-ochre"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreMenu onClose={handleCloseMoreMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;
