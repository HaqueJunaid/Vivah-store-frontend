import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop.tsx";
import ProgressBar from "./components/common/ProgressBar.tsx";
import UserLayout from './components/layout/userLayout.tsx';
import HomePage from './pages/home/HomePage.tsx';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';
import { useAuthStore } from './store/authStore';
import { setAuthToken } from './services/api';
import { useCartStore } from './store/cartStore';
import { useCategoryStore } from './store/categoryStore';

// Eager/Direct Imports for All User & Public Pages for Instant Responsiveness & Zero Transition Lag
import CartPage from './pages/cart/CartPage.tsx';
import WishListPage from './pages/wishlist/WishListPage.tsx';
import Faqs from './pages/faqs/Faqs.tsx';
import AboutUs from './pages/static/AboutUs.tsx';
import ContactUs from './pages/static/ContactUs.tsx';
import ProductLayout from './components/layout/ProductLayout.tsx';
import DetailProduct from './components/products/DetailProduct.tsx';
import OrderDetail from './components/profile/OrderDetail.tsx';
import Profile from './pages/profile/Profile.tsx';
import Register from './pages/auth/Register.tsx';
import Login from './pages/auth/Login.tsx';
import VerifyOTP from './pages/auth/VerifyOTP.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import NotFound from './pages/static/NotFound.tsx';

// Only Admin Pages are Lazy Loaded
const AdminLayout = lazy(() => import('./components/layout/AdminLayout.tsx'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard.tsx'));
const Products = lazy(() => import('./pages/Admin/Products.tsx'));
const AddProductPage = lazy(() => import('./pages/Admin/AddProductPage.tsx'));
const EditProductPage = lazy(() => import('./pages/Admin/EditProductPage.tsx'));
const Insights = lazy(() => import('./pages/Admin/Insights.tsx'));
const Orders = lazy(() => import('./pages/Admin/Orders.tsx'));
const Users = lazy(() => import('./pages/Admin/Users.tsx'));

const App = () => {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const syncWithBackend = useCartStore((state) => state.syncWithBackend);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setAuthToken(token ?? undefined);
    if (token && isHydrated) {
      syncWithBackend().catch((err) => {
        console.error("Initial cart sync failed:", err);
      });
    }
  }, [token, isHydrated, syncWithBackend]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* User & Auth Routes - Rendered Instantly with Zero Lazy Chunk Delay */}
        <Route path="register" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />

        <Route element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='wishlist' element={<WishListPage />} />
          <Route path='faqs' element={<Faqs />} />
          <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path="products" element={<ProductLayout />} />
          <Route path="products/:id" element={<ProductLayout />} />
          <Route path="products/:id/details" element={<DetailProduct />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>

        {/* Admin Routes - Lazy Loaded with Suspense */}
        <Route
          element={
            <RequireAdmin>
              <Suspense fallback={<ProgressBar />}>
                <AdminLayout />
              </Suspense>
            </RequireAdmin>
          }
        >
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/insights" element={<Insights />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;