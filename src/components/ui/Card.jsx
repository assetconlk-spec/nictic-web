export default function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm ${hover ? "transition-shadow duration-300 hover:shadow-lg" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
