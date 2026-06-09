export default function PaymentIcons({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div className={`rounded-xl px-4 py-2 ${isDark ? "bg-white/10" : ""}`}>
      <img
        src="/payment-icons/payment-methods.png"
        alt="Accepted payment methods: Visa, Mastercard, Amex, Discover, Diners Club, PayHere, Genie, FriMi, EZ Cash, mCash, iPay"
        className={`h-10 w-auto object-contain ${isDark ? "opacity-80" : ""}`}
      />
    </div>
  );
}
