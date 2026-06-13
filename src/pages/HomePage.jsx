import { useEffect } from "react";
import HeroSlider from "../components/sections/HeroSlider";
import FeaturedTours from "../components/sections/FeaturedTours";
import GalleryPreview from "../components/sections/GalleryPreview";

export default function HomePage() {
  useEffect(() => {
    document.title = "nictic | Sri Lanka Tourism";
  }, []);

  return (
    <>
      <HeroSlider />
      <FeaturedTours />
      <GalleryPreview />
    </>
  );
}
