import AnimatedSection from "../shared/AnimatedSection";

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <AnimatedSection delay={index * 0.1} className="h-full">
      <div className="group h-full rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:border-primary-200 hover:shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-text-primary">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}
