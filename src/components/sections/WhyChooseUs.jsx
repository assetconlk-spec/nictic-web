import SectionHeading from "../ui/SectionHeading";
import FeatureCard from "../ui/FeatureCard";
import { features } from "../../data/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Why nictic"
          title="We craft unforgettable Sri Lankan journeys"
          description="Local expertise, global standards — experiences that go far beyond ordinary tourism."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
