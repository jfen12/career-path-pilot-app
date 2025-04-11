import { Link } from "react-router-dom";
import { Building2, Settings, HelpCircle, LogOut } from "lucide-react";

const MoreMenu = () => {
  const menuItems = [
    { icon: Building2, path: "/business/marketplace", label: "Business Marketplace" },
    { icon: Settings, path: "/settings", label: "Settings" },
    { icon: HelpCircle, path: "/help", label: "Help & Support" },
    { icon: LogOut, path: "/logout", label: "Logout" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">More Options</h2>
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon size={20} className="text-gray-600" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreMenu; 