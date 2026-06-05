import { useEffect } from "react";
import HeroSlider from "../components/sections/HeroSlider";
import ServicesOverview from "../components/sections/ServicesOverview";
import FeaturedTours from "../components/sections/FeaturedTours";
import TaxiSection from "../components/sections/TaxiSection";
import ActivitiesSection from "../components/sections/ActivitiesSection";
import DestinationsSection from "../components/sections/DestinationsSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import GalleryPreview from "../components/sections/GalleryPreview";

export default function HomePage() {
  useEffect(() => {
    document.title = "nictic.travel | Sri Lanka Tourism";
  }, []);

  return (
    <>
      <HeroSlider />
      <ServicesOverview />
      <FeaturedTours />
      <TaxiSection />
      <ActivitiesSection />
      <DestinationsSection />
      <WhyChooseUs />
      <GalleryPreview />
    </>
  );
}
