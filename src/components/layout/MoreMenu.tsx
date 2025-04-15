import { Link } from "react-router-dom";
import { Settings, HelpCircle, LogOut, Building2 } from "lucide-react";

const MoreMenu = () => {
  const menuItems = [
    { icon: Building2, label: "Business Marketplace", path: "/business/marketplace" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
    { icon: LogOut, label: "Logout", path: "/logout" }
  ];

  return (
    <div className="py-4">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center px-6 py-3 text-soft-sand hover:bg-gold-ochre hover:text-deep-teal transition-colors"
        >
          <item.icon className="mr-3" size={20} />
          <span className="body-text">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MoreMenu; 