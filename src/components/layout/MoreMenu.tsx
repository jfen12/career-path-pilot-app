import { Link } from "react-router-dom";
import { Settings, HelpCircle, LogOut, Building2, X, LineChart } from "lucide-react";

interface MoreMenuProps {
  onClose: () => void;
}

const MoreMenu = ({ onClose }: MoreMenuProps) => {
  const menuItems = [
    { icon: LineChart, label: "Investors", path: "/investors" },
    { icon: Building2, label: "Business Marketplace", path: "/business/marketplace" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
    { icon: LogOut, label: "Logout", path: "/logout" }
  ];

  return (
    <div className="py-4">
      <div className="flex justify-between items-center px-6 mb-4">
        <h3 className="text-lg font-medium text-soft-sand">More Options</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gold-ochre hover:text-deep-teal transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClose}
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