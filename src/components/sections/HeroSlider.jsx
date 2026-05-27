import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "motion/react";
import Button from "../ui/Button";
import { pb } from "../../lib/pocketbase";
import PageLoader from "../shared/PageLoader";

export default function HeroSlider() {
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
    Autoplay({ delay: 5000, stopOnInteraction: false }),
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
      <section className="relative flex-1 overflow-hidden">
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative h-full min-w-0 flex-[0_0_100%]"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <div className="mb-6 flex min-h-30 items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${selectedIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-5xl 2xl:text-6xl"
                >
                  {slides[selectedIndex]?.title}
                </motion.h1>
              </AnimatePresence>
            </div>
            <div className="mb-8 flex min-h-16 items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`subtitle-${selectedIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-lg text-gray-200 md:text-xl"
                >
                  {slides[selectedIndex]?.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button to="/tours" variant="accent" size="lg">
                Explore Tours
              </Button>
              <Button to="/contact" variant="white" size="lg">
                Plan Your Trip
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === selectedIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll down button */}
        <motion.button
          onClick={() => window.scrollBy({ top: 700, behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Scroll down"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/70 p-1">
            <motion.div
              className="h-2 w-1 rounded-full bg-white"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.button>
      </section>
    </>
  );
}
