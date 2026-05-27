import { useEffect, useState } from "react";
import {
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineInformationCircle,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { pb } from "../lib/pocketbase";
import AnimatedSection from "../components/shared/AnimatedSection";

const SECTIONS = [
  {
    key: "terms_and_conditions",
    title: "Terms and Conditions",
    icon: HiOutlineDocumentText,
  },
  {
    key: "payment_cancellation_policy",
    title: "Payment and Cancellation Policy",
    icon: HiOutlineCreditCard,
  },
  {
    key: "guest_obligations",
    title: "Guest Obligations",
    icon: HiOutlineUserGroup,
  },
  {
    key: "important_information",
    title: "Important Information",
    icon: HiOutlineInformationCircle,
  },
];

function AccordionItem({ section, content, index }) {
  const [open, setOpen] = useState(index === 0);
  const Icon = section.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex-1 text-base font-semibold text-gray-900">
          {section.title}
        </span>
        <HiOutlineChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-6 pb-6 pt-4">
          {content ? (
            <div className="space-y-2">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed text-gray-600">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-800">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  u: ({ children }) => (
                    <u className="underline">{children}</u>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm leading-relaxed text-gray-600">{children}</li>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">
              Content coming soon.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function EssentialInfoPage() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Essential Information | Gajalanka Tours";
    pb.collection("essential_info")
      .getFirstListItem("")
      .then((record) => setInfo(record))
      .catch(() => setInfo(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex items-center justify-center bg-primary-900 pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src="/images/aboutUs/about-us-img-4.jpg"
            alt="Essential Info"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Essential Information
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Everything you need to know before booking your Sri Lanka journey
            with us.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="space-y-4">
                {SECTIONS.map((section, i) => (
                  <AccordionItem
                    key={section.key}
                    section={section}
                    content={info?.[section.key] || ""}
                    index={i}
                  />
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
