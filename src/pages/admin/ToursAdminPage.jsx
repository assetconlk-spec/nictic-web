import { useEffect, useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineXMark,
} from "react-icons/hi2";
import { pb } from "../../lib/pocketbase";
import { useCategories } from "../../hooks/useCategories";
import { compressImage } from "../../lib/compressImage";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  duration: "",
  price: "",
  rating: "5.0",
  featured: false,
  popular: false,
  image: "",
  map_image: "",
  description: "",
  highlights: "",
  inclusions: "",
  exclusions: "",
  overview_title: "",
  minpax: "",
  maxpax: "",
  minimum_age: "",
  vehicle: "",
  difficulty: "",
  itinerary: [],
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeTour(record) {
  return {
    ...record,
    image: record.image
      ? pb.files.getURL(record, record.image)
      : record.image_url || "",
    map_image: record.map_image
      ? pb.files.getURL(record, record.map_image)
      : "",
    highlights: Array.isArray(record.highlights) ? record.highlights : [],
    inclusions: Array.isArray(record.inclusions) ? record.inclusions : [],
    exclusions: Array.isArray(record.exclusions) ? record.exclusions : [],
    itinerary: Array.isArray(record.itinerary) ? record.itinerary : [],
  };
}

const emptyItineraryItem = {
  day: "",
  title: "",
  description: "",
  overnight: "",
  optionalActivities: "",
  specialInformation: "",
};

function Modal({ tour, onClose, onSaved }) {
  const CATEGORIES = useCategories();
  const [form, setForm] = useState(
    tour
      ? {
          ...tour,
          highlights: (tour.highlights || []).join("\n"),
          inclusions: (tour.inclusions || []).join("\n"),
          exclusions: (tour.exclusions || []).join("\n"),
          itinerary:
            Array.isArray(tour.itinerary) && tour.itinerary.length > 0
              ? tour.itinerary
              : [],
        }
      : emptyForm,
  );
  const [imageFile, setImageFile] = useState(null);
  const [mapImageFile, setMapImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // When categories load from PocketBase, sync form.category to a valid option
  useEffect(() => {
    if (CATEGORIES.length > 0 && !CATEGORIES.includes(form.category)) {
      setForm((f) => ({ ...f, category: CATEGORIES[0] }));
    }
  }, [CATEGORIES]);

  const set = (field, value) =>
    setForm((f) => ({
      ...f,
      [field]: value,
      ...(field === "title" && !tour ? { slug: slugify(value) } : {}),
    }));

  const addItineraryItem = () =>
    setForm((f) => ({
      ...f,
      itinerary: [...f.itinerary, { ...emptyItineraryItem }],
    }));

  const removeItineraryItem = (index) =>
    setForm((f) => ({
      ...f,
      itinerary: f.itinerary.filter((_, i) => i !== index),
    }));

  const updateItineraryItem = (index, field, value) =>
    setForm((f) => ({
      ...f,
      itinerary: f.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setForm((f) => ({ ...f, image: URL.createObjectURL(file) }));
    }
  };

  const handleMapImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMapImageFile(file);
      setForm((f) => ({ ...f, map_image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);
    try {
      const itinerary = form.itinerary;
      const highlights = form.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean);
      const inclusions = form.inclusions
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean);
      const exclusions = form.exclusions
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean);

      // Step 1: save text + JSON fields as plain object
      const data = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        duration: form.duration,
        price: Number(form.price),
        rating: Number(form.rating),
        featured: form.featured,
        popular: form.popular,
        description: form.description,
        highlights,
        inclusions,
        exclusions,
        overview_title: form.overview_title || "",
        minpax: form.minpax || "",
        maxpax: form.maxpax || "",
        minimum_age: form.minimum_age || "",
        vehicle: form.vehicle || "",
        difficulty: form.difficulty || "",
        itinerary,
      };

      const isNew = !tour;
      let record;
      if (tour) {
        record = await pb.collection("tours").update(tour.id, data);
      } else {
        record = await pb.collection("tours").create(data);
      }

      // Step 2: upload files separately if any
      const hasFiles =
        imageFile ||
        mapImageFile ||
        (form.image &&
          form.image.startsWith("http") &&
          !form.image.includes("/api/files/"));

      if (hasFiles) {
        const fd = new FormData();
        if (imageFile) {
          fd.append("image", await compressImage(imageFile, "tour"));
          fd.append("image_url", "");
        } else if (
          form.image &&
          form.image.startsWith("http") &&
          !form.image.includes("/api/files/")
        ) {
          fd.append("image_url", form.image);
        }
        if (mapImageFile) {
          fd.append("map_image", await compressImage(mapImageFile, "tour"));
        }
        await pb.collection("tours").update(record.id, fd);
      }

      onSaved(isNew);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-bold text-gray-900">
            {tour ? "Edit Tour" : "Add Tour"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Title *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className="input"
                placeholder="Cultural Triangle Explorer"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Slug *
              </label>
              <input
                required
                value={form.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                className="input"
                placeholder="cultural-triangle"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Duration *
              </label>
              <input
                required
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                className="input"
                placeholder="7 Days / 6 Nights"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Price (USD) *
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="input"
                placeholder="899"
              />
            </div>
            {/* <div>...</div> */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Difficulty
              </label>
              <select
                value={form.difficulty}
                onChange={(e) => set("difficulty", e.target.value)}
                className="input"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 cursor-pointer"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Show on homepage (Featured)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="popular"
                checked={form.popular}
                onChange={(e) => set("popular", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 cursor-pointer"
              />
              <label
                htmlFor="popular"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Mark as Popular Tour
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 h-32 w-full rounded-lg object-cover"
              />
            )}
            <p className="mt-1 text-xs text-gray-400">Or paste an image URL:</p>
            <input
              type="url"
              value={imageFile ? "" : form.image}
              onChange={(e) => {
                setImageFile(null);
                set("image", e.target.value);
              }}
              className="input mt-1"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Route Map Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMapImageFile}
              className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            />
            {form.map_image && (
              <img
                src={form.map_image}
                alt="route map preview"
                className="mt-2 h-40 w-full rounded-lg object-contain bg-gray-50"
              />
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="input resize-none"
              placeholder="Describe the tour..."
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Highlights <span className="text-gray-400">(one per line)</span>
            </label>
            <textarea
              rows={4}
              value={form.highlights}
              onChange={(e) => set("highlights", e.target.value)}
              className="input resize-none"
              placeholder={
                "Sigiriya Rock Fortress\nTemple of the Tooth\nDambulla Cave Temple"
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Inclusions <span className="text-gray-400">(one per line)</span>
              </label>
              <textarea
                rows={5}
                value={form.inclusions}
                onChange={(e) => set("inclusions", e.target.value)}
                className="input resize-none"
                placeholder={
                  "Airport transfers\nAccommodation\nAll meals\nEnglish speaking guide"
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Exclusions <span className="text-gray-400">(one per line)</span>
              </label>
              <textarea
                rows={5}
                value={form.exclusions}
                onChange={(e) => set("exclusions", e.target.value)}
                className="input resize-none"
                placeholder={
                  "International flights\nVisa fees\nPersonal expenses\nTips & gratuities"
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Overview Title
              </label>
              <input
                value={form.overview_title}
                onChange={(e) => set("overview_title", e.target.value)}
                className="input"
                placeholder="The Ultimate Journey"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Vehicle
              </label>
              <input
                value={form.vehicle}
                onChange={(e) => set("vehicle", e.target.value)}
                className="input"
                placeholder="Luxury Van / Sedan Car"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Min Pax
              </label>
              <input
                type="number"
                min="0"
                value={form.minpax}
                onChange={(e) => set("minpax", e.target.value)}
                className="input"
                placeholder="2"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Max Pax
              </label>
              <input
                type="number"
                min="0"
                value={form.maxpax}
                onChange={(e) => set("maxpax", e.target.value)}
                className="input"
                placeholder="8"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Minimum Age
              </label>
              <input
                type="number"
                min="0"
                value={form.minimum_age}
                onChange={(e) => set("minimum_age", e.target.value)}
                className="input"
                placeholder="18"
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600">
                Itinerary
              </label>
            </div>
            {form.itinerary.length === 0 && (
              <p className="rounded-lg border border-dashed border-gray-200 py-4 text-center text-xs text-gray-400">
                No itinerary days yet. Click &quot;Add Day&quot; to start.
              </p>
            )}
            <div className="space-y-3">
              {form.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="mb-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="rounded p-0.5 text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <HiOutlineTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-0.5 block text-xs text-gray-500">
                        Day Label
                      </label>
                      <input
                        value={item.day}
                        onChange={(e) =>
                          updateItineraryItem(index, "day", e.target.value)
                        }
                        className="input text-xs py-1.5"
                        placeholder="Day 01-02"
                      />
                    </div>
                    <div>
                      <label className="mb-0.5 block text-xs text-gray-500">
                        Title
                      </label>
                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateItineraryItem(index, "title", e.target.value)
                        }
                        className="input text-xs py-1.5"
                        placeholder="Colombo Arrival"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="mb-0.5 block text-xs text-gray-500">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateItineraryItem(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="input resize-none text-xs py-1.5"
                      placeholder="Transfer to hotel..."
                    />
                  </div>
                  <div className="mt-2">
                    <label className="mb-0.5 block text-xs text-gray-500">
                      Optional activities
                    </label>
                    <textarea
                      rows={2}
                      value={item.optionalActivities}
                      onChange={(e) =>
                        updateItineraryItem(
                          index,
                          "optionalActivities",
                          e.target.value,
                        )
                      }
                      className="input resize-none text-xs py-1.5"
                      placeholder="Play cricket..."
                    />
                  </div>
                  <div className="mt-2">
                    <label className="mb-0.5 block text-xs text-gray-500">
                      Special information
                    </label>
                    <textarea
                      rows={2}
                      value={item.specialInformation}
                      onChange={(e) =>
                        updateItineraryItem(
                          index,
                          "specialInformation",
                          e.target.value,
                        )
                      }
                      className="input resize-none text-xs py-1.5"
                      placeholder="special information..."
                    />
                  </div>
                  <div className="mt-2">
                    <label className="mb-0.5 block text-xs text-gray-500">
                      Overnight
                    </label>
                    <input
                      value={item.overnight}
                      onChange={(e) =>
                        updateItineraryItem(index, "overnight", e.target.value)
                      }
                      className="input text-xs py-1.5"
                      placeholder="Colombo"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={addItineraryItem}
                className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 cursor-pointer"
              >
                <HiOutlinePlus className="h-3.5 w-3.5" />
                Add Day
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
            >
              {uploading ? "Saving…" : tour ? "Save Changes" : "Add Tour"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ToursAdminPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [success, setSuccess] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 4000);
  };

  const fetchTours = async () => {
    const data = await pb.collection("tours").getFullList({ sort: "-created" });
    setTours(data.map(normalizeTour));
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = (tour) => {
    setDeleteTarget(tour);
  };

  const confirmDelete = async () => {
    await pb.collection("tours").delete(deleteTarget.id);
    setTours((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    showSuccess("Tour deleted successfully.");
    setDeleteTarget(null);
  };

  const handleSaved = (isNew) => {
    setModal(null);
    fetchTours();
    showSuccess(isNew ? "Tour added successfully." : "Tour updated successfully.");
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Tours</h1>
        <button
          onClick={() => setModal("add")}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 cursor-pointer"
        >
          <HiOutlinePlus className="h-4 w-4" />
          Add Tour
        </button>
      </div>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : tours.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center text-gray-400">
          <p className="font-medium">No tours yet</p>
          <p className="mt-1 text-sm">
            Click &quot;Add Tour&quot; to get started
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Tour</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Duration
                </th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  Featured
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {tour.image && (
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="h-10 w-14 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <span className="font-medium text-gray-900 line-clamp-1">
                        {tour.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500">
                    {tour.category}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">
                    {tour.duration}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    ${tour.price}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        tour.featured
                          ? "bg-primary-50 text-primary-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tour.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setModal(tour)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                      >
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tour)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal
          tour={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Tour"
          message={`Delete the tour "${deleteTarget.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
