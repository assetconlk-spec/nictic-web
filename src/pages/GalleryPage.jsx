import { useState, useEffect, useRef, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useCategories } from "../hooks/useCategories";
import { usePageBanner } from "../hooks/usePageBanner";
import AnimatedSection from "../components/shared/AnimatedSection";
import { pb } from "../lib/pocketbase";

const PAGE_SIZE = 18;

function mapRecord(r) {
  return { ...r, src: r.image ? pb.files.getURL(r, r.image) : r.image_url || "" };
}

function SkeletonCard({ tall }) {
  return (
    <div
      className={`mb-4 w-full animate-pulse overflow-hidden rounded-2xl bg-gray-200 ${tall ? "h-72" : "h-52"}`}
    />
  );
}

export default function GalleryPage() {
  const banner = usePageBanner("gallery", "/images/aboutUs/gallery.jpeg", 60);

  useEffect(() => { document.title = "Gallery | nictic"; }, []);

  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const loadingMoreRef = useRef(false);
  const loadKeyRef = useRef(0);
  const sentinelRef = useRef(null);

  const rawCategories = useCategories();
  const categories = ["All", ...rawCategories];

  const loadPage = useCallback(async (pageNum, category) => {
    const filter = category !== "All" ? `category="${category}"` : "";
    return pb.collection("gallery").getList(pageNum, PAGE_SIZE, {
      sort: "-id",
      filter,
      requestKey: null,
    });
  }, []);

  useEffect(() => {
    loadKeyRef.current++;
    const key = loadKeyRef.current;
    setIsLoading(true);
    setImages([]);
    setHasMore(true);
    pageRef.current = 1;
    loadingMoreRef.current = false;

    loadPage(1, active)
      .then((result) => {
        if (loadKeyRef.current !== key) return;
        setImages(result.items.map(mapRecord));
        setHasMore(result.page < result.totalPages);
      })
      .catch(() => {})
      .finally(() => { if (loadKeyRef.current === key) setIsLoading(false); });
  }, [active, loadPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !hasMore || loadingMoreRef.current) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
        const nextPage = pageRef.current + 1;
        const key = loadKeyRef.current;
        loadPage(nextPage, active)
          .then((result) => {
            if (loadKeyRef.current !== key) return;
            setImages((prev) => [...prev, ...result.items.map(mapRecord)]);
            pageRef.current = nextPage;
            setHasMore(result.page < result.totalPages);
          })
          .catch(() => {})
          .finally(() => { loadingMoreRef.current = false; setLoadingMore(false); });
      },
      { rootMargin: "400px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [active, hasMore, loadPage]);

  const lightboxSlides = images.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-gray-900">
        <img
          src={banner.src}
          alt="Gallery"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-36 md:px-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary-300">
            Sri Lanka Through Our Lens
          </span>
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Gallery
          </h1>
          <p className="mt-3 max-w-xl text-lg text-gray-300">
            Stunning moments from across the island — beaches, culture, wildlife, and beyond.
          </p>
        </div>
      </section>

      {/* ── Sticky Category Filter ── */}
      <div className="sticky top-16 z-20 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => {
              const count = cat === "All"
                ? images.length
                : images.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    active === cat
                      ? "bg-primary-500 text-white shadow-sm"
                      : "text-text-secondary hover:bg-gray-100"
                  }`}
                >
                  {cat}
                  {!isLoading && (
                    <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      active === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4">

          {isLoading ? (
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} tall={i % 3 === 0} />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-lg font-medium text-text-secondary">No images in this category yet.</p>
            </div>
          ) : (
            <AnimatedSection>
              <div className="columns-2 gap-3 md:columns-3 lg:columns-4 md:gap-4">
                {images.map((image, i) => (
                  <div
                    key={image.id}
                    className="group relative mb-3 md:mb-4 cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || "Gallery"}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Title */}
                    {image.alt && (
                      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm font-semibold leading-snug text-white drop-shadow">
                          {image.alt}
                        </p>
                        {image.category && (
                          <span className="mt-1 inline-block rounded-full bg-primary-500/80 px-2 py-0.5 text-xs font-bold text-white">
                            {image.category}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand icon */}
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
            {loadingMore && (
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  );
}
