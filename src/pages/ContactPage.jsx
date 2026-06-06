import { useState, useEffect } from "react";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { pb } from "../lib/pocketbase";
import AnimatedSection from "../components/shared/AnimatedSection";
import { useContactInfo } from "../hooks/useContactInfo";
import { usePageBanner } from "../hooks/usePageBanner";

const WA_NUMBER = "94707485177";

export default function ContactPage() {
  const banner = usePageBanner("contact", "/images/aboutUs/contact-us-banner.jpeg", 50);
  const contact = useContactInfo();

  useEffect(() => { document.title = "Contact Us | nictic.travel"; }, []);

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await pb.collection("inquiries").create({ ...form, read: false });
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {});
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const whatsappHref = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20a%20Sri%20Lanka%20trip`;
  const emailHref = contact.email ? `mailto:${contact.email}` : null;
  const phoneHref = contact.phone ? `tel:${contact.phone}` : null;

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-gray-900">
        <img
          src={banner.src}
          alt="Contact us"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-36 md:px-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-300">
            We'd Love to Hear from You
          </span>
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Plan Your<br />
            <span className="text-primary-400">Sri Lanka Trip</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-gray-300">
            Our local travel experts respond within 24 hours. Tell us your dream itinerary.
          </p>
        </div>
      </section>

      {/* ── Quick-contact strip (overlaps hero) ── */}
      <div className="relative z-10 -mt-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-green-500 p-5 shadow-xl transition hover:bg-green-600 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <FaWhatsapp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-100">Chat Instantly</p>
                <p className="mt-0.5 font-bold text-white">WhatsApp Us</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-white/60 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {emailHref ? (
              <a
                href={emailHref}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl transition hover:bg-gray-50 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <HiOutlineEnvelope className="h-6 w-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Us</p>
                  <p className="mt-0.5 truncate font-bold text-text-primary">{contact.email}</p>
                </div>
                <svg className="ml-auto h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <HiOutlineEnvelope className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Us</p>
                  <p className="mt-0.5 font-bold text-text-primary">hello@nictic.travel</p>
                </div>
              </div>
            )}

            {phoneHref ? (
              <a
                href={phoneHref}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl transition hover:bg-gray-50 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <HiOutlinePhone className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Call Us</p>
                  <p className="mt-0.5 font-bold text-text-primary">{contact.phone}</p>
                </div>
                <svg className="ml-auto h-5 w-5 text-gray-300 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <HiOutlinePhone className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Call Us</p>
                  <p className="mt-0.5 font-bold text-text-primary">+94 70 748 5177</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Main Section: Info + Form ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">

            {/* Left — info sidebar */}
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-6">

                {/* Intro card */}
                <div className="overflow-hidden rounded-3xl bg-primary-700 p-8 text-white">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <HiOutlineChatBubbleLeftRight className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="mb-3 text-2xl font-extrabold">Let's Talk</h2>
                  <p className="text-sm leading-relaxed text-primary-200">
                    Whether you're dreaming of elephants in Yala, sunrise over Sigiriya, or lazy days in Mirissa — we'll turn it into your perfect itinerary.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">We respond within</p>
                    <p className="mt-1 text-3xl font-extrabold text-white">24 hours</p>
                  </div>
                </div>

                {/* Contact details */}
                <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm space-y-5">
                  {contact.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                        <HiOutlineMapPin className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Address</p>
                        <p className="mt-0.5 text-sm font-medium text-text-primary leading-snug">{contact.address}</p>
                      </div>
                    </div>
                  )}

                  {contact.office_hours && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                        <HiOutlineClock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Office Hours</p>
                        <p className="mt-0.5 text-sm font-medium text-text-primary">{contact.office_hours}</p>
                      </div>
                    </div>
                  )}

                  {!contact.address && !contact.office_hours && (
                    <>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                          <HiOutlineMapPin className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Address</p>
                          <p className="mt-0.5 text-sm font-medium text-text-primary">42 Temple Road, Colombo 03, Sri Lanka</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                          <HiOutlineClock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Office Hours</p>
                          <p className="mt-0.5 text-sm font-medium text-text-primary">Mon – Sat: 8:00 AM – 6:00 PM</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </AnimatedSection>

            {/* Right — form */}
            <AnimatedSection delay={0.1} className="lg:col-span-3">

              {submitted ? (
                <div className="flex min-h-120 flex-col items-center justify-center rounded-3xl border border-green-100 bg-green-50 p-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
                    <HiOutlineCheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-extrabold text-green-900">Message Sent!</h3>
                  <p className="mb-8 max-w-sm text-sm leading-relaxed text-green-700">
                    Thank you for reaching out. Our team will get back to you within 24 hours with a personalised response.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border-2 border-green-600 px-6 py-3 text-sm font-bold text-green-700 transition hover:bg-green-600 hover:text-white cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
                  <h2 className="mb-1 text-2xl font-extrabold text-text-primary">Send Us a Message</h2>
                  <p className="mb-8 text-sm text-text-secondary">
                    Fill in the form below and we'll craft a personalised trip just for you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full Name" required error={errors.name}>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={inputCls(errors.name)}
                        />
                      </Field>
                      <Field label="Email Address" required error={errors.email}>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={inputCls(errors.email)}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone Number">
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 8901"
                          className={inputCls()}
                        />
                      </Field>
                      <Field label="Subject">
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="7-day tour inquiry"
                          className={inputCls()}
                        />
                      </Field>
                    </div>

                    <Field label="Your Message" required error={errors.message}>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us your travel dates, group size, and what kind of experience you're looking for…"
                        className={`${inputCls(errors.message)} resize-none`}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary-500 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary-600 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    <p className="text-center text-xs text-text-secondary">
                      Prefer instant chat?{" "}
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:underline">
                        Message us on WhatsApp
                      </a>
                    </p>
                  </form>
                </div>
              )}

            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <FaWhatsapp className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">
            Need a Faster Reply?
          </h2>
          <p className="mb-8 text-gray-400">
            Message us directly on WhatsApp — we typically reply within minutes.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-green-500 px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:bg-green-600 hover:scale-105"
          >
            <FaWhatsapp className="h-5 w-5" />
            Open WhatsApp Chat
          </a>
        </div>
      </section>
    </>
  );
}

/* ── Helpers ── */
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function inputCls(hasError) {
  return `w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-primary-500/20 ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-primary-500"
  }`;
}
