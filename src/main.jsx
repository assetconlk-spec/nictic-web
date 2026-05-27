import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const loaderStart = Date.now();
const MIN_LOADER_MS = 1500;

createRoot(document.getElementById("root")).render(<App />);

// Keep loader visible for at least MIN_LOADER_MS, then fade out
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const elapsed = Date.now() - loaderStart;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(() => {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.classList.add("fade-out");
        setTimeout(() => loader.remove(), 500);
      }
    }, remaining);
  });
});
