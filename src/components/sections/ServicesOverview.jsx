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
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=900&q=80",
    accent: "bg-primary-500",
    accentLight: "bg-primary-50",
    accentText: "text-primary-600",
    dotColor: "bg-primary-400",
    overlay: "from-primary-900/60 to-primary-900/10",
  },
  {
    label: "Taxi & Transfers",
    title: "Reliable Road Transfers",
    description:
      "Airport pickups, city transfers, and tuk-tuk adventures. Comfortable, on-time, and priced fairly for every budget.",
    features: ["Airport pickup & drop", "City & intercity transfers", "Tuk-tuk day tours"],
    cta: "Book a Taxi",
    to: "/taxi",
    image: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=900&q=80",
    accent: "bg-amber-500",
    accentLight: "bg-amber-50",
    accentText: "text-amber-600",
    dotColor: "bg-amber-400",
    overlay: "from-amber-900/60 to-amber-900/10",
  },
  {
    label: "Activities",
    title: "Adventures & Experiences",
    description:
      "From scuba diving in Hikkaduwa to hiking Adam's Peak at dawn — unique experiences that make your trip unforgettable.",
    features: ["Water sports & diving", "Hiking & trekking", "Wildlife & cultural tours"],
    cta: "See Activities",
    to: "/activities",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=900&q=80",
    accent: "bg-rose-500",
    accentLight: "bg-rose-50",
    accentText: "text-rose-600",
    dotColor: "bg-rose-400",
    overlay: "from-rose-900/60 to-rose-900/10",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            What We Offer
          </span>
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            One Platform, Three Services
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.label} delay={i * 0.1}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                {/* Image panel */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle bottom fade into white card */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />

                  {/* Label badge top-left */}
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white ${svc.accent}`}>
                    {svc.label}
                  </span>
                </div>

                {/* Text panel */}
                <div className="flex flex-1 flex-col px-7 pb-7 pt-4">
                  <h3 className="mb-2 text-xl font-extrabold leading-tight text-text-primary">
                    {svc.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                    {svc.description}
                  </p>

                  {/* Feature list */}
                  <ul className="mb-7 space-y-2">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                        <span className={`h-2 w-2 rounded-full shrink-0 ${svc.dotColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      to={svc.to}
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${svc.accentLight} ${svc.accentText} hover:opacity-80`}
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
