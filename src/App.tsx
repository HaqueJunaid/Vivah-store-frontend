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

// Code-split pages for faster initial load and resource efficiency
const CartPage = lazy(() => import('./pages/cart/CartPage.tsx'));
const WishListPage = lazy(() => import('./pages/wishlist/WishListPage.tsx'));
const Faqs = lazy(() => import('./pages/faqs/Faqs.tsx'));
const AboutUs = lazy(() => import('./pages/static/AboutUs.tsx'));
const ContactUs = lazy(() => import('./pages/static/ContactUs.tsx'));
const ProductLayout = lazy(() => import('./components/layout/ProductLayout.tsx'));
const DetailProduct = lazy(() => import('./components/products/DetailProduct.tsx'));
const OrderDetail = lazy(() => import('./components/profile/OrderDetail.tsx'));
const Profile = lazy(() => import('./pages/profile/Profile.tsx'));
const Register = lazy(() => import('./pages/auth/Register.tsx'));
const Login = lazy(() => import('./pages/auth/Login.tsx'));
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP.tsx'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.tsx'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword.tsx'));
const NotFound = lazy(() => import('./pages/static/NotFound.tsx'));

// Admin Related Components (Lazy loaded)
const AdminLayout = lazy(() => import('./components/layout/AdminLayout.tsx'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard.tsx'));
const Products = lazy(() => import('./pages/Admin/Products.tsx'));
const Insights = lazy(() => import('./pages/Admin/Insights.tsx'));
const Orders = lazy(() => import('./pages/Admin/Orders.tsx'));
const Users = lazy(() => import('./pages/Admin/Users.tsx'));

const App = () => {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const syncWithBackend = useCartStore((state) => state.syncWithBackend);

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
      <ProgressBar />
      <Suspense fallback={<ProgressBar />}>
        <Routes>
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
          <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/insights" element={<Insights />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App