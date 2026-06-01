import { useEffect } from "react";
import HeroSlider from "../components/sections/HeroSlider";
import FeaturedTours from "../components/sections/FeaturedTours";
import DestinationsSection from "../components/sections/DestinationsSection";
import ExperiencesSection from "../components/sections/ExperiencesSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import GalleryPreview from "../components/sections/GalleryPreview";
import EditorialSection from "../components/sections/EditorialSection";

export default function HomePage() {
  useEffect(() => {
    document.title = "nictic.travel | Sri Lanka Tourism";
  }, []);

  return (
    <>
      <HeroSlider />
      <FeaturedTours />
      <DestinationsSection />
      <ExperiencesSection />
      <WhyChooseUs />
      <GalleryPreview />
      <EditorialSection />
    </>
  );
}
