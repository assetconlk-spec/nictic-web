import { useState, useEffect } from "react";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { pb } from "../lib/pocketbase";
import AnimatedSection from "../components/shared/AnimatedSection";
import Button from "../components/ui/Button";
import { useContactInfo } from "../hooks/useContactInfo";
import { usePageBanner } from "../hooks/usePageBanner";

export default function ContactPage() {
  const banner = usePageBanner("contact", "/images/aboutUs/contact-us-banner.jpeg", 50);
  const contact = useContactInfo();

  const contactInfo = [
    { icon: HiOutlinePhone, title: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: FaWhatsapp, title: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\s+/g, "")}` },
    { icon: HiOutlineEnvelope, title: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: HiOutlineMapPin, title: "Address", value: contact.address, href: null },
    { icon: HiOutlineClock, title: "Office Hours", value: contact.office_hours, href: null },
  ];

  useEffect(() => {
    document.title = "Contact Us | Gajalanka Tours";
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
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
      await pb.collection("inquiries").create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        read: false,
      });
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

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-primary-900 pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={banner.src}
            alt="Contact hero"
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Ready to plan your Sri Lankan adventure? Get in touch with our travel experts today.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-surface-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-5">

            {/* Left — contact details */}
            <AnimatedSection className="lg:col-span-2">
              <div className="rounded-2xl bg-primary-700 p-8 text-white h-full">
                <h2 className="mb-2 text-2xl font-bold">Get In Touch</h2>
                <p className="mb-8 text-sm leading-relaxed text-gray-300">
                  Our team is here to help you craft the perfect Sri Lanka experience.
                  Reach out and we'll respond within 24 hours.
                </p>

                <ul className="space-y-6">
                  {contactInfo.map(({ icon: Icon, title, value, href }) => (
                    <li key={title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                          {title}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm text-gray-100 hover:text-accent transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-100">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Right — form */}
            <AnimatedSection delay={0.1} className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Send Us a Message</h2>
                <p className="mb-6 text-sm text-text-secondary">
                  Fill in the form and we'll get back to you shortly.
                </p>

                {submitted && (
                  <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    Thank you! Your message has been sent. We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${errors.name ? "border-red-400" : "border-gray-200"}`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        placeholder="Tour inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-primary">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${errors.message ? "border-red-400" : "border-gray-200"}`}
                      placeholder="Tell us about your dream trip..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  );
}
