import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { HiOutlineCheckCircle, HiOutlineCalendarDays, HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";

export default function BookingSuccessPage() {
  useEffect(() => { document.title = "Booking Confirmed | nictic.travel"; }, []);

  const [params] = useSearchParams();
  const orderId = params.get("order_id") || "";
  const paymentId = params.get("payment_id") || "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl">

        {/* Green header */}
        <div className="flex flex-col items-center bg-green-50 px-8 py-10 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <HiOutlineCheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Deposit Confirmed!</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Your deposit payment was successful. Our team will be in touch within 24 hours to
            finalise your itinerary.
          </p>
        </div>

        {/* Order details */}
        <div className="px-8 py-6">
          {(orderId || paymentId) && (
            <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm">
              {orderId && (
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-semibold text-gray-900">{orderId}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between border-t border-gray-100 py-1.5">
                  <span className="text-gray-500">Payment ID</span>
                  <span className="font-semibold text-gray-900">{paymentId}</span>
                </div>
              )}
            </div>
          )}

          {/* What happens next */}
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">What happens next?</h2>
          <ul className="mb-8 space-y-4">
            {[
              { icon: HiOutlineEnvelope,      text: "You'll receive a booking confirmation email shortly." },
              { icon: HiOutlinePhone,         text: "Our travel consultant will call you within 24 hours to discuss your trip in detail." },
              { icon: HiOutlineCalendarDays,  text: "Your itinerary will be tailored and confirmed before your travel date." },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-gray-600">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                {text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/itineraries"
              className="flex-1 rounded-xl bg-primary-600 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-primary-700"
            >
              Browse More Itineraries
            </Link>
            <Link
              to="/"
              className="flex-1 rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>

      </div>

      <p className="mt-6 text-xs text-gray-400">
        Questions? Contact us at{" "}
        <a href="mailto:hello@nictic.travel" className="underline hover:text-gray-600">
          hello@nictic.travel
        </a>
      </p>
    </div>
  );
}
