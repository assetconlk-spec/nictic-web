import { Link } from "react-router";

const variants = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  accent: "bg-accent text-white hover:bg-accent-hover",
  outline: "border-2 border-white text-white hover:bg-white hover:text-primary-900",
  white: "bg-white text-primary-900 hover:bg-gray-100",
  ghost: "text-primary-600 hover:bg-primary-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  ...props
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) return <Link to={to} className={base} {...props}>{children}</Link>;
  if (href) return <a href={href} className={base} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  return <button className={base} {...props}>{children}</button>;
}
