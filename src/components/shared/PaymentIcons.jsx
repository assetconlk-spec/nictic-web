import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcDinersClub } from "react-icons/fa6";

const SL_METHODS = ["PayHere", "Genie", "FriMi", "EZ Cash", "mCash", "iPay"];

export default function PaymentIcons({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <FaCcVisa      className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#1A1F71]"}`} />
      <FaCcMastercard className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#EB001B]"}`} />
      <FaCcAmex      className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#2E77BC]"}`} />
      <FaCcDiscover  className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#FF6600]"}`} />
      <FaCcDinersClub className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#004A97]"}`} />
      {SL_METHODS.map((name) => (
        <span
          key={name}
          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
            isDark
              ? "border border-white/20 text-white/50"
              : "border border-gray-200 bg-gray-50 text-gray-500"
          }`}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
