import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const experiences = [
  {
    category: "Cultural",
    title: "Cultural Immersion",
    description: "Ancient temples, colonial forts, and sacred cities spanning 2,500 years of history.",
    image: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=800&q=80",
  },
  {
    category: "Beach",
    title: "Beach & Coast",
    description: "Pristine shores from the sun-soaked south to the turquoise east coast.",
    image: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=800&q=80",
  },
  {
    category: "Adventure",
    title: "Adventure & Trails",
    description: "Trek misty peaks, cycle through tea country, and ride the world-famous scenic railway.",
    image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=800&q=80",
  },
  {
    category: "Wildlife",
    title: "Wildlife Safari",
    description: "Spot leopards, elephants, and blue whales roaming free in their natural habitats.",
    image: "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=800&q=80",
  },
  {
    category: "Wellness",
    title: "Ayurveda & Wellness",
    description: "Ancient healing traditions, yoga retreats, and award-winning spa sanctuaries.",
    image: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=800&q=80",
  },
  {
    category: "Culinary",
    title: "Culinary Journeys",
    description: "Spice markets, cooking classes, and street food that tells a thousand stories.",
    image: "https://images.unsplash.com/photo-1609681980718-340e7f4b11d7?w=800&q=80",
  },
];

export default function ExperiencesSection() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Things To Do"
          title="Experiences & Activities"
          description="Every type of traveller finds their perfect Sri Lanka — what's yours?"
        />
        <AnimatedSection>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => (
              <Link
                key={exp.category}
                to={`/tours`}
                className="group relative block h-72 overflow-hidden rounded-2xl"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {exp.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-200 line-clamp-2">
                    {exp.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-300 transition group-hover:gap-2">
                    Explore tours
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
