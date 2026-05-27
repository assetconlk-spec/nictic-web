import { useEffect, useRef, useState } from "react";
import {
  HiOutlineTrash,
  HiOutlineCloudArrowUp,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi2";
import { pb } from "../../lib/pocketbase";
import { useCategories } from "../../hooks/useCategories";
import { compressImage } from "../../lib/compressImage";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

const MAX_FEATURED = 5;

export default function GalleryAdminPage() {
  const CATEGORIES = useCategories();
  const [images, setImages] = useState([]);
  const [activeImageId, setActiveImageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ alt: "", category: "" });
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileRef = useRef(null);

  const fetchImages = async () => {
    const data = await pb
      .collection("gallery")
      .getFullList({ sort: "-created" });
    setImages(data.map((r) => ({ ...r, src: pb.files.getURL(r, r.image) })));
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files[0];
    if (!file) {
      setError("Please select an image.");
      return;
    }
    if (!uploadForm.alt.trim()) {
      setError("Please add an image description.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const compressed = await compressImage(file, "gallery");
      const fd = new FormData();
      fd.append("image", compressed);
      fd.append("alt", uploadForm.alt);
      fd.append("category", uploadForm.category);
      await pb.collection("gallery").create(fd);
      setUploadForm({ alt: "", category: "" });
      if (fileRef.current) fileRef.current.value = "";
      fetchImages();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (image) => {
    setDeleteTarget(image);
  };

  const confirmDelete = async () => {
    await pb.collection("gallery").delete(deleteTarget.id);
    setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleToggleFeatured = async (image) => {
    const featuredCount = images.filter((i) => i.featured).length;
    if (!image.featured && featuredCount >= MAX_FEATURED) {
      setError(
        `You can only feature up to ${MAX_FEATURED} images for the homepage. Unfeature one first.`,
      );
      setTimeout(() => setError(""), 4000);
      return;
    }
    try {
      await pb
        .collection("gallery")
        .update(image.id, { featured: !image.featured });
      setImages((prev) =>
        prev.map((i) =>
          i.id === image.id ? { ...i, featured: !i.featured } : i,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Gallery</h1>
        <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
          <HiStar className="h-4 w-4 text-amber-500" />
          {images.filter((i) => i.featured).length} / {MAX_FEATURED} featured
        </span>
      </div>

      <form
        onSubmit={handleUpload}
        className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 font-semibold text-gray-900">Upload Image</h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Image File *
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Description *
            </label>
            <input
              value={uploadForm.alt}
              onChange={(e) =>
                setUploadForm((f) => ({ ...f, alt: e.target.value }))
              }
              className="input"
              placeholder="Sigiriya Rock Fortress"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Category *
            </label>
            <select
              value={uploadForm.category}
              onChange={(e) =>
                setUploadForm((f) => ({ ...f, category: e.target.value }))
              }
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
        >
          <HiOutlineCloudArrowUp className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
          <HiOutlineCloudArrowUp className="mx-auto mb-3 h-10 w-10" />
          <p className="font-medium">No images yet</p>
          <p className="mt-1 text-sm">Upload your first image above</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
              onClick={() =>
                setActiveImageId((prev) =>
                  prev === image.id ? null : image.id,
                )
              }
              onMouseLeave={() => setActiveImageId(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Star button — always visible, z-10 to sit above the hover overlay */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFeatured(image);
                }}
                title={
                  image.featured
                    ? "Remove from homepage"
                    : "Feature on homepage"
                }
                className="absolute left-2 top-2 z-10 rounded-lg p-1.5 backdrop-blur-sm transition cursor-pointer"
              >
                {image.featured ? (
                  <HiStar className="h-5 w-5 text-amber-400 drop-shadow" />
                ) : (
                  <HiOutlineStar className="h-5 w-5 text-white/80 drop-shadow hover:text-amber-400" />
                )}
              </button>

              <div
                className={`absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/60 to-transparent transition ${
                  activeImageId === image.id
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                }`}
              >
                <div className="flex justify-end p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image);
                    }}
                    className="rounded-lg bg-red-600 p-1.5 text-white transition hover:bg-red-700 cursor-pointer"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-white line-clamp-2">
                    {image.alt}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Image"
          message={`Delete "${deleteTarget.alt}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
