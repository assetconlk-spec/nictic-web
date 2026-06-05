import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineTruck,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineSparkles,
  HiOutlineInformationCircle,
  HiOutlineMoon,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { pb } from "../lib/pocketbase";
import PageLoader from "../components/shared/PageLoader";
import BookingModal from "../components/ui/BookingModal";

export default function TourDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      try {
        const data = await pb
          .collection("tours")
          .getFirstListItem(`slug="${slug}"`);
        const parseJson = (val) => {
          if (Array.isArray(val)) return val;
          try { return JSON.parse(val || '[]'); } catch { return []; }
        };
        setTour({
          ...data,
          image: data.image
            ? pb.files.getURL(data, data.image)
            : data.image_url || "",
          map_image: data.map_image
            ? pb.files.getURL(data, data.map_image)
            : data.map_image_url || "",
          highlights: parseJson(data.highlights),
          inclusions: parseJson(data.inclusions),
          exclusions: parseJson(data.exclusions),
          itinerary:  parseJson(data.itinerary),
        });
        document.title = `${data.title} | nictic.travel`;
      } catch {
        navigate("/tours");
      }
      setLoading(false);
    }
    fetchTour();
  }, [slug, navigate]);

  if (loading) return <PageLoader fullScreen />;

  if (!tour) return null;

  // Split title — last word gets accent color
  const words = tour.title.trim().split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];
  const inclusions = Array.isArray(tour.inclusions) ? tour.inclusions : [];
  const exclusions = Array.isArray(tour.exclusions) ? tour.exclusions : [];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-120 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back link */}
        <Link
          to="/tours"
          className="absolute left-6 top-28 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          All Tours
        </Link>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-12 lg:px-16">
          <span className="mb-3 inline-block rounded-sm bg-primary-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            {tour.category}
          </span>
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            {firstWords} <span style={{ color: "#F59E0B" }}>{lastWord}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
            <span className="flex items-center gap-2">
              <HiOutlineClock className="h-4 w-4" />
              {tour.duration}
            </span>
            {tour.minpax && tour.maxpax && (
              <span className="flex items-center gap-2">
                <HiOutlineUsers className="h-4 w-4" />
                {tour.minpax} - {tour.maxpax} pax
              </span>
            )}
            {tour.vehicle && (
              <span className="flex items-center gap-2">
                <HiOutlineTruck className="h-4 w-4" />
                {tour.vehicle}
              </span>
            )}
            {/* <span className="flex items-center gap-2">
              <HiOutlineStar className="h-4 w-4 text-accent" />
              {tour.rating} ({tour.reviews} reviews)
            </span> */}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left — description + itinerary */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold text-text-primary md:text-3xl">
                {tour.overview_title || "About This Tour"}
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-text-secondary">
                {tour.description}
              </p>

              {/* Itinerary timeline */}
              {itinerary.length > 0 && (
                <div className="mb-10">
                  <h3 className="mb-6 text-xl font-bold text-text-primary">
                    Day by Day Itinerary
                  </h3>
                  <div className="relative space-y-0 pl-6">
                    <div className="absolute left-2.25 top-2 bottom-2 w-0.5 bg-primary-100" />
                    {itinerary.map((item) => (
                      <div
                        key={`${item.day}-${item.title}`}
                        className="relative pb-8"
                      >
                        <div className="absolute -left-6 top-1 h-4 w-4 rounded-full border-2 border-primary-500 bg-white" />
                        <p className="mb-0.5 text-lg font-bold uppercase tracking-wide text-primary-500">
                          {item.day}
                        </p>
                        <h4 className="mb-2 font-bold text-text-primary">
                          {item.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>

                        {item.optionalActivities && (
                          <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary-50 px-3 py-2">
                            <HiOutlineSparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                            <p className="text-sm text-primary-700">
                              <span className="font-semibold">Optional: </span>
                              {item.optionalActivities}
                            </p>
                          </div>
                        )}
                        {item.specialInformation && (
                          <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2">
                            <HiOutlineInformationCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                            <p className="text-sm text-amber-800">
                              <span className="font-semibold">Note: </span>
                              {item.specialInformation}
                            </p>
                          </div>
                        )}
                        {item.overnight && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <HiOutlineMoon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                            <p className="text-xs italic text-text-secondary">
                              Overnight: {item.overnight}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {(inclusions.length > 0 || exclusions.length > 0) && (
                <div className="mb-10 grid gap-6 sm:grid-cols-2">
                  {inclusions.length > 0 && (
                    <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
                      <h3 className="mb-4 text-lg font-bold text-green-800">
                        Inclusions
                      </h3>
                      <ul className="space-y-2">
                        {inclusions.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                            <span className="text-sm text-green-900">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exclusions.length > 0 && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                      <h3 className="mb-4 text-lg font-bold text-red-800">
                        Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {exclusions.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <HiOutlineXCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                            <span className="text-sm text-red-900">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Highlights (if no itinerary) */}
              {itinerary.length === 0 && highlights.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-bold text-text-primary">
                    Tour Highlights
                  </h3>
                  <ul className="space-y-3">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — booking card + route map */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="order-2 lg:order-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                  <h3 className="mb-1 text-lg font-bold text-text-primary">
                    {tour.title}
                  </h3>
                  <p className="mb-6 text-sm text-text-secondary line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="mb-6 divide-y divide-gray-100">
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-text-secondary">
                        Duration
                      </span>
                      <span className="text-sm font-semibold text-text-primary">
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-text-secondary">
                        Starting from
                      </span>
                      <span className="text-xl font-bold text-primary-600">
                        ${tour.price}
                      </span>
                    </div>
                    {tour.difficulty && (
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-text-secondary">Difficulty</span>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                          tour.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                          tour.difficulty === "Moderate" ? "bg-amber-100 text-amber-700" :
                          tour.difficulty === "Challenging" ? "bg-orange-100 text-orange-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {tour.difficulty}
                        </span>
                      </div>
                    )}
                    {/* <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-text-secondary">
                        Rating
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-text-primary">
                        <HiOutlineStar className="h-4 w-4 text-accent" />
                        {tour.rating} / 5
                      </span>
                    </div> */}
                    {(tour.minpax || tour.maxpax || tour.minimum_age) && (
                      <div className="py-3">
                        <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 py-3">
                          {tour.minpax && (
                            <div className="flex flex-col items-center gap-0.5 px-2">
                              <span className="text-base font-bold text-text-primary">{tour.minpax}</span>
                              <span className="text-center text-xs text-text-secondary">Min Pax</span>
                            </div>
                          )}
                          {tour.maxpax && (
                            <div className="flex flex-col items-center gap-0.5 px-2">
                              <span className="text-base font-bold text-text-primary">{tour.maxpax}</span>
                              <span className="text-center text-xs text-text-secondary">Max Pax</span>
                            </div>
                          )}
                          {tour.minimum_age && (
                            <div className="flex flex-col items-center gap-0.5 px-2">
                              <span className="text-base font-bold text-text-primary">{tour.minimum_age}+</span>
                              <span className="text-center text-xs text-text-secondary">Min Age</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-text-secondary">
                        Customizable
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        100%
                      </span>
                    </div>
                  </div>

                  {/* Primary — pay deposit */}
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-800"
                  >
                    <HiOutlineCreditCard className="h-5 w-5" />
                    Book & Pay Deposit
                  </button>

                  {/* Secondary — WhatsApp */}
                  <a
                    href={`https://wa.me/94707485177?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(tour.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-500 px-6 py-3 text-sm font-bold text-green-600 transition hover:bg-green-500 hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enquire on WhatsApp
                  </a>
                  <p className="mt-3 text-center text-xs text-text-secondary">
                    Secured by PayHere · Balance payable on arrival
                  </p>
                </div>

                {/* Route Map — inside sticky wrapper so it scrolls with the booking card */}
                {tour.map_image && (
                  <div className="order-1 lg:order-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-bold text-text-primary">
                      Route Map
                    </h3>
                    <img
                      src={tour.map_image}
                      alt={`${tour.title} route map`}
                      className="w-full rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {tour && (
        <BookingModal
          tour={tour}
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </>
  );
}
