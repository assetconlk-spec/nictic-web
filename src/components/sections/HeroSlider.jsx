import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { pb } from "../../lib/pocketbase";
import PageLoader from "../shared/PageLoader";

export default function HeroSlider() {
  const { t } = useTranslation();
  const [slides, setSlides] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pb.collection("slides")
      .getFullList({ sort: "order", filter: "active=true" })
      .then((records) => {
        if (records.length === 0) return;
        setSlides(
          records.map((r) => ({
            image: r.image ? pb.files.getURL(r, r.image) : r.image_url || "",
            title: r.title,
            subtitle: r.subtitle,
          })),
        );
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <>
      {isLoading && <PageLoader fullScreen />}
      <section className="relative h-screen min-h-150 overflow-hidden">

        {/* Slides */}
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="relative h-full min-w-0 flex-[0_0_100%]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay — heavier at bottom-left for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

        {/* Bottom-left editorial content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 md:px-12 lg:px-16 lg:pb-20 lg:max-w-4xl">

          {/* Slide counter label */}
          <motion.p
            key={`label-${selectedIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
          >
            {String(selectedIndex + 1).padStart(2, "0")} — {t("slider.counter")}
          </motion.p>

          {/* Main title */}
          <div className="mb-4 min-h-28 md:min-h-32 lg:min-h-36">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${selectedIndex}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-6xl"
              >
                {slides[selectedIndex]?.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <div className="mb-8 min-h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${selectedIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                className="text-base text-gray-300 md:text-lg max-w-xl"
              >
                {slides[selectedIndex]?.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Text-link CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8"
          >
            <Link
              to="/itineraries"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white"
            >
              <span className="border-b border-white/60 pb-0.5 transition-colors group-hover:border-white">
                {t("hero.exploreTours")}
              </span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {t("hero.planYourTrip")}
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators — centered */}
        <motion.div
          className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "h-2 w-8 bg-white"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
}
