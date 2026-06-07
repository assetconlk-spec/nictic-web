import { Link } from "react-router";
import AnimatedSection from "../shared/AnimatedSection";

const services = [
  {
    num: "01",
    label: "Itineraries",
    title: "Curated Multi-Day Tours",
    description:
      "Expertly crafted journeys through Sri Lanka's ancient cities, misty highlands, wildlife parks, and golden coastlines.",
    features: ["2 – 14 day packages", "Private & group tours", "Fully customisable"],
    cta: "Browse Itineraries",
    to: "/tours",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
  },
  {
    num: "02",
    label: "Taxi & Transfers",
    title: "Reliable Road Transfers",
    description:
      "Airport pickups, city transfers, and tuk-tuk adventures. Comfortable, on-time, and priced fairly for every budget.",
    features: ["Airport pickup & drop", "City & intercity transfers", "Tuk-tuk day tours"],
    cta: "Book a Taxi",
    to: "/taxi",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
        <path d="M5 12h14M8 7l-1 5M16 7l1 5" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "Activities",
    title: "Adventures & Experiences",
    description:
      "From scuba diving in Hikkaduwa to hiking Adam's Peak at dawn — unique experiences that make your trip unforgettable.",
    features: ["Water sports & diving", "Hiking & trekking", "Wildlife & cultural tours"],
    cta: "See Activities",
    to: "/activities",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20l7-11 4 5 3-4 6 10H2z" />
        <circle cx="18" cy="6" r="2" />
        <path d="M18 4V2M18 10v-2M16 6h-2M22 6h-2" />
      </svg>
    ),
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            What We Offer
          </span>
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            One Platform, Three Services
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-text-secondary">
            Everything you need for the perfect Sri Lanka trip — in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.label} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-t-4 border-primary-500 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Faint background number */}
                <span className="absolute right-5 top-4 select-none text-6xl font-black leading-none text-primary-100">
                  {svc.num}
                </span>

                <div className="relative flex flex-1 flex-col p-8">

                  {/* Icon */}
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svc.Icon />
                  </div>

                  {/* Label */}
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-text-secondary">
                    {svc.label}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-extrabold leading-tight text-text-primary">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {svc.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-8 space-y-2.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                        <svg className="h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      to={svc.to}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 transition-all hover:text-primary-700"
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
