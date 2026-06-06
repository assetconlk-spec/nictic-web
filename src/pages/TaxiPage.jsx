import { useEffect } from "react";
import { Link } from "react-router";
import AnimatedSection from "../components/shared/AnimatedSection";

const WA = "https://wa.me/94707485177";

const services = [
  {
    title: "Airport Pickup",
    desc: "Meet & greet at Colombo (CMB) or Mattala (MRI). We track your flight and wait for you — no extra charge for delays.",
    features: ["Flight tracking included", "Name-board greeting", "24 / 7 availability"],
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-600",
  },
  {
    title: "Airport Drop",
    desc: "Reach the airport stress-free. We pick you up from your hotel or villa and get you there with time to spare.",
    features: ["On-time guarantee", "All areas of Sri Lanka", "Luggage assistance"],
    color: "bg-green-50 border-green-100",
    accent: "text-green-600",
  },
  {
    title: "City & Intercity",
    desc: "Point-to-point transfers between any two cities or attractions. Colombo, Galle, Kandy, Ella — we cover it all.",
    features: ["Fixed price, no meter", "AC vehicles", "Flexible departure time"],
    color: "bg-purple-50 border-purple-100",
    accent: "text-purple-600",
  },
  {
    title: "Tuk-tuk Tours",
    desc: "Experience Sri Lanka the local way. Half or full-day tuk-tuk adventures through markets, temples, and hidden streets.",
    features: ["Half & full day options", "Local driver-guide", "Most fun way to explore"],
    color: "bg-amber-50 border-amber-100",
    accent: "text-amber-600",
  },
];

const vehicles = [
  {
    name: "Tuk-tuk",
    capacity: "1 – 2 pax",
    luggage: "Small bags only",
    best: "Local sightseeing, short hops",
    tag: "Most Fun",
    tagColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=600&q=80",
  },
  {
    name: "Sedan",
    capacity: "1 – 3 pax",
    luggage: "2 – 3 suitcases",
    best: "Airport runs, city transfers",
    tag: "Most Popular",
    tagColor: "bg-primary-500",
    image: "https://images.unsplash.com/photo-1623595289196-007a22dd8560?w=600&q=80",
  },
  {
    name: "SUV / CRV",
    capacity: "1 – 4 pax",
    luggage: "4 – 5 suitcases",
    best: "Family trips, hill country",
    tag: "Best Comfort",
    tagColor: "bg-green-600",
    image: "https://images.unsplash.com/photo-1550679193-d8ec2f2c3a25?w=600&q=80",
  },
  {
    name: "Minivan",
    capacity: "5 – 12 pax",
    luggage: "Group luggage",
    best: "Group tours, long distance",
    tag: "Groups",
    tagColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1704797390325-b057758d8c3d?w=600&q=80",
  },
];

const steps = [
  { num: "01", title: "Message Us",     desc: "Send your pickup location, destination, date and time via WhatsApp." },
  { num: "02", title: "Get a Quote",    desc: "We reply with a fixed price — no hidden fees, no surge pricing." },
  { num: "03", title: "Confirm & Relax", desc: "Pay on arrival. Your driver will be there on time, every time." },
];

export default function TaxiPage() {
  useEffect(() => { document.title = "Taxi & Transfers | nictic.travel"; }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gray-900 pb-0">
        <img
          src="https://images.unsplash.com/photo-1583653319049-4db347571740?w=1600&q=80"
          alt="Taxi Sri Lanka"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
            Taxi & Transfers
          </span>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Get Around<br />
            <span className="text-amber-400">Sri Lanka</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-gray-300">
            Airport pickups, intercity transfers, and tuk-tuk adventures.
            Fixed prices. Friendly drivers. Always on time.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`${WA}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20taxi%20transfer`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book on WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
            >
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">Our Services</span>
            <h2 className="text-3xl font-bold text-text-primary md:text-4xl">What We Offer</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className={`h-full rounded-2xl border p-6 ${s.color}`}>
                  <h3 className={`mb-2 text-lg font-bold ${s.accent}`}>{s.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">Simple Process</span>
          <h2 className="mb-12 text-3xl font-bold text-text-primary md:text-4xl">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute top-8 left-1/2 hidden h-0.5 w-full bg-gray-200 md:block" />
                  )}
                  <div className="relative flex flex-col items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg">
                      <span className="text-lg font-extrabold text-white">{step.num}</span>
                    </div>
                    <span className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-500">{step.num}</span>
                    <h3 className="mb-2 text-lg font-bold text-text-primary">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vehicles ── */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">Fleet</span>
            <h2 className="text-3xl font-bold text-text-primary md:text-4xl">Choose Your Vehicle</h2>
            <p className="mt-3 text-text-secondary">All vehicles are air-conditioned, well-maintained, and driven by experienced locals.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((v, i) => (
              <AnimatedSection key={v.name} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-44 overflow-hidden">
                    <img src={v.image} alt={v.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white ${v.tagColor}`}>{v.tag}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-3 text-lg font-bold text-text-primary">{v.name}</h3>
                    <div className="space-y-1.5 text-xs text-text-secondary">
                      <p>{v.capacity}</p>
                      <p>{v.luggage}</p>
                      <p>{v.best}</p>
                    </div>
                    <a
                      href={`${WA}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20${encodeURIComponent(v.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full rounded-xl bg-green-500 py-2.5 text-center text-xs font-bold text-white transition hover:bg-green-600"
                    >
                      Book this vehicle
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="bg-amber-500 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-white md:text-4xl">Ready to Book?</h2>
          <p className="mb-8 text-amber-100">
            Message us on WhatsApp with your pickup details and we'll get back to you in minutes.
          </p>
          <a
            href={`${WA}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20taxi%20transfer`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-amber-600 shadow-lg transition hover:shadow-xl hover:scale-105"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </>
  );
}
