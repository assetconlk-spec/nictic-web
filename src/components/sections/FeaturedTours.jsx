import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TourCard from "../ui/TourCard";
import Button from "../ui/Button";
import { pb } from "../../lib/pocketbase";

export default function FeaturedTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    pb.collection("tours")
      .getFullList({ sort: "-created" })
      .then((data) => {
        setTours(
          data.map((r) => ({
            ...r,
            image: r.image ? pb.files.getURL(r, r.image) : r.image_url || "",
          })),
        );
      })
      .catch(() => {
        setTours([]);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Our Tours"
          title="Signature Sri Lankan Experiences"
          description="Take a slice of Sri Lanka with you through unforgettable memories, authentic experiences, and the warmth of its people."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/tours" variant="primary" size="lg">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
