import { useState, useEffect, useMemo } from "react";
import TourCard from "../components/ui/TourCard";
import Button from "../components/ui/Button";
import AnimatedSection from "../components/shared/AnimatedSection";
import { pb } from "../lib/pocketbase";
import PageLoader from "../components/shared/PageLoader";
import { useCategories } from "../hooks/useCategories";
import { usePageBanner } from "../hooks/usePageBanner";

export default function ToursPage() {
  const banner = usePageBanner("tours", "/images/aboutUs/tour-banner.png", 41);

  useEffect(() => {
    document.title = "Our Tours | Gajalanka Tours";
  }, []);

  const [active, setActive] = useState("All");
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rawCategories = useCategories();

  useEffect(() => {
    pb.collection("tours")
      .getFullList({ sort: "-created" })
      .then((data) => {
        setTours(
          data.map((r) => ({
            ...r,
            image: r.image ? pb.files.getURL(r, r.image) : r.image_url || "",
          })),
        );
      })
      .catch(() => {
        setTours([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categories = useMemo(() => ["All", ...rawCategories], [rawCategories]);

  useEffect(() => {
    if (!categories.includes(active)) {
      setActive("All");
    }
  }, [active, categories]);

  const filtered =
    active === "All" ? tours : tours.filter((t) => t.category === active);

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex items-center justify-center bg-primary-900 pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={banner.src}
            alt="Tours hero"
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Our Tours
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Explore our carefully curated collection of Sri Lankan adventures,
            each designed to create lasting memories.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-surface py-8 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                  active === cat
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tour, i) => (
                  <TourCard key={tour.id} tour={tour} index={i} />
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-center text-lg text-text-secondary py-12">
                  No tours found in this category. Try another filter.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="bg-surface-alt py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
              Can&apos;t Find Your Perfect Tour?
            </h2>
            <p className="mb-8 text-lg text-text-secondary">
              We specialize in custom itineraries. Tell us your dream Sri Lankan
              adventure and we&apos;ll make it happen.
            </p>
            <Button to="/contact" variant="accent" size="lg">
              Request Custom Tour
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
