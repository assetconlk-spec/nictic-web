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
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ICONS.map(({ file, label }) => (
        <div
          key={label}
          className={`flex h-9 w-14 items-center justify-center rounded-lg ${
            isDark ? "bg-white/15" : "border border-gray-100 bg-white shadow-xs"
          }`}
          title={label}
        >
          <img
            src={`/payment-icons/${file}`}
            alt={label}
            className="h-6 w-auto max-w-11 object-contain"
          />
        </div>
      ))}
    </div>
  );
}
