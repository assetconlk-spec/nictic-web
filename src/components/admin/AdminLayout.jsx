import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  HiOutlineHome,
  HiOutlineMap,
  HiOutlinePhoto,
  HiOutlineEnvelope,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlinePhone,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineClock,
} from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import { useIdleTimeout } from "../../hooks/useIdleTimeout";

const navItems = [
  { to: "/admin/dashboard", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/admin/slider", icon: HiOutlineSquares2X2, label: "Home Slider" },
  { to: "/admin/tours", icon: HiOutlineMap, label: "Tours" },
  { to: "/admin/gallery", icon: HiOutlinePhoto, label: "Gallery" },
  { to: "/admin/inquiries", icon: HiOutlineEnvelope, label: "Inquiries" },
  { to: "/admin/essential-info", icon: HiOutlineDocumentText, label: "Essential Info" },
  { to: "/admin/about", icon: HiOutlineUsers, label: "About Us" },
  { to: "/admin/contact-info", icon: HiOutlinePhone, label: "Contact Info" },
  { to: "/admin/categories", icon: HiOutlineSquares2X2, label: "Categories" },
  { to: "/admin/page-banners", icon: HiOutlineRectangleStack, label: "Page Banners" },
  { to: "/admin/users", icon: HiOutlineUserCircle, label: "Admin Users" },
];

function SidebarContent({ onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <span className="text-lg font-bold text-white">
          Gajalanka Tours Admin
        </span>
      </div>

      <nav className="admin-nav flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function IdleWarningModal({ countdown, onStay, onLogout }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (countdown / 60) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="5" />
            <circle
              cx="32" cy="32" r={radius}
              fill="none"
              stroke={countdown <= 10 ? "#ef4444" : "#0C2B4E"}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <text
              x="32" y="32"
              textAnchor="middle"
              dominantBaseline="central"
              className="rotate-90"
              style={{ transform: "rotate(90deg)", transformOrigin: "32px 32px", fontSize: "14px", fontWeight: "700", fill: countdown <= 10 ? "#ef4444" : "#111827" }}
            >
              {countdown}
            </text>
          </svg>
        </div>

        <div className="mb-1 flex items-center justify-center gap-2 text-gray-900">
          <HiOutlineClock className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold">Session Expiring</h2>
        </div>
        <p className="mb-6 text-sm text-gray-500">
          You've been inactive for a while. You'll be logged out in{" "}
          <span className={`font-semibold ${countdown <= 10 ? "text-red-600" : "text-gray-900"}`}>
            {countdown} second{countdown !== 1 ? "s" : ""}
          </span>.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onStay}
            className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Stay Logged In
          </button>
          <button
            onClick={onLogout}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const { showWarning, countdown, stayLoggedIn } = useIdleTimeout(handleLogout);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Idle warning modal */}
      {showWarning && (
        <IdleWarningModal
          countdown={countdown}
          onStay={stayLoggedIn}
          onLogout={handleLogout}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex h-full w-64 flex-col">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-lg p-1 text-gray-400 hover:text-white"
            >
              <HiOutlineXMark className="h-6 w-6" />
            </button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 lg:px-6">
          <button
            className="mr-3 text-gray-500 hover:text-gray-900 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineBars3 className="h-6 w-6" />
          </button>
          <p className="text-sm font-medium text-gray-500">Gajalanka Tours</p>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
