import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const vehicles = [
  {
    name: "Tuk-tuk",
    emoji: "🛺",
    capacity: "1–2 pax",
    ideal: "Local city tours, short hops",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    tag: "Most Fun",
  },
  {
    name: "Sedan",
    emoji: "🚗",
    capacity: "1–3 pax",
    ideal: "Airport transfers, city trips",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80",
    tag: "Most Popular",
  },
  {
    name: "SUV",
    emoji: "🚙",
    capacity: "1–4 pax",
    ideal: "Family trips, hill country",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80",
    tag: "Best Comfort",
  },
  {
    name: "Minivan",
    emoji: "🚐",
    capacity: "5–12 pax",
    ideal: "Groups, long-distance tours",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&q=80",
    tag: "Groups",
  },
];

const services = [
  { icon: "✈️", title: "Airport Pickup",   desc: "CMB & MRI — meet & greet, all hours" },
  { icon: "🏨", title: "Airport Drop",     desc: "Hotel to airport, never miss a flight" },
  { icon: "🏙️", title: "City Transfers",  desc: "Point-to-point across any city" },
  { icon: "🛺", title: "Tuk-tuk Tours",   desc: "Half & full day local adventures" },
];

export default function TaxiSection() {
  const waLink = "https://wa.me/94707485177?text=Hi%2C%20I%27d%20like%20to%20book%20a%20taxi%20transfer";

  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Left — text */}
          <AnimatedSection>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
              Taxi & Transfers
            </span>
            <h2 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
              Get Around Sri Lanka{" "}
              <span className="text-primary-600">Stress-Free</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              Airport pickups, intercity transfers, and tuk-tuk day tours —
              all bookable instantly on WhatsApp. Fixed prices, no surprises.
            </p>

            {/* Service list */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {services.map((s) => (
                <div key={s.title} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{s.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book on WhatsApp
              </a>
              <Link
                to="/taxi"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-600 px-6 py-3 text-sm font-bold text-primary-600 transition hover:bg-primary-600 hover:text-white"
              >
                View All Services
              </Link>
            </div>
          </AnimatedSection>

          {/* Right — vehicle cards */}
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {vehicles.map((v) => (
                <div
                  key={v.name}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-0.5 duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Tag */}
                  <span className="absolute top-3 left-3 rounded-full bg-primary-500 px-2.5 py-0.5 text-xs font-bold text-white">
                    {v.tag}
                  </span>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{v.emoji}</span>
                      <h4 className="font-bold text-text-primary">{v.name}</h4>
                    </div>
                    <p className="text-xs font-semibold text-primary-600 mb-0.5">{v.capacity}</p>
                    <p className="text-xs text-text-secondary leading-snug">{v.ideal}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
