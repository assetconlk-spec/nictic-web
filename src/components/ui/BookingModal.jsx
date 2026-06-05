import { useState } from "react";
import { HiOutlineXMark, HiOutlineCheckCircle, HiOutlineCreditCard } from "react-icons/hi2";
import { motion, AnimatePresence } from "motion/react";
import { pb } from "../../lib/pocketbase";
import { usePayhere } from "../../hooks/usePayhere";

// Deposit: LKR 5,000 per person (adjust as needed)
const DEPOSIT_PER_PAX_LKR = 5000;

function genOrderId() {
  return `NICTIC-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default function BookingModal({ tour, isOpen, onClose }) {
  const { pay } = usePayhere();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", pax: 1,
    date_from: "", date_to: "", notes: "",
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep]       = useState("form"); // "form" | "success" | "error"
  const [errMsg, setErrMsg]   = useState("");

  const totalDeposit = DEPOSIT_PER_PAX_LKR * Number(form.pax);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.date_from)    e.date_from = "Select your start date";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handlePay = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setErrMsg("");

    try {
      const orderId = genOrderId();

      // Save inquiry to PocketBase so we have a record
      await pb.collection("inquiries").create({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        subject: `Booking request — ${tour.title}`,
        message: `Pax: ${form.pax}\nDates: ${form.date_from}${form.date_to ? " → " + form.date_to : ""}\nOrder: ${orderId}\nNotes: ${form.notes || "—"}`,
        read:    false,
      }).catch(() => {/* non-blocking */});

      await pay(
        {
          orderId,
          amount:   totalDeposit,
          currency: "LKR",
          items:    `Deposit — ${tour.title}`,
          customer: { name: form.name, email: form.email, phone: form.phone },
          tourId:   tour.id,
          pax:      form.pax,
        },
        {
          onSuccess:   () => { setStep("success"); setLoading(false); },
          onDismissed: () => setLoading(false),
          onError:     (err) => { setErrMsg(String(err)); setLoading(false); },
        }
      );
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("form");
    setForm({ name: "", email: "", phone: "", pax: 1, date_from: "", date_to: "", notes: "" });
    setErrors({});
    setErrMsg("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== "success" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-4 pb-4 sm:pb-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

              {/* ── Success screen ── */}
              {step === "success" && (
                <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <HiOutlineCheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Deposit Confirmed!</h2>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Your deposit of <strong>LKR {totalDeposit.toLocaleString()}</strong> has been received.
                    We'll be in touch within 24 hours to finalise your itinerary.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-2 rounded-xl bg-primary-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* ── Booking form ── */}
              {step === "form" && (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">Book Your Spot</h2>
                      <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">{tour.title}</p>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
                      <HiOutlineXMark className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                    <div className="space-y-4">

                      {/* Name */}
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="name" value={form.name} onChange={handleChange}
                          placeholder="e.g. John Silva"
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email" type="email" value={form.email} onChange={handleChange}
                            placeholder="you@email.com"
                            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone" type="tel" value={form.phone} onChange={handleChange}
                            placeholder="+94 77 123 4567"
                            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Dates + Pax */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="date_from" type="date" value={form.date_from} onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${errors.date_from ? "border-red-400" : "border-gray-200"}`}
                          />
                          {errors.date_from && <p className="mt-1 text-xs text-red-500">{errors.date_from}</p>}
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-gray-700">End Date</label>
                          <input
                            name="date_to" type="date" value={form.date_to} onChange={handleChange}
                            min={form.date_from || new Date().toISOString().split("T")[0]}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-gray-700">Guests</label>
                          <select
                            name="pax" value={form.pax} onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Special Requests</label>
                        <textarea
                          name="notes" value={form.notes} onChange={handleChange} rows={3}
                          placeholder="Dietary requirements, room preferences, anything else..."
                          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                        />
                      </div>

                      {/* Deposit summary */}
                      <div className="rounded-2xl bg-primary-50 border border-primary-100 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Deposit to pay now</p>
                            <p className="mt-0.5 text-2xl font-extrabold text-primary-700">
                              LKR {totalDeposit.toLocaleString()}
                            </p>
                            <p className="text-xs text-primary-500">
                              LKR {DEPOSIT_PER_PAX_LKR.toLocaleString()} × {form.pax} guest{form.pax > 1 ? "s" : ""}
                            </p>
                          </div>
                          <HiOutlineCreditCard className="h-10 w-10 text-primary-300" />
                        </div>
                        <p className="mt-2 text-xs text-primary-600">
                          Balance payable on arrival · Fully refundable up to 14 days before tour
                        </p>
                      </div>

                      {errMsg && (
                        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                          {errMsg}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 px-6 py-4">
                    <button
                      onClick={handlePay}
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Opening PayHere…
                        </>
                      ) : (
                        <>
                          <HiOutlineCreditCard className="h-5 w-5" />
                          Pay Deposit — LKR {totalDeposit.toLocaleString()}
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-xs text-gray-400">
                      Secured by PayHere · Visa, Mastercard & more accepted
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
