import { Link } from "react-router";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../shared/AnimatedSection";

const activities = [
  { title: "Scuba Diving",       location: "Hikkaduwa",           duration: "Half day",   difficulty: "Beginner friendly", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=700&q=80", tag: "Water" },
  { title: "Surfing",            location: "Arugam Bay / Weligama", duration: "2–3 hrs",   difficulty: "All levels",        image: "https://images.unsplash.com/photo-1583653319049-4db347571740?w=700&q=80", tag: "Water" },
  { title: "Whale Watching",     location: "Mirissa",              duration: "4–5 hrs",   difficulty: "Easy",              image: "https://images.unsplash.com/photo-1568430328012-21ed450453ea?w=700&q=80", tag: "Wildlife" },
  { title: "Adam's Peak Hike",   location: "Nallathanniya",        duration: "5–6 hrs",   difficulty: "Moderate",          image: "https://images.unsplash.com/photo-1598955890270-d77cdb06d2bb?w=700&q=80", tag: "Hiking" },
  { title: "White Water Rafting", location: "Kitulgala",           duration: "2–3 hrs",   difficulty: "Thrilling",         image: "https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?w=700&q=80", tag: "Adventure" },
  { title: "Hot Air Balloon",    location: "Dambulla",             duration: "1 hr flight", difficulty: "Easy",            image: "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?w=700&q=80", tag: "Adventure" },
];

const tagColors = {
  Water:     "bg-blue-500",
  Wildlife:  "bg-green-600",
  Hiking:    "bg-amber-600",
  Adventure: "bg-rose-500",
};

export default function ActivitiesSection() {
  const waBase = "https://wa.me/94707485177?text=Hi%2C%20I%27d%20like%20to%20book%20";

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Activities"
          title="Adventures Across Sri Lanka"
          description="Thrilling, relaxing, or somewhere in between — find the experience that's made for you."
        />

        <AnimatedSection>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((act) => (
              <div
                key={act.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white ${tagColors[act.tag]}`}>
                    {act.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-1 text-lg font-bold text-text-primary">{act.title}</h3>
                  <p className="mb-3 flex items-center gap-1 text-sm text-text-secondary">
                    <svg className="h-3.5 w-3.5 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {act.location}
                  </p>

                  <div className="mb-4 flex gap-3">
                    <span className="rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                      ⏱ {act.duration}
                    </span>
                    <span className="rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                      {act.difficulty}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <a
                      href={`${waBase}${encodeURIComponent(act.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-600"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Book Now
                    </a>
                    <Link
                      to="/activities"
                      className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary-500 hover:text-primary-600"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-10 text-center">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-600 px-8 py-3 text-sm font-bold text-primary-600 transition hover:bg-primary-600 hover:text-white"
          >
            View All Activities
          </Link>
        </div>
      </div>
    </section>
  );
}
