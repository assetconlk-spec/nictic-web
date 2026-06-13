import { Link, useLocation } from "react-router";

const CATEGORIES = [
  { label: "Itineraries", path: "/itineraries" },
  { label: "Taxi",        path: "/taxi" },
  { label: "Activities",  path: "/activities" },
];

export default function TopBar() {
  const { pathname } = useLocation();

  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-10 bg-accent">
      <div className="mx-auto flex h-full max-w-7xl items-center px-6">
        {CATEGORIES.map((cat) => {
          const isActive = pathname.startsWith(cat.path);
          return (
            <Link
              key={cat.path}
              to={cat.path}
              className={`flex h-full items-center border-b-2 px-5 text-sm font-semibold tracking-wide transition-colors ${
                isActive
                  ? "border-primary-400 bg-white/10 text-white"
                  : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
