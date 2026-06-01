import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const destinations = [
  {
    name: "Sigiriya",
    tagline: "Ancient Lion Rock Fortress",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52c145?w=700&q=80",
  },
  {
    name: "Galle",
    tagline: "Dutch Colonial Fort & Beaches",
    image: "https://images.unsplash.com/photo-1546190255-431e2ed00460?w=700&q=80",
  },
  {
    name: "Ella",
    tagline: "Nine Arches & Misty Mountains",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  },
  {
    name: "Kandy",
    tagline: "Temple of the Sacred Tooth",
    image: "https://images.unsplash.com/photo-1567745219985-db1564fa7a0f?w=700&q=80",
  },
  {
    name: "Mirissa",
    tagline: "Whale Watching & Golden Sands",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
  },
  {
    name: "Yala",
    tagline: "Leopard & Elephant Safaris",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=700&q=80",
  },
  {
    name: "Nuwara Eliya",
    tagline: "Emerald Tea Plantations",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=700&q=80",
  },
  {
    name: "Colombo",
    tagline: "Vibrant Capital City",
    image: "https://images.unsplash.com/photo-1589474823155-cdae2a26c0e5?w=700&q=80",
  },
  {
    name: "Trincomalee",
    tagline: "Pristine East Coast Beaches",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
  },
  {
    name: "Dambulla",
    tagline: "Golden Cave Temples",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80",
  },
  {
    name: "Polonnaruwa",
    tagline: "Medieval Ancient Capital",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
  },
  {
    name: "Arugam Bay",
    tagline: "World-Class Surf & Seafood",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80",
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
                to="/tours"
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
