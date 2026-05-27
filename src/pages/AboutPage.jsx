import { useEffect, useState } from "react";
import {
  HiOutlineEye,
  HiOutlineRocketLaunch,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineTrophy,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import AnimatedSection from "../components/shared/AnimatedSection";
import { pb } from "../lib/pocketbase";
import { usePageBanner } from "../hooks/usePageBanner";
import SectionHeading from "../components/ui/SectionHeading";
import StatItem from "../components/ui/StatItem";
import { stats } from "../data/stats";

const values = [
  {
    icon: HiOutlineEye,
    title: "Our Vision",
    description:
      "To be Sri Lanka's most trusted and innovative travel partner, setting the standard for personalized, sustainable tourism experiences.",
  },
  {
    icon: HiOutlineRocketLaunch,
    title: "Our Mission",
    description:
      "To create transformative travel experiences that connect visitors with the authentic heart of Sri Lanka while supporting local communities.",
  },
  {
    icon: HiOutlineHeart,
    title: "Our Values",
    description:
      "Authenticity, sustainability, excellence, and genuine care for every traveler who entrusts us with their Sri Lankan adventure.",
  },
];

const certifications = [
  {
    icon: HiOutlineShieldCheck,
    label: "Sri Lanka Tourism Development Authority Licensed",
  },
  { icon: HiOutlineTrophy, label: "TripAdvisor Certificate of Excellence" },
  { icon: HiOutlineGlobeAlt, label: "IATA Accredited Travel Agent" },
];

const FALLBACK_MAIN = "/images/aboutUs/about-us-img-3.jpg";
const FALLBACK_OVERLAY = "/images/aboutUs/about-us-img-4.jpg";

export default function AboutPage() {
  const banner = usePageBanner("about", "/images/aboutUs/about-banner.png", 70);
  const [storyMain, setStoryMain] = useState(FALLBACK_MAIN);
  const [storyOverlay, setStoryOverlay] = useState(FALLBACK_OVERLAY);

  useEffect(() => {
    document.title = "About Us | Gajalanka Tours ";
    pb.collection("about_preview")
      .getFirstListItem("", { requestKey: null })
      .then((record) => {
        const main = record.story_main_image
          ? pb.files.getURL(record, record.story_main_image)
          : record.story_main_image_url || FALLBACK_MAIN;
        const overlay = record.story_overlay_image
          ? pb.files.getURL(record, record.story_overlay_image)
          : record.story_overlay_image_url || FALLBACK_OVERLAY;
        setStoryMain(main || FALLBACK_MAIN);
        setStoryOverlay(overlay || FALLBACK_OVERLAY);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex items-center justify-center bg-primary-900 pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={banner.src}
            alt="About hero"
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">About Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Learn about our story, our passion for Sri Lanka, and our commitment
            to extraordinary travel.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            <AnimatedSection className="h-full">
              <div className="relative h-full min-h-[400px] pb-8 pr-4 md:pb-10 md:pr-6">
                <img
                  src={storyMain}
                  alt="Our story"
                  className="h-full w-full rounded-2xl object-cover shadow-lg"
                />
                <img
                  src={storyOverlay}
                  alt="Our team"
                  className="absolute -bottom-2 -right-2 hidden w-48 rounded-2xl border-4 border-white shadow-xl md:block lg:w-60"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
                Our Story
              </span>
              <h2 className="mb-6 text-3xl font-bold text-text-primary md:text-4xl">
                A Decade of Crafting Unforgettable Journeys
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Our story began with a simple idea — and a lot of encouragement.
                After more than 20 years of experience as a trusted tour guide,
                our founder built lasting relationships with travelers from
                around the world. Time and again, those same clients returned
                not just for another journey, but with a request:
              </p>

              <blockquote className="mb-4 border-l-4 border-accent pl-4 text-lg italic text-text-secondary">
                "Why don't you start your own travel agency?"
              </blockquote>

              <p className="mb-4 text-lg leading-relaxed text-text-secondary">
                Inspired by their trust and support, this agency was born. What
                started as one person's passion for guiding has grown into a
                dedicated travel service focused on creating authentic,
                well-crafted experiences. Our founder's deep local knowledge,
                attention to detail, and genuine care for every traveler now
                shape everything we do as a team.
              </p>

              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                We believe travel should feel personal, seamless, and enriching.
                That's why we take the time to understand your interests and
                design journeys that go beyond the ordinary — whether it's
                cultural discovery, adventure, relaxation, or a mix of it all.
                Built on years of experience and the loyalty of our clients, we
                continue to uphold the same values that started it all: trust,
                authenticity, and a commitment to making every trip truly
                memorable.
              </p>

              <p className="text-lg font-semibold text-text-primary">
                Your journey is our story — let's create it together.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-surface-alt py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            subtitle="What Drives Us"
            title="Our Vision, Mission & Values"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="rounded-2xl bg-white p-8 shadow-sm text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-text-primary">
                    {title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            subtitle="Trust & Quality"
            title="Certifications & Accreditations"
            description="We maintain the highest industry standards to ensure your safety and satisfaction."
          />
          {/* <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {certifications.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-primary-500" />
                  <span className="text-sm font-medium text-text-primary">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection> */}
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="relative"
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
      </section>
    </>
  );
}
