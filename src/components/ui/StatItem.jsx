export default function StatItem({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white md:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-primary-200">{label}</div>
    </div>
  );
}
