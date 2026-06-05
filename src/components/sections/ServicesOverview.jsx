import { Link } from "react-router";
import AnimatedSection from "../shared/AnimatedSection";

const services = [
  {
    label: "Itineraries",
    title: "Curated Multi-Day Tours",
    description:
      "Expertly crafted journeys through Sri Lanka's ancient cities, misty highlands, wildlife parks, and golden coastlines.",
    features: ["2 – 14 day packages", "Private & group tours", "Fully customisable"],
    cta: "Browse Itineraries",
    to: "/tours",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=900&q=80",
    accent: "from-primary-600 to-primary-800",
    badge: "🗺️",
  },
  {
    label: "Taxi & Transfers",
    title: "Reliable Road Transfers",
    description:
      "Airport pickups, city transfers, and tuk-tuk adventures. Comfortable, on-time, and priced fairly for every budget.",
    features: ["Airport pickup & drop", "City & intercity transfers", "Tuk-tuk day tours"],
    cta: "Book a Taxi",
    to: "/taxi",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
    accent: "from-amber-600 to-orange-700",
    badge: "🚖",
  },
  {
    label: "Activities",
    title: "Adventures & Experiences",
    description:
      "From scuba diving in Hikkaduwa to hiking Adam's Peak at dawn — unique experiences that make your trip unforgettable.",
    features: ["Water sports & diving", "Hiking & trekking", "Wildlife & cultural tours"],
    cta: "See Activities",
    to: "/activities",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80",
    accent: "from-rose-600 to-pink-800",
    badge: "🏄",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            What We Offer
          </span>
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            One Platform, Three Services
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.label} delay={i * 0.1}>
              <Link
                to={svc.to}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={svc.image}
                    alt={svc.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col justify-end p-7">
                  {/* Badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-3xl">{svc.badge}</span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                      {svc.label}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-extrabold text-white leading-tight">
                    {svc.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-300">
                    {svc.description}
                  </p>

                  {/* Feature list */}
                  <ul className="mb-6 space-y-1.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition group-hover:bg-primary-500 group-hover:text-white w-fit">
                    {svc.cta}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
