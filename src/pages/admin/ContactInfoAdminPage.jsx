import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import { siteConfig } from "../../data/siteConfig";

const FIELDS = [
  { key: "phone", label: "Phone", placeholder: siteConfig.phone, type: "tel" },
  { key: "whatsapp", label: "WhatsApp", placeholder: siteConfig.whatsapp, type: "tel" },
  { key: "email", label: "Email", placeholder: siteConfig.email, type: "email" },
  { key: "address", label: "Address", placeholder: siteConfig.address, type: "text" },
  { key: "office_hours", label: "Office Hours", placeholder: "Mon – Sat: 8:00 AM – 6:00 PM", type: "text" },
];

const emptyForm = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  office_hours: "",
};

export default function ContactInfoAdminPage() {
  const [form, setForm] = useState(emptyForm);
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    pb.collection("contact_info")
      .getFirstListItem("")
      .then((record) => {
        setRecordId(record.id);
        setForm({
          phone: record.phone || "",
          whatsapp: record.whatsapp || "",
          email: record.email || "",
          address: record.address || "",
          office_hours: record.office_hours || "",
        });
      })
      .catch(() => setRecordId(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      if (recordId) {
        await pb.collection("contact_info").update(recordId, form);
      } else {
        const record = await pb.collection("contact_info").create(form);
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
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Contact Details</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the contact information shown on the Contact page and footer.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="divide-y divide-gray-50">
            {FIELDS.map((field) => (
              <div key={field.key} className="grid grid-cols-3 items-center gap-4 px-6 py-4">
                <label className="text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                  className="input col-span-2"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              Contact details saved successfully.
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
