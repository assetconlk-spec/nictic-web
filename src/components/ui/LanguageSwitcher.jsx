import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronDown } from "react-icons/hi2";

const LANGS = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "pl", label: "Polski",  short: "PL", flag: "🇵🇱" },
];

export default function LanguageSwitcher({ transparent = false }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  const select = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 ${
          transparent
            ? "border-white/30 text-white hover:border-white hover:bg-white/10"
            : "border-gray-200 text-text-secondary hover:border-primary-400 hover:text-primary-600"
        }`}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span>{current.short}</span>
        <HiChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg z-50">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang.code)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                lang.code === current.code
                  ? "font-bold text-primary-600"
                  : "font-medium text-gray-700"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === current.code && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
