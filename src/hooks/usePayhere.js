import { useCallback, useEffect, useRef } from "react";

const SANDBOX_SRC = "https://sandbox.payhere.lk/lib/payhere.js";
const LIVE_SRC    = "https://www.payhere.lk/lib/payhere.js";

export function usePayhere() {
  const scriptRef = useRef(null);
  const isSandbox = import.meta.env.VITE_PAYHERE_SANDBOX === "true";

  // Load the PayHere JS library once
  useEffect(() => {
    if (scriptRef.current || document.getElementById("payhere-script")) return;
    const script = document.createElement("script");
    script.id  = "payhere-script";
    script.src = isSandbox ? SANDBOX_SRC : LIVE_SRC;
    script.async = true;
    document.head.appendChild(script);
    scriptRef.current = script;
  }, [isSandbox]);

  // Initiate a payment popup
  const pay = useCallback(
    async ({ orderId, amount, currency = "LKR", items, customer, tourId, pax }, callbacks = {}) => {
      // 1 — Get server-generated hash
      const res = await fetch("/api/payhere-hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          amount: parseFloat(amount).toFixed(2),
          currency,
        }),
      });

      if (!res.ok) throw new Error("Could not generate payment hash");
      const { hash, merchant_id } = await res.json();

      // 2 — Build the payment object PayHere expects
      const [firstName, ...rest] = (customer.name || "Guest").trim().split(" ");
      const payment = {
        sandbox:     isSandbox,
        merchant_id,
        return_url:  `${window.location.origin}/booking-success`,
        cancel_url:  window.location.href,
        notify_url:  `${window.location.origin}/api/payhere-notify`,
        order_id:    orderId,
        items,
        amount:      parseFloat(amount).toFixed(2),
        currency,
        hash,
        first_name:  firstName,
        last_name:   rest.join(" ") || "N/A",
        email:       customer.email,
        phone:       customer.phone,
        address:     "N/A",
        city:        "Colombo",
        country:     "Sri Lanka",
        custom_1:    tourId || "",
        custom_2:    String(pax || 1),
      };

      // 3 — Wait up to 6s for PayHere script to finish loading, then open popup
      if (!window.payhere) {
        await new Promise((resolve, reject) => {
          let tries = 0;
          const poll = setInterval(() => {
            if (window.payhere) { clearInterval(poll); resolve(); }
            else if (++tries > 30) { clearInterval(poll); reject(new Error("PayHere failed to load. Please refresh and try again.")); }
          }, 200);
        });
      }
      const payhere = window.payhere;

      payhere.onCompleted = (id) => callbacks.onSuccess?.(id);
      payhere.onDismissed = ()   => callbacks.onDismissed?.();
      payhere.onError     = (e)  => callbacks.onError?.(e);

      payhere.startPayment(payment);
    },
    [isSandbox]
  );

  return { pay };
}
