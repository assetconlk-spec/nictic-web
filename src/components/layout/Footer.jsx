import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { siteConfig } from "../../data/siteConfig";
import PaymentIcons from "../shared/PaymentIcons";
import { navLinks } from "../../data/navigation";
import { pb } from "../../lib/pocketbase";
import { useContactInfo } from "../../hooks/useContactInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contact = useContactInfo();
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    pb.collection("itineraries")
      .getFullList({ filter: "popular=true", sort: "-id", requestKey: null })
      .then((data) => setPopularTours(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-primary-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-baseline gap-1 mb-5">
              <span className="text-2xl font-extrabold tracking-tight text-white">nictic</span>
              <span className="text-2xl font-light text-primary-400">.travel</span>
            </Link>
            <p className="text-sm leading-relaxed text-primary-200/70 mb-6">
              {siteConfig.tagline} — your trusted partner for authentic Sri Lankan experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: siteConfig.social.facebook },
                { icon: FaInstagram, href: siteConfig.social.instagram },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-primary-500 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-200/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/essential-info"
                  className="text-sm text-primary-200/70 transition-colors hover:text-white"
                >
                  Essential Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Itineraries */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary-400">
              Popular Itineraries
            </h4>
            <ul className="space-y-3">
              {popularTours.length > 0 ? (
                popularTours.map((tour) => (
                  <li key={tour.id}>
                    <Link
                      to={`/itineraries/${tour.slug}`}
                      className="text-sm text-primary-200/70 transition-colors hover:text-white"
                    >
                      {tour.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-primary-200/40">Coming soon</li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary-400">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contact.address && (
                <li className="flex items-start gap-3">
                  <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <span className="text-sm text-primary-200/70">{contact.address}</span>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 text-sm text-primary-200/70 hover:text-white transition-colors"
                  >
                    <HiOutlinePhone className="h-4 w-4 shrink-0 text-primary-400" />
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-sm text-primary-200/70 hover:text-white transition-colors"
                  >
                    <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-primary-400" />
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col items-center gap-4">
          <PaymentIcons variant="dark" />
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
            <p className="text-xs text-primary-200/40">
              &copy; {currentYear} nictic.travel. All rights reserved.
            </p>
            <p className="text-xs text-primary-200/40">
              Crafted with care in Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
