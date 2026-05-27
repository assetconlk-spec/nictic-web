import {
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
} from "react-icons/hi2";
import Button from "../ui/Button";
import AnimatedSection from "../shared/AnimatedSection";

const badges = [
  { icon: HiOutlineShieldCheck, label: "Licensed & Certified" },
  { icon: HiOutlineGlobeAlt, label: "International Standards" },
  { icon: HiOutlineHeart, label: "5000+ Happy Travelers" },
];

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        backgroundColor: "#0C2B4E",
        backgroundImage: "url('/images/aboutUs/pattern-bg.png')",
        backgroundRepeat: "repeat",
        backgroundBlendMode: "screen",
      }}
    >
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <AnimatedSection>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Let us craft your perfect Sri Lankan adventure. Contact our travel
            experts today and start planning the journey of a lifetime.
          </p>
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button to="/contact" variant="accent" size="lg" className="w-48">
              Start Plan
            </Button>
            <Button to="/tours" variant="white" size="lg" className="w-48">
              Browse Tours
            </Button>
          </div>
        </AnimatedSection>

        {/* Trust badges */}
        {/* <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-gray-300"
              >
                <Icon className="h-6 w-6 text-primary-300" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection> */}
      </div>
    </section>
  );
}
