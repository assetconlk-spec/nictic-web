import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { siteConfig } from "../../data/siteConfig";
import { navLinks } from "../../data/navigation";
import { pb } from "../../lib/pocketbase";
import { useContactInfo } from "../../hooks/useContactInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contact = useContactInfo();
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    pb.collection("tours")
      .getFullList({
        filter: "popular=true",
        sort: "-created",
        requestKey: null,
      })
      .then((data) => setPopularTours(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-primary-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">{siteConfig.name}</h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-300">
              Your trusted partner for unforgettable Sri Lankan experiences.
              Discover ancient wonders, pristine beaches, and vibrant culture
              with our expertly crafted tours.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: siteConfig.social.facebook },
                { icon: FaInstagram, href: siteConfig.social.instagram },
                // { icon: FaTwitter, href: siteConfig.social.twitter },
                // { icon: FaYoutube, href: siteConfig.social.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 transition-colors hover:text-primary-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/essential-info"
                  className="text-sm text-gray-300 transition-colors hover:text-primary-300"
                >
                  Essential Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Popular Tours</h4>
            <ul className="space-y-3">
              {popularTours.map((tour) => (
                <li key={tour.id}>
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="text-sm text-gray-300 transition-colors hover:text-primary-300"
                  >
                    {tour.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" />
                <span className="text-sm text-gray-300">
                  {contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  <HiOutlinePhone className="h-5 w-5 shrink-0 text-primary-300" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  <HiOutlineEnvelope className="h-5 w-5 shrink-0 text-primary-300" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
