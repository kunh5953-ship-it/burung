import { Home, MapPin, QrCode, Leaf, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
  isCenter?: boolean;
}

const NavItem = ({ icon, label, path, isActive, onClick, isCenter }: NavItemProps) => {
  if (isCenter) {
    return (
      <button
        onClick={onClick}
        className="scan-fab -mt-6 relative z-10"
        aria-label={label}
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "nav-item flex-1 min-w-0",
        isActive && "active"
      )}
      aria-label={label}
    >
      <div className={cn(
        "p-1.5 rounded-xl transition-colors",
        isActive && "bg-accent"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-medium truncate">{label}</span>
    </button>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <MapPin className="w-5 h-5" />, label: "Locate", path: "/locate" },
    { icon: <QrCode className="w-6 h-6" />, label: "Scan", path: "/scan", isCenter: true },
    { icon: <Leaf className="w-5 h-5" />, label: "Impact", path: "/impact" },
    { icon: <User className="w-5 h-5" />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex items-end justify-around px-2 pt-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            isCenter={item.isCenter}
          />
        ))}
      </div>
    </nav>
  );
};