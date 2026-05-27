import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineUserCircle } from "react-icons/hi2";
import { pb } from "../../lib/pocketbase";
import { useAuth } from "../../context/AuthContext";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

export default function UsersAdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", passwordConfirm: "" });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = () =>
    pb.collection("_superusers")
      .getFullList({ sort: "+created" })
      .then((records) => setUsers(records))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      await pb.collection("_superusers").create({
        email: form.email,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
      });
      setForm({ email: "", password: "", passwordConfirm: "" });
      setSuccess("Admin user created successfully.");
      setTimeout(() => setSuccess(""), 3000);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  // The first-created account is the owner and can never be deleted by anyone
  const ownerUser = users.length > 0
    ? users.reduce((a, b) => new Date(a.created) < new Date(b.created) ? a : b)
    : null;

  const handleDelete = (record) => {
    if (record.id === ownerUser?.id) {
      setError("The owner account cannot be deleted.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (record.id === user?.id) {
      setError("You cannot delete your own account.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setDeleteTarget(record);
  };

  const confirmDelete = async () => {
    try {
      await pb.collection("_superusers").delete(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message);
      setDeleteTarget(null);
    }
  };

  const field = (label, props) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      <input className="input" {...props} />
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Users</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage who has access to this admin panel.
        </p>
      </div>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 font-semibold text-gray-900">Add New Admin User</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {field("Email *", {
            type: "email",
            required: true,
            placeholder: "user@example.com",
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
          })}
          {field("Password *", {
            type: "password",
            required: true,
            placeholder: "Min. 8 characters",
            value: form.password,
            onChange: (e) => setForm((f) => ({ ...f, password: e.target.value })),
          })}
          {field("Confirm Password *", {
            type: "password",
            required: true,
            placeholder: "Repeat password",
            value: form.passwordConfirm,
            onChange: (e) => setForm((f) => ({ ...f, passwordConfirm: e.target.value })),
          })}
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        {success && (
          <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
        )}

        <button
          type="submit"
          disabled={adding}
          className="mt-4 flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 cursor-pointer"
        >
          <HiOutlinePlus className="h-4 w-4" />
          {adding ? "Creating…" : "Create User"}
        </button>
      </form>

      {/* User list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <ul className="divide-y divide-gray-50">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <HiOutlineUserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{u.email}</p>
                      {u.id === ownerUser?.id && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                          Owner
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {u.id === user?.id ? "You · " : ""}
                      Added {new Date(u.created).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(u)}
                  disabled={u.id === ownerUser?.id || u.id === user?.id}
                  title={
                    u.id === ownerUser?.id
                      ? "Owner account cannot be deleted"
                      : u.id === user?.id
                      ? "Cannot delete your own account"
                      : "Delete user"
                  }
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Admin User"
          message={`Delete the admin account for "${deleteTarget.email}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
