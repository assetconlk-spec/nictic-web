import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { order_id, amount, currency = "LKR" } = req.body || {};

  if (!order_id || !amount) {
    return res.status(400).json({ error: "order_id and amount are required" });
  }

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

  if (!merchant_id || !merchant_secret) {
    return res.status(500).json({ error: "PayHere is not configured on the server" });
  }

  // PayHere hash formula:
  // MD5( merchant_id + order_id + amount + currency + MD5(merchant_secret).toUpperCase() ).toUpperCase()
  const secretHash = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const hash = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        parseFloat(amount).toFixed(2) +
        currency +
        secretHash
    )
    .digest("hex")
    .toUpperCase();

  return res.status(200).json({ hash, merchant_id });
}
