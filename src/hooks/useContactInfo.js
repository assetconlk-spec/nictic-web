import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import { siteConfig } from "../data/siteConfig";

const defaults = {
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsapp,
  email: siteConfig.email,
  address: siteConfig.address,
  office_hours: "Mon – Sat: 8:00 AM – 6:00 PM",
};

export function useContactInfo() {
  const [info, setInfo] = useState(defaults);

  useEffect(() => {
    pb.collection("contact_info")
      .getFirstListItem("", { requestKey: null })
      .then((record) => {
        setInfo({
          phone: record.phone || defaults.phone,
          whatsapp: record.whatsapp || defaults.whatsapp,
          email: record.email || defaults.email,
          address: record.address || defaults.address,
          office_hours: record.office_hours || defaults.office_hours,
        });
      })
      .catch(() => {});
  }, []);

  return info;
}
