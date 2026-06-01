import { useState } from "react";
import { Link, useLocation } from "react-router";
import { HiBars3 } from "react-icons/hi2";
import { navLinks } from "../../data/navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const scrolled = scrollY > 60;
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
          transparent ? "bg-transparent" : "bg-white border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-1">
            <span className={`text-2xl font-extrabold tracking-tight transition-colors ${transparent ? "text-white" : "text-primary-600"}`}>
              nictic
            </span>
            <span className={`text-2xl font-light transition-colors ${transparent ? "text-white/60" : "text-primary-400"}`}>
              .travel
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/" ? pathname === link.path : pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? transparent
                        ? "text-white underline underline-offset-4"
                        : "text-primary-600 underline underline-offset-4"
                      : transparent
                      ? "text-white/80 hover:text-white"
                      : "text-text-secondary hover:text-primary-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button to="/contact" variant="accent" size="sm">
              Book Now
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`rounded-lg p-2 lg:hidden transition-colors ${transparent ? "text-white" : "text-text-primary hover:bg-gray-100"}`}
          >
            <HiBars3 className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
