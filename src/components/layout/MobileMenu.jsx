import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";

const CATEGORIES = [
  { label: "Itineraries", path: "/itineraries" },
  { label: "Taxi",        path: "/taxi" },
  { label: "Activities",  path: "/activities" },
];

function getHomeLink(pathname) {
  if (pathname.startsWith("/itineraries")) return "/itineraries";
  if (pathname.startsWith("/taxi")) return "/taxi";
  if (pathname.startsWith("/activities")) return "/activities";
  return "/";
}

export default function MobileMenu({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const homeLink = getHomeLink(pathname);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl"
          >
            {/* Close button */}
            <div className="flex items-center justify-end border-b border-gray-100 px-4 py-3">
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="bg-gray-900 px-6 py-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                Browse
              </p>
              {CATEGORIES.map((cat) => {
                const isActive = pathname.startsWith(cat.path);
                return (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    onClick={onClose}
                    className={`block rounded px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-4">
              {[
                { label: t("nav.home"),    path: homeLink },
                { label: t("nav.contact"), path: "/contact" },
              ].map((link) => {
                const isActive =
                  link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={onClose}
                    className={`border-b border-gray-50 py-4 text-base font-semibold transition-colors ${
                      isActive ? "text-primary-600" : "text-text-primary hover:text-primary-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-6">
                <Button to="/contact" variant="accent" size="md" className="w-full" onClick={onClose}>
                  {t("nav.bookNow")}
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
