import { useState, useEffect, useRef, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useCategories } from "../hooks/useCategories";
import { usePageBanner } from "../hooks/usePageBanner";
import AnimatedSection from "../components/shared/AnimatedSection";
import { pb } from "../lib/pocketbase";
import PageLoader from "../components/shared/PageLoader";

const PAGE_SIZE = 15;

function mapRecord(r) {
  return { ...r, src: pb.files.getURL(r, r.image) };
}

export default function GalleryPage() {
  const banner = usePageBanner("gallery", "/images/aboutUs/gallery.jpeg", 60);

  useEffect(() => { document.title = "Gallery | Gajalanka Tours"; }, []);

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
      sort: "-created",
      filter,
      requestKey: null,
    });
  }, []);

  // Reset and load page 1 when category changes
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
      .finally(() => {
        if (loadKeyRef.current === key) setIsLoading(false);
      });
  }, [active, loadPage]);

  // Infinite scroll sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !hasMore || loadingMoreRef.current) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
        const nextPage = pageRef.current + 1;
        const currentActive = active;
        const key = loadKeyRef.current;

        loadPage(nextPage, currentActive)
          .then((result) => {
            if (loadKeyRef.current !== key) return;
            setImages((prev) => [...prev, ...result.items.map(mapRecord)]);
            pageRef.current = nextPage;
            setHasMore(result.page < result.totalPages);
          })
          .catch(() => {})
          .finally(() => {
            loadingMoreRef.current = false;
            setLoadingMore(false);
          });
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [active, hasMore, loadPage]);

  // Group images into sets of 5 for the desktop layout
  const groups = [];
  for (let i = 0; i < images.length; i += 5) {
    groups.push({ items: images.slice(i, i + 5), offset: i });
  }

  const lightboxSlides = images.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex items-center justify-center bg-primary-900 pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src={banner.src}
            alt="Gallery hero"
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${banner.position}%`, opacity: banner.opacity / 100 }}
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Browse stunning images from across Sri Lanka and get inspired for
            your next adventure.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-surface py-8 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                  active === cat
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <PageLoader />
          ) : images.length === 0 ? (
            <p className="py-16 text-center text-lg text-text-secondary">
              No images found in this category.
            </p>
          ) : (
            <AnimatedSection>
              {/* Mobile: 2-col uniform grid */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                {images.map((image, i) => (
                  <div
                    key={image.id}
                    className="aspect-square overflow-hidden rounded-2xl cursor-pointer"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt || "Gallery"}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Desktop: repeating 5-image pattern */}
              <div className="hidden md:flex md:flex-col md:gap-4">
                {groups.map(({ items, offset }, gi) => {
                  const isFull = items.length === 5;

                  if (isFull) {
                    return (
                      <div
                        key={gi}
                        className="grid h-120 grid-cols-3 grid-rows-2 gap-4"
                      >
                        {/* Large featured image — spans 2 rows */}
                        <div
                          className="row-span-2 overflow-hidden rounded-2xl cursor-pointer"
                          onClick={() => setLightboxIndex(offset)}
                        >
                          <img
                            src={items[0].src}
                            alt={items[0].alt || "Gallery"}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        </div>
                        {/* Four smaller images in 2×2 */}
                        {items.slice(1).map((image, ii) => (
                          <div
                            key={image.id}
                            className="overflow-hidden rounded-2xl cursor-pointer"
                            onClick={() => setLightboxIndex(offset + ii + 1)}
                          >
                            <img
                              src={image.src}
                              alt={image.alt || "Gallery"}
                              className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Partial last group — uniform grid
                  return (
                    <div key={gi} className="grid grid-cols-3 gap-4">
                      {items.map((image, ii) => (
                        <div
                          key={image.id}
                          className="aspect-4/3 overflow-hidden rounded-2xl cursor-pointer"
                          onClick={() => setLightboxIndex(offset + ii)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt || "Gallery"}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
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
                    className="h-2.5 w-2.5 rounded-full bg-primary-300 animate-bounce"
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
