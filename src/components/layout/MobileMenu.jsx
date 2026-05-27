import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "../../data/navigation";
import Button from "../ui/Button";

export default function MobileMenu({ isOpen, onClose }) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <span className="text-xl font-bold text-primary-900">Menu</span>
              <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
                <HiXMark className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col px-6">
              {navLinks.map((link) => {
                const isActive =
                  link.path === "/"
                    ? pathname === link.path
                    : pathname.startsWith(link.path);
                return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`border-b border-gray-50 py-4 text-lg font-medium transition-colors ${
                    isActive ? "text-primary-500" : "text-text-primary hover:text-primary-500"
                  }`}
                >
                  {link.label}
                </Link>
                );
              })}
              <div className="mt-6">
                <Button to="/contact" variant="primary" size="md" className="w-full" onClick={onClose}>
                  Book Now
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
