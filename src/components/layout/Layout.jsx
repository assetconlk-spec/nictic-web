import { Outlet } from "react-router";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../shared/WhatsAppButton";
import ScrollToTop from "../shared/ScrollToTop";
import ScrollRestoration from "../shared/ScrollRestoration";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
