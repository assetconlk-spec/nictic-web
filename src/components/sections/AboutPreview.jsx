import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import AnimatedSection from "../shared/AnimatedSection";
import { pb } from "../../lib/pocketbase";

const FALLBACK_MAIN = "/images/aboutUs/about-us-img-1.webp";
const FALLBACK_OVERLAY = "/images/aboutUs/about-us-img-2.webp";

export default function AboutPreview() {
  const [mainImg, setMainImg] = useState(FALLBACK_MAIN);
  const [overlayImg, setOverlayImg] = useState(FALLBACK_OVERLAY);

  useEffect(() => {
    pb.collection("about_preview")
      .getFirstListItem("", { requestKey: null })
      .then((record) => {
        const main = record.main_image
          ? pb.files.getURL(record, record.main_image)
          : record.main_image_url || FALLBACK_MAIN;
        const overlay = record.overlay_image
          ? pb.files.getURL(record, record.overlay_image)
          : record.overlay_image_url || FALLBACK_OVERLAY;
        setMainImg(main || FALLBACK_MAIN);
        setOverlayImg(overlay || FALLBACK_OVERLAY);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Images */}
          <AnimatedSection>
            <div className="relative">
              <img
                src={mainImg}
                alt="Sri Lanka landscape"
                className="w-full rounded-2xl object-cover shadow-lg aspect-4/3"
              />
              <img
                src={overlayImg}
                alt="Temple of the Tooth"
                className="absolute -bottom-8 -right-4 hidden w-56 rounded-2xl border-4 border-white shadow-xl md:block lg:w-64"
              />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
              About Us
            </span>
            <h2 className="mb-6 text-3xl font-bold text-text-primary md:text-4xl">
              Your Gateway to Authentic Sri Lankan Experiences
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">
              Our story began with a simple idea — and a lot of encouragement.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-text-secondary">
              After more than 20 years of experience as a trusted tour guide,
              our founder built lasting relationships with travelers from around
              the world. Time and again, those same clients returned not just
              for another journey, but with a request:
            </p>
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              "Why don't you start your own travel agency?"
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary-500 transition-colors hover:text-primary-600"
            >
              Learn More About Us
              <HiArrowRight className="h-5 w-5" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
