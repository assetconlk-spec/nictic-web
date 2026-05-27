export default function SectionHeading({ subtitle, title, description, center = true, light = false }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {subtitle && (
        <span className={`mb-2 inline-block text-sm font-semibold uppercase tracking-wider ${light ? "text-primary-300" : "text-primary-500"}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-text-primary"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg ${light ? "text-gray-300" : "text-text-secondary"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
