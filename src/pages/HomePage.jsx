import { useEffect } from "react";
import HeroSlider from "../components/sections/HeroSlider";
import AboutPreview from "../components/sections/AboutPreview";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import FeaturedTours from "../components/sections/FeaturedTours";
import GalleryPreview from "../components/sections/GalleryPreview";
import CTASection from "../components/sections/CTASection";
import { stats } from "../data/stats";

export default function HomePage() {
  useEffect(() => {
    document.title = "Gajalanka Tours | Sri Lanka Tourism";
  }, []);

  return (
    <>
      {/* Hero + stats bar share one viewport height */}
      <div
        className="flex flex-col"
        style={{ height: "calc(100vh - 36px)" }}
      >
        <HeroSlider />
        <div
          style={{
            backgroundImage: "url('/images/aboutUs/pattern-bg.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundColor: "#0C2B4E",
            backgroundBlendMode: "screen",
          }}
        >
          <div className="mx-auto max-w-4xl px-4 py-5 text-center">
            <div className="flex items-center justify-center gap-6">
              <div className="h-px flex-1 bg-white/20" />
              <div>
                <div className="text-3xl font-extrabold text-white lg:text-4xl">
                  {stats[0]?.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-widest text-white/60">
                  {stats[0]?.label}
                </div>
              </div>
              <div className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
      <AboutPreview />
      <WhyChooseUs />
      <FeaturedTours />
      <GalleryPreview />
      <CTASection />
    </>
  );
}
