import { Link } from "react-router";
import { HiOutlineClock } from "react-icons/hi2";
import AnimatedSection from "../shared/AnimatedSection";

export default function TourCard({ tour, index = 0 }) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <Link to={`/tours/${tour.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
            {tour.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors">
            {tour.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-text-secondary leading-relaxed">
            {tour.description}
          </p>

          {/* Meta */}
          <div className="mb-4 flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <HiOutlineClock className="h-4 w-4" />
              {tour.duration}
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-text-secondary">From </span>
              <span className="text-2xl font-bold text-primary-600">${tour.price}</span>
            </div>
            <span className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-primary-700">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
