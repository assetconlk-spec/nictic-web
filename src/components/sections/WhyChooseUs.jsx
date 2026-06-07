import AnimatedSection from "../shared/AnimatedSection";
import { features } from "../../data/features";

export default function WhyChooseUs() {
  return (
    <section className="bg-blue-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">

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

        {/*
          2×2 grid — NO card boxes, NO borders, NO shadows.
          Items float directly on the blue-50 background.
        */}
        <div className="grid gap-x-20 gap-y-12 sm:grid-cols-2">
          {features.map((f, i) => (
            <AnimatedSection key={f.bold} delay={i * 0.1}>
              <div className="flex items-start gap-5">
                <f.icon className="mt-1 h-10 w-10 shrink-0 text-gray-400" strokeWidth={1.3} />
                <div>
                  <p className="mb-1.5 text-base leading-snug text-text-primary">
                    <span className="font-extrabold">{f.bold}</span>
                    {f.rest && <span className="font-normal text-text-primary"> {f.rest}</span>}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary">{f.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
