import { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcDinersClub } from "react-icons/fa6";

const SL_METHODS = [
  { name: "PayHere", src: "https://www.payhere.lk/downloads/images/payhere_logo.png",   fallback: "https://www.google.com/s2/favicons?domain=payhere.lk&sz=64" },
  { name: "Genie",   src: "https://www.genie.lk/assets/img/genie-logo.png",             fallback: "https://www.google.com/s2/favicons?domain=genie.lk&sz=64" },
  { name: "FriMi",   src: "https://www.frimi.lk/wp-content/uploads/frimi-logo.png",     fallback: "https://www.google.com/s2/favicons?domain=frimi.lk&sz=64" },
  { name: "EZ Cash", src: "https://www.ezcash.lk/assets/images/ezcash-logo.png",        fallback: "https://www.google.com/s2/favicons?domain=ezcash.lk&sz=64" },
  { name: "mCash",   src: "https://www.mcash.lk/assets/images/mcash-logo.png",          fallback: "https://www.google.com/s2/favicons?domain=mcash.lk&sz=64" },
  { name: "iPay",    src: "https://www.ipay.lk/assets/images/ipay-logo.png",            fallback: "https://www.google.com/s2/favicons?domain=ipay.hnb.net&sz=64" },
];

function LogoBadge({ method, isDark }) {
  const [src, setSrc] = useState(method.src);
  const [usedFallback, setUsedFallback] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!usedFallback) {
      setSrc(method.fallback);
      setUsedFallback(true);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${
        isDark ? "border border-white/20 text-white/50" : "border border-gray-200 bg-gray-50 text-gray-500"
      }`}>
        {method.name}
      </span>
    );
  }

  return (
    <div className={`flex h-8 items-center justify-center rounded-md px-2 ${
      isDark ? "bg-white/10" : "border border-gray-200 bg-white"
    }`}>
      <img
        src={src}
        alt={method.name}
        onError={handleError}
        className="h-5 w-auto max-w-13 object-contain"
        title={method.name}
      />
    </div>
  );
}

export default function PaymentIcons({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <FaCcVisa       className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#1A1F71]"}`} />
      <FaCcMastercard className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#EB001B]"}`} />
      <FaCcAmex       className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#2E77BC]"}`} />
      <FaCcDiscover   className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#FF6600]"}`} />
      <FaCcDinersClub className={`h-7 w-auto ${isDark ? "text-white/60" : "text-[#004A97]"}`} />
      {SL_METHODS.map((method) => (
        <LogoBadge key={method.name} method={method} isDark={isDark} />
      ))}
    </div>
  );
}
