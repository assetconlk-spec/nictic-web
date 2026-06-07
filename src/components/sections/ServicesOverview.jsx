import { Link } from "react-router";
import AnimatedSection from "../shared/AnimatedSection";

/* ── Per-service inline SVG icons ───────────────────────────── */
function IconItineraries() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Map outline */}
      <path d="M8 14l16-6 16 6 16-6v36l-16 6-16-6-16 6V14z" />
      <path d="M24 8v36M40 14v36" />
      {/* Route dots */}
      <circle cx="32" cy="27" r="4" fill="white" stroke="none" />
      <path d="M32 23c0-4.418 5-8 5-8s-5 3.582-5 8z" fill="white" stroke="none" />
    </svg>
  );
}

function IconTaxi() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Car body */}
      <path d="M10 34l5-12h34l5 12" />
      <rect x="8" y="34" width="48" height="14" rx="3" />
      {/* Wheels */}
      <circle cx="20" cy="50" r="5" fill="white" stroke="none" />
      <circle cx="44" cy="50" r="5" fill="white" stroke="none" />
      <circle cx="20" cy="50" r="2" fill="none" stroke="#00000040" strokeWidth="1.5" />
      <circle cx="44" cy="50" r="2" fill="none" stroke="#00000040" strokeWidth="1.5" />
      {/* Windows */}
      <path d="M17 34l4-10h22l4 10z" fill="white" fillOpacity="0.25" stroke="none" />
      <line x1="32" y1="24" x2="32" y2="34" />
    </svg>
  );
}

function IconActivities() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Mountain */}
      <path d="M4 52l20-30 10 14 8-10 18 26H4z" />
      {/* Sun */}
      <circle cx="48" cy="18" r="6" />
      <line x1="48" y1="8" x2="48" y2="6" />
      <line x1="48" y1="28" x2="48" y2="30" />
      <line x1="38" y1="18" x2="36" y2="18" />
      <line x1="58" y1="18" x2="60" y2="18" />
      <line x1="41" y1="11" x2="40" y2="10" />
      <line x1="55" y1="25" x2="56" y2="26" />
      <line x1="41" y1="25" x2="40" y2="26" />
      <line x1="55" y1="11" x2="56" y2="10" />
    </svg>
  );
}

const services = [
  {
    label: "Itineraries",
    title: "Curated Multi-Day Tours",
    description:
      "Expertly crafted journeys through Sri Lanka's ancient cities, misty highlands, wildlife parks, and golden coastlines.",
    features: ["2 – 14 day packages", "Private & group tours", "Fully customisable"],
    cta: "Browse Itineraries",
    to: "/tours",
    gradient: "from-primary-500 to-primary-700",
    accentBg: "bg-primary-50",
    accentText: "text-primary-700",
    badgeBg: "bg-primary-100",
    dot: "bg-primary-400",
    Icon: IconItineraries,
  },
  {
    label: "Taxi & Transfers",
    title: "Reliable Road Transfers",
    description:
      "Airport pickups, city transfers, and tuk-tuk adventures. Comfortable, on-time, and priced fairly for every budget.",
    features: ["Airport pickup & drop", "City & intercity transfers", "Tuk-tuk day tours"],
    cta: "Book a Taxi",
    to: "/taxi",
    gradient: "from-amber-400 to-orange-600",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
    badgeBg: "bg-amber-100",
    dot: "bg-amber-400",
    Icon: IconTaxi,
  },
  {
    label: "Activities",
    title: "Adventures & Experiences",
    description:
      "From scuba diving in Hikkaduwa to hiking Adam's Peak at dawn — unique experiences that make your trip unforgettable.",
    features: ["Water sports & diving", "Hiking & trekking", "Wildlife & cultural tours"],
    cta: "See Activities",
    to: "/activities",
    gradient: "from-rose-500 to-pink-700",
    accentBg: "bg-rose-50",
    accentText: "text-rose-700",
    badgeBg: "bg-rose-100",
    dot: "bg-rose-400",
    Icon: IconActivities,
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            What We Offer
          </span>
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            One Platform, Three Services
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Everything you need for the perfect Sri Lanka trip — in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.label} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">

                {/* Coloured icon section */}
                <div className={`relative flex flex-col items-center justify-center bg-linear-to-br ${svc.gradient} px-8 py-10 overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
                  <div className="absolute top-4 left-8 h-3 w-3 rounded-full bg-white/20" />
                  <div className="absolute bottom-6 right-10 h-2 w-2 rounded-full bg-white/30" />

                  {/* Icon circle */}
                  <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                    <svc.Icon />
                  </div>

                  {/* Label */}
                  <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    {svc.label}
                  </span>
                </div>

                {/* Content section */}
                <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                  <h3 className="mb-2 text-xl font-extrabold leading-tight text-text-primary">
                    {svc.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                    {svc.description}
                  </p>

                  <ul className="mb-7 space-y-2.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                        <span className={`h-2 w-2 rounded-full shrink-0 ${svc.dot}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      to={svc.to}
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${svc.accentBg} ${svc.accentText} hover:opacity-80`}
                    >
                      {svc.cta}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
