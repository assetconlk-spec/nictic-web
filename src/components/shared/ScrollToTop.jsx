import { HiArrowUp } from "react-icons/hi2";
import { motion, AnimatePresence } from "motion/react";
import useScrollPosition from "../../hooks/useScrollPosition";

export default function ScrollToTop() {
  const scrollY = useScrollPosition();
  const visible = scrollY > 400;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-22 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-colors hover:bg-primary-600 cursor-pointer"
          aria-label="Scroll to top"
        >
          <HiArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
