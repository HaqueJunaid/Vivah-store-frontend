import React, { useEffect, lazy, Suspense, memo } from 'react';
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

// Helper to lazy-load and memoize components for optimal performance & prevent redundant re-renders
const lazyWithMemo = <P extends object>(
  factory: () => Promise<{ default: React.ComponentType<P> }>
) => {
  return lazy(() =>
    factory().then((module) => ({
      default: memo(module.default),
    }))
  );
};

// User & Static Pages (Lazy Loaded + Memoized)
const CartPage = lazyWithMemo(() => import('./pages/cart/CartPage.tsx'));
const WishListPage = lazyWithMemo(() => import('./pages/wishlist/WishListPage.tsx'));
const Faqs = lazyWithMemo(() => import('./pages/faqs/Faqs.tsx'));
const AboutUs = lazyWithMemo(() => import('./pages/static/AboutUs.tsx'));
const ContactUs = lazyWithMemo(() => import('./pages/static/ContactUs.tsx'));
const ProductLayout = lazyWithMemo(() => import('./components/layout/ProductLayout.tsx'));
const DetailProduct = lazyWithMemo(() => import('./components/products/DetailProduct.tsx'));
const OrderDetail = lazyWithMemo(() => import('./components/profile/OrderDetail.tsx'));
const Profile = lazyWithMemo(() => import('./pages/profile/Profile.tsx'));
const Register = lazyWithMemo(() => import('./pages/auth/Register.tsx'));
const Login = lazyWithMemo(() => import('./pages/auth/Login.tsx'));
const VerifyOTP = lazyWithMemo(() => import('./pages/auth/VerifyOTP.tsx'));
const ForgotPassword = lazyWithMemo(() => import('./pages/auth/ForgotPassword.tsx'));
const ResetPassword = lazyWithMemo(() => import('./pages/auth/ResetPassword.tsx'));
const NotFound = lazyWithMemo(() => import('./pages/static/NotFound.tsx'));

// Admin Components (Lazy Loaded + Memoized)
const AdminLayout = lazyWithMemo(() => import('./components/layout/AdminLayout.tsx'));
const Dashboard = lazyWithMemo(() => import('./pages/Admin/Dashboard.tsx'));
const Products = lazyWithMemo(() => import('./pages/Admin/Products.tsx'));
const AddProductPage = lazyWithMemo(() => import('./pages/Admin/AddProductPage.tsx'));
const EditProductPage = lazyWithMemo(() => import('./pages/Admin/EditProductPage.tsx'));
const Insights = lazyWithMemo(() => import('./pages/Admin/Insights.tsx'));
const Orders = lazyWithMemo(() => import('./pages/Admin/Orders.tsx'));
const Users = lazyWithMemo(() => import('./pages/Admin/Users.tsx'));

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
            <Route path="/admin/products/add" element={<AddProductPage />} />
            <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
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