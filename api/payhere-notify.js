import crypto from "crypto";

// PayHere calls this URL after every payment attempt.
// status_code: 2=success, 0=pending, -1=cancelled, -2=failed, -3=chargeback
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    merchant_id,
    order_id,
    payment_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
    custom_1, // tour id
    custom_2, // pax count
  } = req.body || {};

  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;
  const pb_url = process.env.VITE_PB_URL || "https://nictic-web-production.up.railway.app";

  // ── Verify signature ──────────────────────────────────────────
  if (merchant_secret) {
    const secretHash = crypto
      .createHash("md5")
      .update(merchant_secret)
      .digest("hex")
      .toUpperCase();

    const expected = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          secretHash +
          status_code
      )
      .digest("hex")
      .toUpperCase();

    if (expected !== md5sig) {
      console.error("PayHere signature mismatch", { expected, received: md5sig });
      return res.status(400).json({ error: "Invalid signature" });
    }
  }

  // ── Only process successful payments ─────────────────────────
  if (String(status_code) !== "2") {
    console.log(`PayHere non-success status ${status_code} for order ${order_id}`);
    return res.status(200).end();
  }

  console.log(`✅ PayHere payment success: order=${order_id} payment=${payment_id} amount=${payhere_amount} ${payhere_currency}`);

  // ── Save to PocketBase as an inquiry ─────────────────────────
  try {
    const pbAdminRes = await fetch(`${pb_url}/api/collections/_superusers/auth-with-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identity: process.env.PB_ADMIN_EMAIL,
        password: process.env.PB_ADMIN_PASSWORD,
      }),
    });

    if (pbAdminRes.ok) {
      const { token } = await pbAdminRes.json();
      await fetch(`${pb_url}/api/collections/inquiries/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          subject: `[PAID] PayHere deposit — Order ${order_id}`,
          message: `Payment confirmed via PayHere.\nOrder: ${order_id}\nPayment ID: ${payment_id}\nAmount: ${payhere_amount} ${payhere_currency}\nTour ID: ${custom_1 || "—"}\nPax: ${custom_2 || "—"}`,
          read: false,
        }),
      });
    }
  } catch (err) {
    console.error("PocketBase save failed:", err.message);
  }

  // ── Send email notification ───────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "nictic.travel <hello@nictic.travel>",
          to: [process.env.NOTIFY_EMAIL || "hello@nictic.travel"],
          subject: `💳 Payment Received — ${order_id}`,
          html: `
            <h2 style="color:#0d9488">Payment Confirmed ✅</h2>
            <table style="border-collapse:collapse;width:100%;max-width:520px">
              <tr><td style="padding:8px 0;color:#555;width:140px"><strong>Order ID</strong></td><td>${order_id}</td></tr>
              <tr><td style="padding:8px 0;color:#555"><strong>Payment ID</strong></td><td>${payment_id}</td></tr>
              <tr><td style="padding:8px 0;color:#555"><strong>Amount</strong></td><td><strong>${payhere_amount} ${payhere_currency}</strong></td></tr>
              <tr><td style="padding:8px 0;color:#555"><strong>Tour ID</strong></td><td>${custom_1 || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#555"><strong>Pax</strong></td><td>${custom_2 || "—"}</td></tr>
            </table>
            <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
            <p style="color:#999;font-size:12px">nictic.travel payment notification</p>
          `,
        }),
      });
    } catch (err) {
      console.error("Email notification failed:", err.message);
    }
  }

  return res.status(200).end();
}
