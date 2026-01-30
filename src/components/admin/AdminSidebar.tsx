import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  Image,
  Play,
  Share2,
  Users,
  Mail,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Reviews", path: "/admin/reviews", icon: MessageSquare },
  { label: "Gallery", path: "/admin/gallery", icon: Image },
  { label: "Videos", path: "/admin/videos", icon: Play },
  { label: "Social Links", path: "/admin/social", icon: Share2 },
  { label: "Subscribers", path: "/admin/subscribers", icon: Users },
  { label: "Contacts", path: "/admin/contacts", icon: Mail },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="block">
          <h2 className="font-playfair text-lg text-foreground">Lana Salah</h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-inter mt-1">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-inter transition-colors rounded-md",
                isActive(item.path)
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-sm font-inter text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-md"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2 text-sm font-inter text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-md w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
