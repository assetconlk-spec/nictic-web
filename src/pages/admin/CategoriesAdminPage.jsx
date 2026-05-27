import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { pb } from "../../lib/pocketbase";
import { Categories } from "../../data/commonData";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchCategories = () =>
    pb.collection("categories")
      .getFullList({ sort: "+created" })
      .then((records) => setCategories(records))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setError("");
    setAdding(true);
    try {
      await pb.collection("categories").create({ name });
      setNewName("");
      setSuccess(`"${name}" added.`);
      setTimeout(() => setSuccess(""), 3000);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = (record) => {
    setDeleteTarget(record);
  };

  const confirmDelete = async () => {
    await pb.collection("categories").delete(deleteTarget.id);
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Tour Categories</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the category filters shown on the Tours and Gallery pages.
        </p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input flex-1"
          placeholder="e.g. Wildlife"
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
        >
          <HiOutlinePlus className="h-4 w-4" />
          Add
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
      )}

      {/* Category list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {categories.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No custom categories yet. Using defaults: {Categories.filter((c) => c !== "All").join(", ")}.
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {categories.map((cat, i) => (
                <li key={cat.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Note: deleting a category does not affect existing tours or gallery items already assigned to it.
      </p>

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Category"
          message={`Delete the category "${deleteTarget.name}"? Existing tours and gallery items with this category won't be changed.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
