export default function PageLoader({ fullScreen = false }) {
  const base = fullScreen
    ? "fixed inset-0 z-40 bg-white"
    : "flex min-h-[40vh] w-full items-center justify-center";

  return (
    <div className={`flex flex-col items-center justify-center gap-7 ${base}`}>
      <img
        src="/images/aboutUs/logo-high-res.png"
        alt="Loading…"
        className="w-28 max-w-[40vw] animate-[loader-pulse_1.8s_ease-in-out_infinite]"
        style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(100%) hue-rotate(174deg) saturate(350%) brightness(77%)" }}
      />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-primary-900 animate-[loader-dot_1.4s_ease-in-out_infinite_both]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
