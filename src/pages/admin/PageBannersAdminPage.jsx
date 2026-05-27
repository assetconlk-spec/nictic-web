import { useEffect, useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { pb } from "../../lib/pocketbase";
import { compressImage } from "../../lib/compressImage";

const PAGES = [
  { page: "tours",   label: "Tours Page",    title: "Our Tours",  fallback: "/images/aboutUs/tour-banner.png" },
  { page: "gallery", label: "Gallery Page",  title: "Gallery",    fallback: "/images/aboutUs/gallery.jpeg" },
  { page: "about",   label: "About Us Page", title: "About Us",   fallback: "/images/aboutUs/about-banner.png" },
  { page: "contact", label: "Contact Page",  title: "Contact Us", fallback: "/images/aboutUs/contact-us-banner.jpeg" },
];

function BannerCard({ page, label, title, fallback }) {
  const [recordId, setRecordId] = useState(null);
  const [imagePreview, setImagePreview] = useState(fallback);
  const [imageFile, setImageFile] = useState(null);
  const [position, setPosition] = useState(50);
  const [opacity, setOpacity] = useState(60);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    pb.collection("page_banners")
      .getFirstListItem(`page="${page}"`, { requestKey: null })
      .then((record) => {
        setRecordId(record.id);
        const src = record.image
          ? pb.files.getURL(record, record.image)
          : record.image_url || fallback;
        setImagePreview(src || fallback);
        setPosition(record.position ?? 50);
        setOpacity(record.opacity ?? 60);
      })
      .catch(() => {});
  }, [page, fallback]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      let record;
      if (recordId) {
        record = await pb.collection("page_banners").update(recordId, { page, position, opacity });
      } else {
        record = await pb.collection("page_banners").create({ page, position, opacity });
        setRecordId(record.id);
      }

      if (imageFile) {
        const fd = new FormData();
        fd.append("image", await compressImage(imageFile, "banner"));
        fd.append("image_url", "");
        await pb.collection("page_banners").update(record.id, fd);
        setImageFile(null);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-900">{label}</h2>
      </div>
      <div className="space-y-4 p-6">

        {/* Live Preview */}
        <div
          className="relative h-44 overflow-hidden rounded-xl bg-[#0C2B4E]"
        >
          {imagePreview && (
            <img
              src={imagePreview}
              alt={label}
              className="h-full w-full object-cover"
              style={{
                objectPosition: `center ${position}%`,
                opacity: opacity / 100,
              }}
            />
          )}
          {!imagePreview && (
            <div className="flex h-full items-center justify-center text-white/30">
              <HiOutlinePhoto className="h-10 w-10" />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-extrabold text-white drop-shadow">{title}</p>
          </div>
          <span className="absolute top-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white">
            Preview
          </span>
        </div>

        {/* File Upload */}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full cursor-pointer text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>

        {/* Position Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-gray-600">Vertical Position</label>
            <span className="text-xs font-semibold text-primary-600">{position}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary-600"
          />
          <div className="mt-0.5 flex justify-between text-xs text-gray-400">
            <span>Top</span>
            <span>Center</span>
            <span>Bottom</span>
          </div>
        </div>

        {/* Opacity Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-gray-600">Image Opacity</label>
            <span className="text-xs font-semibold text-primary-600">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full cursor-pointer accent-primary-600"
          />
          <div className="mt-0.5 flex justify-between text-xs text-gray-400">
            <span>Dark</span>
            <span>Medium</span>
            <span>Bright</span>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        {success && (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Saved successfully.
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full cursor-pointer rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default function PageBannersAdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Page Banners</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload banner images and adjust position and opacity for each page.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {PAGES.map((p) => (
          <BannerCard key={p.page} {...p} />
        ))}
      </div>
    </div>
  );
}
