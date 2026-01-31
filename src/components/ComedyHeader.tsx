import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Youtube } from "lucide-react";
import FocusTrap from "focus-trap-react";
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

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/thelanasalah",
    icon: <Instagram size={20} />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@thelanasalah",
    icon: <Youtube size={20} />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@thelanasalah",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://threads.net/@thelanasalah",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.51.87-6.36 2.54-8.471C5.876 1.48 8.63.264 12.186.24h.014c2.746.016 5.043.718 6.833 2.088 1.642 1.257 2.842 3.063 3.567 5.367l-2.89.814c-.55-1.766-1.43-3.12-2.613-4.022-1.254-.954-2.88-1.449-4.83-1.469h-.015c-2.746.021-4.798.957-6.098 2.787-1.2 1.688-1.813 4.048-1.823 7.015v.054c.01 2.967.623 5.327 1.823 7.015 1.3 1.83 3.352 2.766 6.098 2.787h.013c2.297-.018 4.07-.608 5.271-1.751 1.246-1.185 1.881-2.858 1.887-4.969v-.033c-.004-.928-.195-1.733-.569-2.393-.358-.632-.875-1.127-1.539-1.474a4.44 4.44 0 00-.108 1.092c-.007.936-.262 1.74-.759 2.392-.53.697-1.292 1.197-2.262 1.49-.807.244-1.73.312-2.747.202-1.193-.128-2.18-.514-2.937-1.144-.81-.675-1.287-1.569-1.423-2.656l2.93-.393c.067.546.271.962.607 1.238.416.341.991.522 1.71.537.761.015 1.37-.108 1.814-.367.39-.229.586-.544.59-.94.004-.365-.144-.67-.438-.906-.37-.297-.97-.522-1.784-.668-1.182-.213-2.12-.523-2.787-.922-.736-.44-1.268-1.006-1.58-1.681-.298-.645-.451-1.412-.454-2.28-.004-1.17.39-2.159 1.17-2.94.81-.812 1.897-1.235 3.229-1.256 1.363-.022 2.465.38 3.277 1.193.747.748 1.203 1.77 1.352 3.033l-2.892.378c-.077-.625-.271-1.1-.578-1.41-.34-.346-.821-.52-1.429-.517-.578.002-1.027.173-1.333.507-.28.306-.42.712-.418 1.207.002.529.157.928.459 1.186.33.282.84.495 1.518.633 1.33.272 2.405.653 3.196 1.132.856.52 1.482 1.175 1.862 1.948.394.803.593 1.762.593 2.855v.036c-.008 2.872-.888 5.117-2.613 6.676-1.627 1.47-3.926 2.241-6.837 2.294z" />
      </svg>
    ),
  },
];

const ComedyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const openMenu = () => {
    setMenuOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setMenuOpen(false), 300);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo - Large, Left-aligned */}
        <Link
          to="/"
          className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]"
        >
          <img
            src={lanaLogo}
            alt="Lana Salah"
            className="h-16 md:h-20 lg:h-24 w-auto"
          />
        </Link>

        {/* Hamburger Menu Button - Always visible */}
        <button
          onClick={openMenu}
          className="p-2 text-foreground/70 hover:text-red-500 transition-colors"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Side Drawer Navigation */}
      {menuOpen && (
        <FocusTrap>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div
              className={`absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-background shadow-2xl transition-transform duration-300 ease-out ${
                isAnimating ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close Button */}
              <div className="flex justify-end p-5">
                <button
                  onClick={closeMenu}
                  className="p-2 text-foreground/70 hover:text-red-500 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-start px-10 pt-4 gap-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeMenu}
                    className={`text-2xl tracking-wide font-playfair transition-all duration-300 ${
                      isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    } ${
                      isActive(item.path)
                        ? "text-red-500 font-medium"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                    style={{
                      transitionDelay: isAnimating ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <span className="block h-[1px] w-full bg-red-500 mt-1" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Divider */}
              <div className="mx-10 my-8 h-px bg-border" />

              {/* Social Icons */}
              <div className="flex items-center gap-6 px-10">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-foreground/60 hover:text-red-500 transition-all duration-300 ${
                      isAnimating
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      transitionDelay: isAnimating
                        ? `${(navItems.length + index) * 50}ms`
                        : "0ms",
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </header>
  );
};

export default ComedyHeader;
