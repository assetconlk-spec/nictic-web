import { Link } from "react-router";
import { HiOutlineClock, HiArrowRight } from "react-icons/hi2";
import AnimatedSection from "../shared/AnimatedSection";

export default function TourCard({ tour, index = 0 }) {
  const price = tour.price?.startsWith("From") ? tour.price : `From $${tour.price}`;

  return (
    <AnimatedSection delay={index * 0.1}>
      <Link to={`/itineraries/${tour.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <div className="relative overflow-hidden aspect-4/3">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
            {tour.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors">
            {tour.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-text-secondary leading-relaxed">
            {tour.description}
          </p>

          {tour.duration && (
            <div className="mb-5 flex items-center gap-1 text-sm text-text-secondary">
              <HiOutlineClock className="h-4 w-4" />
              {tour.duration}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-gray-900">{price}</span>
            <span className="flex items-center gap-1 text-sm font-bold text-gray-700 transition-colors group-hover:text-primary-600">
              View Details
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
