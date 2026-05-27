import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import { compressImage } from "../../lib/compressImage";

function ImageUploadField({ label, hint, fileValue, urlValue, onFile, onUrl, preview }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-900">{label}</h2>
        {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
      </div>
      <div className="p-6 space-y-4">
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-48 w-full rounded-xl object-cover bg-gray-50"
          />
        )}
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Upload image</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Or paste image URL</label>
          <input
            type="url"
            value={fileValue ? "" : urlValue}
            onChange={onUrl}
            className="input"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="border-b border-gray-200 pb-2">
      <h2 className="text-base font-semibold text-gray-700">{title}</h2>
    </div>
  );
}

const emptyImages = { file: null, url: "", preview: "" };

export default function AboutAdminPage() {
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Homepage About Us images
  const [main, setMain] = useState(emptyImages);
  const [overlay, setOverlay] = useState(emptyImages);

  // About page Our Story images
  const [storyMain, setStoryMain] = useState(emptyImages);
  const [storyOverlay, setStoryOverlay] = useState(emptyImages);

  useEffect(() => {
    pb.collection("about_preview")
      .getFirstListItem("")
      .then((record) => {
        setRecordId(record.id);

        const resolve = (fileField, urlField) => {
          const url = record[fileField]
            ? pb.files.getURL(record, record[fileField])
            : record[urlField] || "";
          return { file: null, url: record[urlField] || "", preview: url };
        };

        setMain(resolve("main_image", "main_image_url"));
        setOverlay(resolve("overlay_image", "overlay_image_url"));
        setStoryMain(resolve("story_main_image", "story_main_image_url"));
        setStoryOverlay(resolve("story_overlay_image", "story_overlay_image_url"));
      })
      .catch(() => setRecordId(null))
      .finally(() => setLoading(false));
  }, []);

  const makeFileHandler = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter({ file, url: "", preview: URL.createObjectURL(file) });
  };

  const makeUrlHandler = (setter) => (e) => {
    setter({ file: null, url: e.target.value, preview: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      const data = {
        main_image_url: main.file ? "" : main.url,
        overlay_image_url: overlay.file ? "" : overlay.url,
        story_main_image_url: storyMain.file ? "" : storyMain.url,
        story_overlay_image_url: storyOverlay.file ? "" : storyOverlay.url,
      };

      let record;
      if (recordId) {
        record = await pb.collection("about_preview").update(recordId, data);
      } else {
        record = await pb.collection("about_preview").create(data);
        setRecordId(record.id);
      }

      const hasFiles = main.file || overlay.file || storyMain.file || storyOverlay.file;
      if (hasFiles) {
        const fd = new FormData();
        if (main.file) fd.append("main_image", await compressImage(main.file, "about"));
        if (overlay.file) fd.append("overlay_image", await compressImage(overlay.file, "about"));
        if (storyMain.file) fd.append("story_main_image", await compressImage(storyMain.file, "about"));
        if (storyOverlay.file) fd.append("story_overlay_image", await compressImage(storyOverlay.file, "about"));
        await pb.collection("about_preview").update(record.id, fd);
      }

      setMain((s) => ({ ...s, file: null }));
      setOverlay((s) => ({ ...s, file: null }));
      setStoryMain((s) => ({ ...s, file: null }));
      setStoryOverlay((s) => ({ ...s, file: null }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">About Us Images</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage images for the About Us section on the homepage and the Our Story section on the About page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Homepage About Us */}
        <SectionHeader title="Homepage — About Us Section" />
        <ImageUploadField
          label="Main Image"
          hint="Large image on the left"
          fileValue={main.file}
          urlValue={main.url}
          onFile={makeFileHandler(setMain)}
          onUrl={makeUrlHandler(setMain)}
          preview={main.preview}
        />
        <ImageUploadField
          label="Overlay Image"
          hint="Smaller image overlaid at the bottom right"
          fileValue={overlay.file}
          urlValue={overlay.url}
          onFile={makeFileHandler(setOverlay)}
          onUrl={makeUrlHandler(setOverlay)}
          preview={overlay.preview}
        />

        {/* About page Our Story */}
        <SectionHeader title="About Page — Our Story Section" />
        <ImageUploadField
          label="Main Image"
          hint="Large image on the left"
          fileValue={storyMain.file}
          urlValue={storyMain.url}
          onFile={makeFileHandler(setStoryMain)}
          onUrl={makeUrlHandler(setStoryMain)}
          preview={storyMain.preview}
        />
        <ImageUploadField
          label="Overlay Image"
          hint="Smaller image overlaid at the bottom right"
          fileValue={storyOverlay.file}
          urlValue={storyOverlay.url}
          onFile={makeFileHandler(setStoryOverlay)}
          onUrl={makeUrlHandler(setStoryOverlay)}
          preview={storyOverlay.preview}
        />

        <div className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              Changes saved successfully.
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
