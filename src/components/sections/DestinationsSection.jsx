import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const destinations = [
  {
    name: "Sigiriya",
    tagline: "Ancient Lion Rock Fortress",
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=700&q=80",
  },
  {
    name: "Galle",
    tagline: "Dutch Colonial Fort & Beaches",
    image: "https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=700&q=80",
  },
  {
    name: "Ella",
    tagline: "Nine Arches & Misty Mountains",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=700&q=80",
  },
  {
    name: "Kandy",
    tagline: "Temple of the Sacred Tooth",
    image: "https://images.unsplash.com/photo-1562698013-ac13558052cd?w=700&q=80",
  },
  {
    name: "Mirissa",
    tagline: "Whale Watching & Golden Sands",
    image: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?w=700&q=80",
  },
  {
    name: "Yala",
    tagline: "Leopard & Elephant Safaris",
    image: "https://images.unsplash.com/photo-1621847473222-d85c022cbf07?w=700&q=80",
  },
  {
    name: "Nuwara Eliya",
    tagline: "Emerald Tea Plantations",
    image: "https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=700&q=80",
  },
  {
    name: "Colombo",
    tagline: "Vibrant Capital City",
    image: "https://images.unsplash.com/photo-1623595289196-007a22dd8560?w=700&q=80",
  },
  {
    name: "Trincomalee",
    tagline: "Pristine East Coast Beaches",
    image: "https://images.unsplash.com/photo-1525849306000-cc26ceb5c1d7?w=700&q=80",
  },
  {
    name: "Dambulla",
    tagline: "Golden Cave Temples",
    image: "https://images.unsplash.com/photo-1704798690646-92524b61ce03?w=700&q=80",
  },
  {
    name: "Polonnaruwa",
    tagline: "Medieval Ancient Capital",
    image: "https://images.unsplash.com/photo-1566299589192-bdf059d4b0be?w=700&q=80",
  },
  {
    name: "Arugam Bay",
    tagline: "World-Class Surf & Seafood",
    image: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=700&q=80",
  },
];

export default function DestinationsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Popular Destinations"
          title="Explore Sri Lanka"
          description="From misty highlands to golden coasts — discover the island's most captivating places."
        />
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to="/itineraries"
                className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-bold text-white md:text-lg leading-tight">
                    {dest.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-300 leading-snug">{dest.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
