import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TourCard from "../ui/TourCard";
import Button from "../ui/Button";
import { pb } from "../../lib/pocketbase";

async function fetchItineraries(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await pb.collection("itineraries").getFullList({ sort: "-id", requestKey: null });
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

export default function FeaturedTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetchItineraries()
      .then((data) =>
        setTours(data.map((r) => ({
          ...r,
          image: r.image ? pb.files.getURL(r, r.image) : r.image_url || "",
        })))
      )
      .catch((err) => {
        console.error("Failed to load itineraries:", err);
        setTours([]);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          subtitle="Itineraries"
          title="Signature Sri Lankan Journeys"
          description="Hand-picked multi-day tours through ancient wonders, pristine beaches, and vibrant culture."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/itineraries" variant="primary" size="lg">
            View All Itineraries
          </Button>
        </div>
      </div>
    </section>
  );
}
