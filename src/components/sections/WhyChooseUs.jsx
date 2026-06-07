import AnimatedSection from "../shared/AnimatedSection";
import { features } from "../../data/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
            Why nictic
          </span>
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            We Craft Unforgettable Sri Lankan Journeys
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-text-secondary">
            Local expertise, global standards — experiences that go far beyond ordinary tourism.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <AnimatedSection key={f.bold} delay={i * 0.1}>
              <div className="group flex gap-5 rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                  <f.icon className="h-7 w-7" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="mb-2 text-lg leading-snug text-text-primary">
                    <span className="font-extrabold">{f.bold}</span>
                    {f.rest && <span className="font-normal"> {f.rest}</span>}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {f.description}
                  </p>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
