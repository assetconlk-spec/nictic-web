/**
 * Local dev server for Vercel serverless functions.
 * Handles /api/payhere-hash and /api/payhere-notify so Vite doesn't
 * forward them to PocketBase.
 * Run via: node dev-server.js  (started automatically by `npm run dev:full`)
 */
import { createServer } from "http";
import { readFileSync } from "fs";

// Load .env.local manually (Vercel functions read process.env on their platform)
try {
  const env = readFileSync(".env.local", "utf8");
  for (const line of env.split("\n")) {
    const [k, ...v] = line.trim().split("=");
    if (k && !k.startsWith("#") && !process.env[k]) {
      process.env[k] = v.join("=").replace(/^['"]|['"]$/g, "");
    }
  }
} catch {/* no .env.local */}
try {
  const env = readFileSync(".env.example", "utf8");
  for (const line of env.split("\n")) {
    const [k, ...v] = line.trim().split("=");
    if (k && !k.startsWith("#") && !process.env[k]) {
      process.env[k] = v.join("=").replace(/^['"]|['"]$/g, "");
    }
  }
} catch {/* no .env.example */}

const PORT = 3001;

const routes = {
  "/api/payhere-hash":   (await import("./api/payhere-hash.js")).default,
  "/api/payhere-notify": (await import("./api/payhere-notify.js")).default,
  "/api/notify":         (await import("./api/notify.js")).default,
};

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const handler = routes[url.pathname];

  if (!handler) {
    res.writeHead(404).end(JSON.stringify({ error: "Not found" }));
    return;
  }

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    const fakeReq = Object.assign(req, {
      body: body ? JSON.parse(body) : {},
      query: Object.fromEntries(url.searchParams),
    });
    const fakeRes = {
      _status: 200,
      _headers: {},
      status(code) { this._status = code; return this; },
      json(data) {
        res.writeHead(this._status, { "Content-Type": "application/json", ...this._headers });
        res.end(JSON.stringify(data));
      },
      end(data) {
        res.writeHead(this._status, this._headers);
        res.end(data ?? "");
      },
      setHeader(k, v) { this._headers[k] = v; return this; },
    };
    handler(fakeReq, fakeRes);
  });
}).listen(PORT, () => console.log(`[dev-server] PayHere API on http://localhost:${PORT}`));
