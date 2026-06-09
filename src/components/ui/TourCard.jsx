import { Link } from "react-router";
import { HiOutlineClock, HiOutlineUsers } from "react-icons/hi2";
import AnimatedSection from "../shared/AnimatedSection";

const difficultyClass = {
  Easy: "bg-green-500 text-white",
  Moderate: "bg-amber-500 text-white",
  Hard: "bg-orange-500 text-white",
};

export default function TourCard({ tour, index = 0 }) {
  const price = tour.price?.startsWith("From") ? tour.price : `From $${tour.price}`;

  return (
    <AnimatedSection delay={index * 0.1}>
      <Link
        to={`/itineraries/${tour.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white">
            {tour.category}
          </span>
          {tour.difficulty && (
            <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold ${difficultyClass[tour.difficulty] ?? "bg-orange-500 text-white"}`}>
              {tour.difficulty}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1.5 text-lg font-bold text-text-primary group-hover:text-primary-600 transition-colors leading-snug">
            {tour.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary flex-1">
            {tour.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {tour.duration && (
              <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                <HiOutlineClock className="h-3.5 w-3.5" /> {tour.duration}
              </span>
            )}
            {tour.minpax && tour.maxpax && (
              <span className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-text-secondary">
                <HiOutlineUsers className="h-3.5 w-3.5" /> {tour.minpax}–{tour.maxpax} pax
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-xl font-extrabold text-gray-900">{price}</span>
            <span className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700 transition group-hover:bg-primary-600 group-hover:text-white">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
