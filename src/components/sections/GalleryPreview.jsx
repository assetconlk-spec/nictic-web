import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import AnimatedSection from "../shared/AnimatedSection";
import { pb } from "../../lib/pocketbase";

export default function GalleryPreview() {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    pb.collection("gallery")
      .getFullList({ filter: "featured=true", sort: "-created" })
      .then((data) => {
        if (data.length > 0) {
          setPreview(
            data
              .slice(0, 5)
              .map((r) => ({ ...r, src: pb.files.getURL(r, r.image) })),
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-surface-alt py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Gallery"
          title="Moments from Sri Lanka"
          description="A glimpse into the beauty and wonder that awaits you on your Sri Lankan adventure."
        />
        <AnimatedSection>
          {/* Mobile: 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {preview.slice(0, 4).map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt || "Gallery"}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Desktop: 1 large left + 2×2 right */}
          <div className="hidden h-[540px] grid-cols-3 grid-rows-2 gap-4 md:grid">
            {preview[0] && (
              <div className="row-span-2 overflow-hidden rounded-2xl">
                <img
                  src={preview[0].src}
                  alt={preview[0].alt || "Gallery"}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            )}
            {preview.slice(1, 5).map((image) => (
              <div key={image.id} className="overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt || "Gallery"}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
        <div className="mt-12 text-center">
          <Button to="/gallery" variant="primary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
