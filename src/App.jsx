import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EssentialInfoPage from "./pages/EssentialInfoPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ToursAdminPage from "./pages/admin/ToursAdminPage";
import GalleryAdminPage from "./pages/admin/GalleryAdminPage";
import InquiriesPage from "./pages/admin/InquiriesPage";
import SliderAdminPage from "./pages/admin/SliderAdminPage";
import EssentialInfoAdminPage from "./pages/admin/EssentialInfoAdminPage";
import AboutAdminPage from "./pages/admin/AboutAdminPage";
import ContactInfoAdminPage from "./pages/admin/ContactInfoAdminPage";
import CategoriesAdminPage from "./pages/admin/CategoriesAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import PageBannersAdminPage from "./pages/admin/PageBannersAdminPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tours" element={<ToursPage />} />
          <Route path="tours/:slug" element={<TourDetailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="essential-info" element={<EssentialInfoPage />} />
          </Route>

          {/* Admin */}
          <Route path="admin/login" element={<LoginPage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="tours" element={<ToursAdminPage />} />
            <Route path="gallery" element={<GalleryAdminPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="slider" element={<SliderAdminPage />} />
            <Route path="essential-info" element={<EssentialInfoAdminPage />} />
            <Route path="about" element={<AboutAdminPage />} />
            <Route path="contact-info" element={<ContactInfoAdminPage />} />
            <Route path="categories" element={<CategoriesAdminPage />} />
            <Route path="users" element={<UsersAdminPage />} />
            <Route path="page-banners" element={<PageBannersAdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
