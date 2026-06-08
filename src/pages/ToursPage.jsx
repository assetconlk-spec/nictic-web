import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import AnimatedSection from "../components/shared/AnimatedSection";
import { pb } from "../lib/pocketbase";
import PageLoader from "../components/shared/PageLoader";
import { useCategories } from "../hooks/useCategories";
import {
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

/* ── Featured hero card ─────────────────────────────────────── */
function FeaturedCard({ tour }) {
  return (
    <Link
      to={`/itineraries/${tour.slug}`}
      className="group relative mb-10 flex h-96 overflow-hidden rounded-3xl shadow-xl lg:h-120"
    >
      <img
        src={tour.image}
        alt={tour.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:max-w-xl lg:justify-center">
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
          <HiOutlineSparkles className="h-3.5 w-3.5" />
          Featured
        </span>
        <h2 className="mb-3 text-3xl font-extrabold leading-tight text-white lg:text-4xl">
          {tour.title}
        </h2>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-300 lg:text-base">
          {tour.description}
        </p>
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-300">
          {tour.duration && (
            <span className="flex items-center gap-1.5">
              <HiOutlineClock className="h-4 w-4 text-primary-400" />
              {tour.duration}
            </span>
          )}
          {tour.minpax && tour.maxpax && (
            <span className="flex items-center gap-1.5">
              <HiOutlineUsers className="h-4 w-4 text-primary-400" />
              {tour.minpax}–{tour.maxpax} pax
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-extrabold text-white">{tour.price}</span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition group-hover:bg-primary-500 group-hover:text-white">
            View Details <HiOutlineArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Tour card ──────────────────────────────────────────────── */
function TourCard({ tour, index }) {
  return (
    <AnimatedSection delay={index * 0.07}>
      <Link
        to={`/itineraries/${tour.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white">
            {tour.category}
          </span>
          {tour.difficulty && (
            <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold ${
              tour.difficulty === "Easy"
                ? "bg-green-500 text-white"
                : tour.difficulty === "Moderate"
                ? "bg-amber-500 text-white"
                : "bg-orange-500 text-white"
            }`}>
              {tour.difficulty}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1.5 text-lg font-bold text-text-primary group-hover:text-primary-600 transition-colors leading-snug">
            {tour.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary flex-1">
            {tour.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {tour.duration && (
              <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                <HiOutlineClock className="h-3.5 w-3.5" /> {tour.duration}
              </span>
            )}
            {tour.minpax && tour.maxpax && (
              <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                <HiOutlineUsers className="h-3.5 w-3.5" /> {tour.minpax}–{tour.maxpax} pax
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-xl font-extrabold text-primary-600">{tour.price}</span>
            <span className="rounded-lg bg-primary-50 px-4 py-2 text-xs font-bold text-primary-700 transition group-hover:bg-primary-600 group-hover:text-white">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function ToursPage() {
  useEffect(() => { document.title = "Itineraries | nictic.travel"; }, []);

  const [active, setActive] = useState("All");
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rawCategories = useCategories();
  const categories = useMemo(() => ["All", ...rawCategories], [rawCategories]);

  useEffect(() => {
    const load = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const data = await pb.collection("itineraries").getFullList({ sort: "-id", requestKey: null });
          setTours(data.map((r) => ({
            ...r,
            image: r.image ? pb.files.getURL(r, r.image) : r.image_url || "",
          })));
          return;
        } catch (err) {
          if (i === retries - 1) {
            console.error("Failed to load itineraries:", err);
            setTours([]);
          } else {
            await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
          }
        }
      }
    };
    load().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!categories.includes(active)) setActive("All");
  }, [active, categories]);

  const filtered = active === "All" ? tours : tours.filter((t) => t.category === active);
  const featured = filtered.find((t) => t.featured) || filtered[0];
  const rest = featured ? filtered.filter((t) => t.id !== featured.id) : filtered;

  const countFor = (cat) =>
    cat === "All" ? tours.length : tours.filter((t) => t.category === cat).length;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-primary-900 pb-0">
        <img
          src="https://images.unsplash.com/photo-1612862862126-865765df2ded?w=1600&q=80"
          alt="Sri Lanka"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />

        {/* Hero text */}
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-300">
            Multi-day Itineraries
          </span>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Explore<br />
            <span className="text-primary-400">Sri Lanka</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-gray-300">
            Handcrafted journeys — cultural, coastal, wild, and everything in between.
            Every itinerary is fully customisable.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: `${tours.length}+`, label: "Itineraries" },
              { value: `${rawCategories.length}`, label: "Categories" },
              { value: "100%", label: "Customisable" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="sticky top-16 z-20 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  active === cat
                    ? "bg-primary-500 text-white shadow-sm"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
              >
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                  active === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tour grid ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <PageLoader />
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-lg text-text-secondary">
              No itineraries found in this category.
            </p>
          ) : (
            <>
              {featured && <FeaturedCard tour={featured} />}
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((tour, i) => (
                    <TourCard key={tour.id} tour={tour} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Custom trip CTA ── */}
      <section className="relative overflow-hidden bg-primary-700 py-20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=1200&q=60"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            Can't Find Your Perfect Itinerary?
          </h2>
          <p className="mb-8 text-lg text-primary-100">
            We specialise in bespoke itineraries. Tell us your travel dates,
            budget, and interests — we'll craft it just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/94707485177?text=Hi%2C%20I%27d%20like%20a%20custom%20itinerary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-primary-700"
            >
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
