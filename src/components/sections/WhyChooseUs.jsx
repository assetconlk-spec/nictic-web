import SectionHeading from "../ui/SectionHeading";
import FeatureCard from "../ui/FeatureCard";
import { features } from "../../data/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Why Choose Us"
          title="We craft unforgettable Sri Lankan Journeys"
          description="We combine local expertise with world-class service to deliver experiences that go beyond ordinary tourism."
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
