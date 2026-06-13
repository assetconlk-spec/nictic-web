import { useState } from "react";
import { Link, useLocation } from "react-router";
import { HiBars3 } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";

function getHomeLink(pathname) {
  if (pathname.startsWith("/itineraries")) return "/itineraries";
  if (pathname.startsWith("/taxi")) return "/taxi";
  if (pathname.startsWith("/activities")) return "/activities";
  return "/";
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const homeLink = getHomeLink(pathname);

  const navLinks = [
    { label: t("nav.home"),    path: homeLink },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-10 z-20 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/aboutUs/nictic-logo.png"
              alt="nictic"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/" ? pathname === "/" : pathname === link.path || pathname.startsWith(link.path + "/");
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-primary-600 underline underline-offset-4"
                      : "text-text-secondary hover:text-primary-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <LanguageSwitcher transparent={false} />

            <Button to="/contact" variant="accent" size="sm">
              {t("nav.bookNow")}
            </Button>
          </nav>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher transparent={false} />
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-text-primary transition-colors hover:bg-gray-100"
            >
              <HiBars3 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
