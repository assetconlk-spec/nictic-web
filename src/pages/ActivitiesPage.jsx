import { useEffect, useState } from "react";
import AnimatedSection from "../components/shared/AnimatedSection";
import { Link } from "react-router";

const WA = "https://wa.me/94707485177";

const activities = [
  {
    title: "Scuba Diving",
    location: "Hikkaduwa",
    duration: "Half day",
    difficulty: "Beginner friendly",
    price: "From $45",
    category: "Water",
    emoji: "🤿",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80",
    description: "Explore colourful coral reefs and shipwrecks in the warm Indian Ocean waters off Hikkaduwa.",
  },
  {
    title: "Surfing Lessons",
    location: "Weligama / Arugam Bay",
    duration: "2 – 3 hrs",
    difficulty: "All levels",
    price: "From $30",
    category: "Water",
    emoji: "🏄",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80",
    description: "Sri Lanka's warm waves are perfect for beginners and seasoned surfers alike. Board & instructor included.",
  },
  {
    title: "Whale Watching",
    location: "Mirissa",
    duration: "4 – 5 hrs",
    difficulty: "Easy",
    price: "From $35",
    category: "Wildlife",
    emoji: "🐋",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
    description: "Spot blue whales, sperm whales, and spinner dolphins on an early morning boat cruise from Mirissa harbour.",
  },
  {
    title: "Adam's Peak Hike",
    location: "Nallathanniya",
    duration: "5 – 6 hrs",
    difficulty: "Moderate",
    price: "From $25",
    category: "Hiking",
    emoji: "🥾",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    description: "Ascend 5,200 steps to the sacred Sri Pada peak. Start at midnight to catch the spectacular sunrise.",
  },
  {
    title: "Ella Rock Hike",
    location: "Ella",
    duration: "3 – 4 hrs",
    difficulty: "Moderate",
    price: "From $20",
    category: "Hiking",
    emoji: "⛰️",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    description: "Trek through tea estates and jungle to reach Ella Rock's summit with panoramic views of the valley.",
  },
  {
    title: "White Water Rafting",
    location: "Kitulgala",
    duration: "2 – 3 hrs",
    difficulty: "Thrilling",
    price: "From $40",
    category: "Adventure",
    emoji: "🚣",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80",
    description: "Tackle Grade 3–4 rapids on the Kelani River, the filming location of The Bridge on the River Kwai.",
  },
  {
    title: "Hot Air Balloon",
    location: "Dambulla / Sigiriya",
    duration: "1 hr flight",
    difficulty: "Easy",
    price: "From $180",
    category: "Adventure",
    emoji: "🎈",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80",
    description: "Drift silently over the Cultural Triangle at sunrise — ancient rock fortresses, jungle and lakes spread beneath you.",
  },
  {
    title: "Yala Safari",
    location: "Yala National Park",
    duration: "Full day",
    difficulty: "Easy",
    price: "From $65",
    category: "Wildlife",
    emoji: "🐆",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=700&q=80",
    description: "Home to the world's highest density of leopards. Spot elephants, crocodiles, and rare birds on a jeep safari.",
  },
  {
    title: "Minneriya Elephant Gathering",
    location: "Minneriya",
    duration: "Half day",
    difficulty: "Easy",
    price: "From $50",
    category: "Wildlife",
    emoji: "🐘",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
    description: "Witness hundreds of wild elephants gather at the Minneriya reservoir — one of Asia's greatest wildlife spectacles.",
  },
  {
    title: "Cooking Class",
    location: "Colombo / Galle",
    duration: "3 – 4 hrs",
    difficulty: "Fun & easy",
    price: "From $35",
    category: "Cultural",
    emoji: "🍛",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80",
    description: "Learn to cook authentic Sri Lankan curries, sambols, and hoppers with a local family. Eat what you cook!",
  },
  {
    title: "Snorkelling",
    location: "Pigeon Island / Trincomalee",
    duration: "2 – 3 hrs",
    difficulty: "Beginner friendly",
    price: "From $25",
    category: "Water",
    emoji: "🐠",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
    description: "Swim among coral reefs teeming with reef sharks, sea turtles, and tropical fish off the east coast.",
  },
  {
    title: "Zip-lining",
    location: "Kitulgala / Ella",
    duration: "2 hrs",
    difficulty: "Thrilling",
    price: "From $30",
    category: "Adventure",
    emoji: "🪂",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    description: "Soar through the rainforest canopy on zip lines stretching hundreds of metres across the valley.",
  },
];

const categories = ["All", "Water", "Wildlife", "Hiking", "Adventure", "Cultural"];
const categoryColors = {
  Water: "bg-blue-500", Wildlife: "bg-green-600",
  Hiking: "bg-amber-600", Adventure: "bg-rose-500", Cultural: "bg-purple-600",
};
const categoryIcons = {
  All: "🌍", Water: "🌊", Wildlife: "🦁", Hiking: "🥾", Adventure: "⚡", Cultural: "🏛️",
};

function ActivityCard({ act, index }) {
  const waLink = `${WA}?text=Hi%2C%20I%27d%20like%20to%20book%20${encodeURIComponent(act.title)}`;
  return (
    <AnimatedSection delay={index * 0.06}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-52 overflow-hidden">
          <img src={act.image} alt={act.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white ${categoryColors[act.category]}`}>
            {act.category}
          </span>
          <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm">
            {act.emoji}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1 text-lg font-bold text-text-primary group-hover:text-primary-600 transition-colors">{act.title}</h3>
          <p className="mb-1 flex items-center gap-1 text-xs text-text-secondary">
            <svg className="h-3 w-3 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {act.location}
          </p>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">{act.description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-text-secondary">⏱ {act.duration}</span>
            <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-text-secondary">{act.difficulty}</span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-lg font-extrabold text-primary-600">{act.price}</span>
            <div className="flex gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-600"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ActivitiesPage() {
  useEffect(() => { document.title = "Activities | nictic.travel"; }, []);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? activities : activities.filter((a) => a.category === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80"
          alt="Activities Sri Lanka"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-rose-400">
            Adventures & Experiences
          </span>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Things To Do<br />
            <span className="text-rose-400">In Sri Lanka</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-gray-300">
            From scuba diving in Hikkaduwa to watching elephants in Minneriya —
            12+ curated activities bookable instantly on WhatsApp.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { value: `${activities.length}+`, label: "Activities" },
              { value: "5", label: "Categories" },
              { value: "WA", label: "Instant Booking" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category filter — sticky ── */}
      <section className="sticky top-16 z-20 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => {
              const count = cat === "All" ? activities.length : activities.filter((a) => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    active === cat ? "bg-primary-500 text-white shadow-sm" : "text-text-secondary hover:bg-gray-100"
                  }`}
                >
                  <span>{categoryIcons[cat]}</span>
                  {cat}
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${active === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Activities grid ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-lg text-text-secondary">No activities in this category.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((act, i) => (
                <ActivityCard key={act.title} act={act} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-rose-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=60" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">Don't See What You're After?</h2>
          <p className="mb-8 text-rose-100">We can arrange almost any experience in Sri Lanka. Just ask us on WhatsApp.</p>
          <a
            href={`${WA}?text=Hi%2C%20I%27m%20looking%20for%20an%20activity%20in%20Sri%20Lanka`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-rose-600 shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask Us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
