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
  const scrolled = scrollY > 50;
  const navBg = scrolled || !isHome ? "bg-white shadow-md" : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-text-primary" : "text-white";
  const activeLinkColor = isHome && !scrolled ? "text-white underline underline-offset-4" : "text-accent";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-30 transition-all duration-300 ${isHome && !scrolled ? "top-0 lg:top-10" : "top-0"} ${navBg}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-1.5 text-2xl font-bold transition-colors">
            <img
              src="/images/aboutUs/logo-high-res.png"
              alt=""
              className="h-11 w-auto transition-all duration-300"
              style={
                isHome && !scrolled
                  ? { filter: "brightness(0) invert(1)" }
                  : { filter: "brightness(0) saturate(100%) invert(18%) sepia(100%) hue-rotate(174deg) saturate(350%) brightness(77%)" }
              }
            />
            <span className={isHome && !scrolled ? "text-white" : "text-primary-900"}>Gajalanka</span>
            <span className={isHome && !scrolled ? "text-white/80" : "text-accent"}>Tours</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? pathname === link.path
                  : pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-bold transition-colors hover:text-accent focus:outline-none ${
                    isActive ? activeLinkColor : textColor
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

          <button
            onClick={() => setMobileOpen(true)}
            className={`rounded-lg p-2 lg:hidden ${textColor}`}
          >
            <HiBars3 className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
