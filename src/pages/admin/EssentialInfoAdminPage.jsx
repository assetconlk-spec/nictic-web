import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import RichTextEditor from "../../components/shared/RichTextEditor";

const SECTIONS = [
  {
    key: "terms_and_conditions",
    label: "Terms and Conditions",
    placeholder:
      "Enter terms and conditions here...\n\nEach paragraph on a new line.",
  },
  {
    key: "payment_cancellation_policy",
    label: "Payment and Cancellation Policy",
    placeholder:
      "Enter payment and cancellation policy here...\n\nEach paragraph on a new line.",
  },
  {
    key: "guest_obligations",
    label: "Guest Obligations",
    placeholder:
      "Enter guest obligations here...\n\nEach paragraph on a new line.",
  },
  {
    key: "important_information",
    label: "Important Information",
    placeholder:
      "Enter important information here...\n\nEach paragraph on a new line.",
  },
];

const emptyForm = {
  terms_and_conditions: "",
  payment_cancellation_policy: "",
  guest_obligations: "",
  important_information: "",
};

export default function EssentialInfoAdminPage() {
  const [form, setForm] = useState(emptyForm);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    pb.collection("essential_info")
      .getFirstListItem("")
      .then((record) => {
        setRecordId(record.id);
        setForm({
          terms_and_conditions: record.terms_and_conditions || "",
          payment_cancellation_policy: record.payment_cancellation_policy || "",
          guest_obligations: record.guest_obligations || "",
          important_information: record.important_information || "",
        });
      })
      .catch(() => {
        setRecordId(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      if (recordId) {
        await pb.collection("essential_info").update(recordId, form);
      } else {
        const record = await pb.collection("essential_info").create(form);
        setRecordId(record.id);
      }
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
          <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Essential Information</h1>
        <p className="mt-1 text-sm text-gray-500">
          Edit the content shown on the Essential Information page. Each
          paragraph should be on a new line.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 px-6 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                {section.label}
              </h2>
            </div>
            <div className="p-6">
              <RichTextEditor
                value={form[section.key]}
                onChange={(val) =>
                  setForm((f) => ({ ...f, [section.key]: val }))
                }
                placeholder={section.placeholder}
              />
              <p className="mt-1 text-xs text-gray-400">
                Select text then click B / I / U to format, or use the bullet button.
              </p>
            </div>
          </div>
        ))}

        <div className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
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
