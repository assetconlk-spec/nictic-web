const ICONS = [
  { file: "helapay.png", label: "PayHere" },
  { file: "visa.png",    label: "Visa" },
  { file: "master.png",  label: "Mastercard" },
  { file: "amex.png",    label: "American Express" },
  { file: "discover.png",label: "Discover" },
  { file: "diners.png",  label: "Diners Club" },
  { file: "genie.png",   label: "Genie" },
  { file: "frimi.png",   label: "FriMi" },
  { file: "ezcash.png",  label: "EZ Cash" },
  { file: "mcash.png",   label: "mCash" },
  { file: "sampath.png", label: "Sampath" },
  { file: "q.png",       label: "Q+" },
  { file: "ipay.png",    label: "iPay" },
];

export default function PaymentIcons({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
      {ICONS.map(({ file, label }) => (
        <img
          key={label}
          src={`/payment-icons/${file}`}
          alt={label}
          title={label}
          className={`h-6 w-auto shrink-0 object-contain ${isDark ? "opacity-60 brightness-200" : ""}`}
        />
      ))}
    </div>
  );
}
