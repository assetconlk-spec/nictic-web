import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";

export function usePageBanner(page, fallbackSrc, fallbackPosition = 50, fallbackOpacity = 60) {
  const [banner, setBanner] = useState({ src: fallbackSrc, position: fallbackPosition, opacity: fallbackOpacity });

  useEffect(() => {
    pb.collection("page_banners")
      .getFirstListItem(`page="${page}"`, { requestKey: null })
      .then((record) => {
        const src = record.image
          ? pb.files.getURL(record, record.image)
          : record.image_url || fallbackSrc;
        setBanner({
          src: src || fallbackSrc,
          position: record.position ?? fallbackPosition,
          opacity: record.opacity ?? fallbackOpacity,
        });
      })
      .catch(() => {});
  }, [page, fallbackSrc, fallbackPosition, fallbackOpacity]);

  return banner;
}
