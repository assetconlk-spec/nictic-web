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
} from "react-icons/hi2";
import { pb } from "../lib/pocketbase";
import PageLoader from "../components/shared/PageLoader";

export default function TourDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      try {
        const data = await pb
          .collection("tours")
          .getFirstListItem(`slug="${slug}"`);
        setTour({
          ...data,
          image: data.image
            ? pb.files.getURL(data, data.image)
            : data.image_url || "",
          map_image: data.map_image
            ? pb.files.getURL(data, data.map_image)
            : "",
          highlights: Array.isArray(data.highlights) ? data.highlights : [],
          inclusions: Array.isArray(data.inclusions) ? data.inclusions : [],
          exclusions: Array.isArray(data.exclusions) ? data.exclusions : [],
          itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
        });
        document.title = `${data.title} | Gajalanka Tours`;
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

                  <Link
                    to={`/contact?tour=${encodeURIComponent(tour.title)}`}
                    className="block w-full rounded-xl bg-primary-700 px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-primary-800"
                  >
                    Inquire Now
                  </Link>
                  <p className="mt-3 text-center text-xs text-text-secondary">
                    Plan with Gajalanka Tours
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
    </>
  );
}
