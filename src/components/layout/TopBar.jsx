import { HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { siteConfig } from "../../data/siteConfig";
import { useContactInfo } from "../../hooks/useContactInfo";

export default function TopBar() {
  const contact = useContactInfo();
  return (
    <div
      className="hidden py-2 text-sm text-white lg:block"
      style={{
        backgroundImage: "url('/images/aboutUs/pattern-bg.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundColor: "#0C2B4E",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
          >
            <HiOutlinePhone className="h-4 w-4" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
          >
            <HiOutlineEnvelope className="h-4 w-4" />
            {contact.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors"
          >
            <FaFacebookF className="h-3.5 w-3.5" />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-200 transition-colors"
          >
            <FaInstagram className="h-3.5 w-3.5" />
          </a>
          {/* <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 transition-colors"><FaTwitter className="h-3.5 w-3.5" /></a>
          <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 transition-colors"><FaYoutube className="h-3.5 w-3.5" /></a> */}
        </div>
      </div>
    </div>
  );
}
