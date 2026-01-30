import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FocusTrap from "focus-trap-react";
import { TextRoll } from "@/components/ui/text-roll";
import lanaLogo from "@/assets/lana-hero.png";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "VIDEOS", path: "/videos" },
  { label: "SOCIAL", path: "/social" },
  { label: "GALLERY", path: "/gallery" },
  { label: "SHOWS", path: "/shows" },
  { label: "EPK", path: "/epk" },
  { label: "ABOUT", path: "/about" },
  { label: "PODCAST", path: "/podcast" },
  { label: "MERCH", path: "/merch" },
];

const ComedyHeader = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between lg:justify-center px-3 lg:px-5 py-2 gap-6">
        <Link
          to="/"
          className="flex-shrink-0"
        >
          <img 
            src={lanaLogo} 
            alt="Lana Salah" 
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        {/* Mobile/Tablet Menu Button - visible on lg and below */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={20} />
        </button>

        {/* Desktop Navigation - visible on lg and above */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`text-xs uppercase tracking-widest font-inter transition-colors whitespace-nowrap ${
                isActive(item.path)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {hoveredItem === item.label ? (
                <TextRoll duration={0.3} getEnterDelay={(i) => i * 0.02} getExitDelay={(i) => i * 0.02}>
                  {item.label}
                </TextRoll>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        {mobileMenuOpen && (
          <FocusTrap>
            <div
              className="fixed inset-0 bg-background z-50 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Close Button */}
              <div className="flex justify-end p-5">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col items-center justify-center gap-8 px-8 pt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg uppercase tracking-widest font-inter transition-colors ${
                      isActive(item.path)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </FocusTrap>
        )}
      </div>
    </header>
  );
};

export default ComedyHeader;
