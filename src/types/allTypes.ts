import React from 'react';
import type { AxiosProgressEvent } from 'axios';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Cancelled';

export interface SelectedProductVariant {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  image?: string;
  images?: string[];
  inStock?: boolean;
}

export interface OrderLineItem {
  product?: string | { imageUrls?: string[]; title?: string };
  name: string;
  price: number;
  quantity: number;
  productImage?: string;
  selectedVariant?: SelectedProductVariant | string | null;
  customizations?: Record<string, string>;
  uploadedImage?: string;
}

export interface OrderRecord {
  _id: string;
  user?: string;
  items: OrderLineItem[];
  shippingAddress?: AddressItem;
  subtotal?: number;
  shippingCost?: number;
  gstAmount?: number;
  totalAmount: number;
  paymentMethod: 'cashfree' | 'cod' | 'card' | 'upi' | 'mock';
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    cfPaymentId?: string | null;
    bankReference?: string | null;
    paymentAmount?: number;
    paymentCurrency?: string;
    paymentMethod?: string;
    paymentTime?: string;
  } | null;
  status: OrderStatus;
  createdAt?: string;
}

export interface CartItem {
    id: number;
    name: string;
    code: string;
    price: number;
    quantity: number;
    image: string;
    description?: string;
}

export interface OrderSummaryProps {
    subtotal: number;
    gstRate?: number;
    shippingCost?: number;
    onCheckout?: () => void;
    disabled?: boolean;
    paymentMethod?: 'cashfree';
    setPaymentMethod?: (method: 'cashfree') => void;
}

export interface CartItemProps {
    cartItems: CartItem[];
    updateQuantity: (id: number, change: number) => void;
    removeItem: (id: number) => void;
}

export interface ProductInfo {
    description: string;
    about?: string;
    note?: string;
}

export interface ProductContentProps {
    id: string;
    title: string;
    price: string;
    description?: string;
    productInfo?: ProductInfo;
    inStock: boolean;
    canUploadImage?: boolean;
    variants?: {
        name: string;
        images: string[];
        inStock: boolean;
    }[];
    customizable?: boolean;
    isCustomizable?: boolean;
    customizations?: string[];
    hasFixedQuantities?: boolean;
    batchQuantities?: number[];
    hasDimensions?: boolean;
    dimensions?: ProductDimension[];
    selectedImage?: number;
    selectedVariantIndex?: number;
    selectedImageUrl?: string;
    hasVariants?: boolean;
    handleVariantChange: (index: number) => void
}

export interface AddressItem {
    _id?: string;
    firstName: string;
    lastName: string;
    company?: string;
    country: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode: string;
    phone: string;
}

export interface AddAddressFormProps {
    initialData?: AddressItem | null;
    cancel: (show: boolean) => void;
    onSubmitSuccess: (address: AddressItem) => void;
}

export interface AddressPreviewProps extends AddressItem {
    onEdit: () => void;
    onDelete: () => void;
}

export type HeadBarProps = {
  onMenuClick?: () => void
  onSearchClick?: () => void
}

// Wishlist Store Types
export interface WishlistItemInterface {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
}

export interface WishlistStoreInterface {
    wishlistItems: WishlistItemInterface[];
    addWishlistItem: (wishlistItem: WishlistItemInterface) => void;
    removeWishlistItem: (productId: string) => void;
    clearWishlist: () => void;
    getWishlistItemsLength: () => number;
    isInWishlist: (productId: string) => boolean;
}

export interface ProductDimension {
  _id?: string;
  id?: string;
  label?: string;
  width?: string | number;
  height?: string | number;
  thickness?: string | number;
  unit?: string;
}

export interface ProductVariant {
  _id?: string;
  title: string;
  name?: string;
  image?: string;
  images: string[];
  inStock?: boolean;
}

// Product Store Types
export interface Product {
  _id: string;
  id?: string;
  title: string;
  price: number;
  quantity?: number;
  inStock?: boolean;
  category: string;
  subCategory?: string;
  imageUrls?: string[];
  imageUrl?: string;
  thumbnail?: string;
  description?: string;
  productInfo?: ProductInfo;
  hasVariants?: boolean;
  variantTitle?: string;
  variantImages?: string[];
  variants?: ProductVariant[];
  isCustomizable?: boolean;
  customizations?: string[];
  hasFixedQuantities?: boolean;
  batchQuantities?: number[];
  hasDimensions?: boolean;
  dimensions?: ProductDimension[];
  createdAt?: string;
}

export interface ProductStore {
  products: Product[];
  total: number;
  loading: boolean;
  error?: string;
  fetchProducts: (page?: number, limit?: number, append?: boolean, search?: string, category?: string, stockStatus?: string, sortBy?: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  addProduct: (productData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, productData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => Promise<void>;
}

// Cart Store Types
export interface cartItemInterface {
    productId: string;
    productName: string;
    productPrice: number | string;
    productImage?: string;
    productQuantity: number;
    selectedVariant?: SelectedProductVariant | string | null;
    uploadedImage?: string;
    customizations?: Record<string, string>;
}

export interface cartStoreInterface {
    cartItems: cartItemInterface[];
    isHydrated: boolean;
    setHydrated: (val: boolean) => void;
    addCartItem: (cartItem: cartItemInterface) => void;
    removeCartItem: (productId: string, customizations?: Record<string, string>, selectedVariant?: SelectedProductVariant | string | null) => void;
    updateCartItemQuantity: (productId: string, quantity: number, customizations?: Record<string, string>, selectedVariant?: SelectedProductVariant | string | null) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsLength: () => number;
    getCartIsInCart: (productId: string) => boolean;
    syncWithBackend: () => Promise<void>;
    fetchCartFromBackend: () => Promise<void>;
}

// Auth Store Types
export type UserRole = 'user' | 'admin' | null;
export type AuthProvider = 'email' | 'google' | null;

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    provider: AuthProvider;
    avatar?: string | null;
}

export interface AuthState {
    token: string | null;
    role: UserRole;
    user: AuthUser | null;
    setToken: (token: string | null, role?: UserRole, user?: AuthUser | null) => void;
    setUser: (user: AuthUser | null) => void;
    logout: () => void;
    hasRole: (requiredRole: UserRole | UserRole[]) => boolean;
}

// Cart Service Types
export interface CartItemApi {
    productId: string;
    productName: string;
    productPrice: number;
    productImage?: string;
    productQuantity: number;
    selectedVariant?: SelectedProductVariant | string | null;
    uploadedImage?: string;
    customizations?: Record<string, string>;
}

// Auth Service Types
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOTPPayload {
  email: string;
  otp: string;
}

export interface ResendOTPPayload {
  email: string;
}

export interface GoogleAuthPayload {
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
}

// Address Service Types
export interface AddressData {
    _id?: string;
    firstName: string;
    lastName: string;
    company?: string;
    country: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode: string;
    phone: string;
}

// Register Form Types
export type RegisterInputs = {
    username: string;
    email: string;
    password: string;
};

// Login Form Types
export type LoginInputs = {
    email: string;
    password: string;
};

// Admin Page User Type
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  date: string;
  ordersCount: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended";
  role?: 'user' | 'admin';
};

// Admin Product List Item Props
export interface ProductListItemProps {
  product: Product & { id?: string; imageUrl?: string };
  onEdit: (product: Product & { id?: string; imageUrl?: string }) => void;
  onDelete: (id: string, title: string) => void;
  onPreview?: (productId: string) => void;
  onCopyId?: (id: string, e: React.MouseEvent) => void;
  copiedId?: string | null;
}

// Admin Page Order Types
export type AdminOrderItem = {
  name: string;
  price: number;
  qty: number;
};

export type AdminOrder = {
  id: string;
  date: string;
  items: AdminOrderItem[];
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

// Navigation Constants Types
export interface BaseItem {
  title: string;
  url: string;
}

export interface DropdownItem {
  _id?: string | React.Key | null;
  title: string;
  url: string;
  baseItems?: BaseItem[];
}

// Address Form Inputs Type
export type AddressFormInputs = {
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    address: string;
    apartment: string;
    city: string;
    postalCode: string;
    phone: string;
};

// Layout Modes
export type LayoutMode = 'grid-2' | 'grid-3' | 'grid-4' | 'list';
export type LayoutChangerMode = 'grid-2' | 'grid-3' | 'grid-4';

// Product Grid Props Type
export type ProductGridProps = {
  children: React.ReactNode;
  layout?: LayoutMode;
};

// Product Card Props Type
export type ProductCardProps = {
  title: string;
  price: number;
  imageUrl: string;
  layout?: LayoutMode;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onCompare?: () => void;
  id: string;
  inStock: boolean;
};

// Price Range Slider Props Type
export type PriceRangeSliderProps = {
  max: number;
  step?: number;
  value: number;
  onChange: (nextValue: number) => void;
  formatValue?: (value: number) => string;
};

// Layout Changer Props Type
export type LayoutChangerProps = {
  layout: LayoutChangerMode;
  setLayout: (layout: LayoutChangerMode) => void;
};

// Collection Card Props Type
export type CollectionCardProps = {
  title: string;
  imageUrl: string;
  to: string;
};

// Bento Category Type
export interface BentoCategory {
  title: string;
  url: string;
  imageUrl: string;
  spanClass: string;
  badge?: string;
  subtitle: string;
}

// Search Dropdown & ProductItem Types
export interface SearchProductItem {
    _id: string;
    title: string;
    price: number;
    category?: string;
    imageUrls?: string[];
    thumbnail?: string;
}

export interface SearchDropdownProps {
    query: string;
    debouncedQuery: string;
    onClose?: () => void;
}

// Mobile Search Popup Props Type
export type MobileSearchPopupProps = {
  open: boolean;
  onClose: () => void;
};

// Hero Slide Type
export interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
}

// Cart Component Item Types
export interface CartComponentItem {
    productId: string;
    productName: string;
    productPrice: number | string;
    productImage?: string;
    productQuantity: number;
    selectedVariant?: SelectedProductVariant | string | null;
    uploadedImage?: string;
    customizations?: Record<string, string>;
}

export interface CartComponentItemProps {
    cartItems: CartComponentItem[];
    updateQuantity: (item: CartComponentItem, change: number) => void;
    setQuantity?: (item: CartComponentItem, quantity: number) => void;
}

// Add To Cart Button Product Type
export interface AddToCartProduct {
    id: string;
    title: string;
    price: string | number | undefined;
    imageUrl: string | undefined;
    quantity?: number;
    selectedVariant?: SelectedProductVariant | string | null;
    uploadedImage?: string;
    customizations?: Record<string, string>;
    inStock?: boolean;
    hasFixedQuantities?: boolean;
    batchQuantities?: number[];
    selectedDimension?: ProductDimension | null;
}

// Auth Wrapper Props Types
export interface RequireAuthProps {
  children: React.ReactNode;
}

export interface RequireAdminProps {
  children: React.ReactNode;
}

// Admin Form Product / Payloads
export interface ProductFormInputs {
  id: string;
  title: string;
  imageUrl?: string | "";
  imageUrls?: string[];
  description: string;
  about?: string;
  note?: string;
  productInfo?: ProductInfo;
  quantity?: number;
  inStock: boolean;
  price: number;
  category?: string;
  subCategory?: string;
  hasVariants?: boolean;
  variantTitle?: string;
  variantImages?: string;
  isCustomizable?: boolean;
  customizations?: string[];
  hasFixedQuantities?: boolean;
  batchQuantities?: number[];
  hasDimensions?: boolean;
  dimensions?: ProductDimension[];
}

export interface ProductAddFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (
    productData: FormData | ProductFormInputs,
    isEdit: boolean,
    onProgress?: (progress: number) => void
  ) => Promise<void>;
  existingIds: string[];
}

export interface ProductEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (
    productData: FormData | ProductFormInputs,
    isEdit: boolean,
    onProgress?: (progress: number) => void
  ) => Promise<void>;
  existingIds: string[];
  productToEdit: ProductFormInputs;
}
