import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const editorials = [
  {
    label: "Top Picks",
    title: "Best Beaches in Sri Lanka",
    image: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=700&q=80",
    to: "/tours",
  },
  {
    label: "Hidden Gems",
    title: "Scenic Train Journeys",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=700&q=80",
    to: "/tours",
  },
  {
    label: "Adventure",
    title: "Top Treks & Hikes",
    image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=700&q=80",
    to: "/tours",
  },
  {
    label: "Wildlife",
    title: "Best Safari Parks",
    image: "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=700&q=80",
    to: "/tours",
  },
  {
    label: "Culture",
    title: "UNESCO Heritage Sites",
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=700&q=80",
    to: "/tours",
  },
];

export default function EditorialSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Best of Sri Lanka"
          title="Curated Travel Guides"
          description="Hand-picked by our experts — the very best Sri Lanka has to offer."
        />
        <AnimatedSection>
          {/* Desktop: horizontal scroll strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {editorials.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group relative block shrink-0 w-52 md:w-auto overflow-hidden rounded-2xl snap-start"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="mb-1.5 inline-block rounded-full bg-primary-500/80 px-2.5 py-0.5 text-xs font-semibold text-white">
                    {item.label}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug md:text-base">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
        <div className="mt-10 text-center">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-8 py-3 text-sm font-bold text-primary-600 transition hover:bg-primary-600 hover:text-white"
          >
            View All Itineraries
          </Link>
        </div>
      </div>
    </section>
  );
}
