export default function PageLoader({ fullScreen = false }) {
  const base = fullScreen
    ? "fixed inset-0 z-40 bg-white"
    : "flex min-h-[40vh] w-full items-center justify-center";

  return (
    <div className={`flex items-center justify-center ${base}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600" />
    </div>
  );
}
