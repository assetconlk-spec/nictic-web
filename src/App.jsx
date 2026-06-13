import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import TaxiPage from "./pages/TaxiPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EssentialInfoPage from "./pages/EssentialInfoPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ToursAdminPage from "./pages/admin/ToursAdminPage";
import InquiriesPage from "./pages/admin/InquiriesPage";
import EssentialInfoAdminPage from "./pages/admin/EssentialInfoAdminPage";
import AboutAdminPage from "./pages/admin/AboutAdminPage";
import ContactInfoAdminPage from "./pages/admin/ContactInfoAdminPage";
import CategoriesAdminPage from "./pages/admin/CategoriesAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import PageBannersAdminPage from "./pages/admin/PageBannersAdminPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/itineraries" replace />} />
            <Route path="itineraries" element={<ToursPage />} />
            <Route path="itineraries/:slug" element={<TourDetailPage />} />
            <Route path="taxi" element={<TaxiPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="essential-info" element={<EssentialInfoPage />} />
            <Route path="booking-success" element={<BookingSuccessPage />} />
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
            <Route path="itineraries" element={<ToursAdminPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
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
