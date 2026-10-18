import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Edit3,
  PackageSearch,
  Plus,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Eye,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useProductStore } from "../../store/productStore";
import type { Product, ProductListItemProps } from "../../types/allTypes";
import { getErrorMessage } from "../../utils/errorMessage";
import ProductPreviewModal from "../../components/products/ProductPreviewModal";

const getProductId = (product: Product) => product._id || product.id || "";
const getProductImage = (product: Product) =>
  product.imageUrls?.[0] || product.imageUrl || product.thumbnail || "https://picsum.photos/600/500?random=1";
const getProductPhotosCount = (product: Product) =>
  product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls.length : product.imageUrl ? 1 : 0;
const getProductStockStatus = (product: Product) =>
  product.inStock !== false && (product.inStock !== undefined || (product.quantity ?? 0) > 0);

// --- Lightweight, High-Performance Grid Card ---
const ProductGridCard: React.FC<{
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string, title: string) => void;
  onPreview: (id: string) => void;
  onCopyId: (id: string, e: React.MouseEvent) => void;
  copiedId: string | null;
}> = React.memo(({ product, onEdit, onDelete, onPreview, onCopyId, copiedId }) => {
  const id = getProductId(product);
  const image = getProductImage(product);
  const displayDescription = product.productInfo?.description || product.description || "";
  const isProductInStock = getProductStockStatus(product);
  const photosCount = getProductPhotosCount(product);
  const isCopied = copiedId === id;

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-stone-400/80 shadow-xs overflow-hidden transition-colors duration-150">
      {/* Product Image Section */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
          {product.category ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white text-stone-800 shadow-xs border border-stone-200">
              {product.category}
            </span>
          ) : (
            <span />
          )}

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1.5 ${
              isProductInStock
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            <span className="size-1.5 rounded-full bg-white shrink-0" />
            {isProductInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Bottom Badges */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {photosCount > 1 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-stone-900/90 text-white">
              {photosCount} photos
            </span>
          )}
          {product.hasVariants && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-stone-900/90 text-white">
              Variants
            </span>
          )}
          {product.isCustomizable && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#E41F66] text-white">
              Custom
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-bold text-stone-900 text-sm truncate mb-1">
            {product.title}
          </h3>

          <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
            {displayDescription || "No product description available."}
          </p>
        </div>

        <div>
          {/* ID & Stock Info */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2.5">
            <button
              onClick={(e) => onCopyId(id, e)}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-[10px] cursor-pointer"
              title="Copy Product ID"
            >
              {isCopied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
              <span>ID: {id ? `${id.slice(0, 6)}...${id.slice(-4)}` : "—"}</span>
              {isCopied && <span className="text-emerald-600 font-sans font-bold">Copied</span>}
            </button>
            {product.quantity !== undefined && (
              <span className="text-stone-500 font-medium">Qty: {product.quantity}</span>
            )}
          </div>

          {/* Price & Actions Row */}
          <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-1.5">
            <div>
              <span className="text-base font-bold text-stone-900">
                ₹{product.price?.toLocaleString("en-IN") || "0"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onPreview(id)}
                title="Quick Preview"
                className="flex items-center justify-center size-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              >
                <Eye size={13} />
              </button>

              <a
                href={`/products/${id}/details`}
                target="_blank"
                rel="noopener noreferrer"
                title="View in Store"
                className="flex items-center justify-center size-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              >
                <ExternalLink size={13} />
              </a>

              <button
                onClick={() => onEdit(product)}
                title="Edit Product"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer"
              >
                <Edit3 size={12} />
                Edit
              </button>

              <button
                onClick={() => onDelete(id, product.title)}
                title="Delete Product"
                className="flex items-center justify-center size-7 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ProductGridCard.displayName = "ProductGridCard";

// --- Lightweight List Item Component ---
const ProductListItem: React.FC<ProductListItemProps> = React.memo(
  ({ product, onEdit, onDelete, onPreview, onCopyId, copiedId }) => {
    const id = getProductId(product);
    const image = getProductImage(product);
    const displayDescription = product.productInfo?.description || product.description || "";
    const isProductInStock = getProductStockStatus(product);
    const photosCount = getProductPhotosCount(product);
    const isCopied = copiedId === id;

    return (
      <li className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs hover:border-stone-400/80 flex flex-col md:flex-row items-start md:items-center gap-3.5 transition-colors duration-150">
        {/* Thumbnail */}
        <div className="relative size-20 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
          {photosCount > 1 && (
            <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-stone-900/90 text-white px-1 py-0.5 rounded">
              {photosCount} 📷
            </span>
          )}
        </div>

        {/* Middle Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-stone-900 truncate">
              {product.title}
            </h3>

            {product.category && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                {product.category}
              </span>
            )}

            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1.5 ${
                isProductInStock
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              <span className={`size-1.5 rounded-full shrink-0 ${isProductInStock ? "bg-emerald-500" : "bg-rose-500"}`} />
              {isProductInStock ? "In Stock" : "Out of Stock"}
            </span>

            {product.isCustomizable && (
              <span className="text-[10px] font-medium bg-rose-50 text-[#E41F66] px-1.5 py-0.5 rounded border border-rose-100">
                Customizable
              </span>
            )}
            {product.hasVariants && (
              <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                Variants
              </span>
            )}
          </div>

          <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed mb-2">
            {displayDescription || "No detailed product description available."}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
            <button
              onClick={(e) => onCopyId && onCopyId(id, e)}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 font-mono text-[10px] cursor-pointer"
              title="Copy Product ID"
            >
              {isCopied ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
              <span>ID: {id ? `${id.slice(0, 8)}...${id.slice(-4)}` : "—"}</span>
              {isCopied && <span className="text-emerald-600 font-sans font-bold">Copied</span>}
            </button>

            {product.quantity !== undefined && (
              <span className="text-stone-500 text-[11px]">
                Stock: <strong className="text-stone-700">{product.quantity}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Right Price & Actions */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
          <div className="text-left md:text-right">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">Price</span>
            <span className="text-lg font-bold text-stone-900">
              ₹{product.price?.toLocaleString("en-IN") || "0"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {onPreview && (
              <button
                onClick={() => onPreview(id)}
                title="Quick Preview"
                className="flex items-center justify-center size-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              >
                <Eye size={13} />
              </button>
            )}

            <a
              href={`/products/${id}/details`}
              target="_blank"
              rel="noopener noreferrer"
              title="View in Store"
              className="flex items-center justify-center size-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
            >
              <ExternalLink size={13} />
            </a>

            <button
              onClick={() => onEdit(product)}
              className="flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <Edit3 size={12} />
              Edit
            </button>

            <button
              onClick={() => onDelete(id, product.title)}
              title="Delete Product"
              className="flex items-center justify-center size-7 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </li>
    );
  }
);
ProductListItem.displayName = "ProductListItem";

// --- Main Products Page ---
const Products = () => {
  const navigate = useNavigate();
  const { products, total, loading, fetchProducts, deleteProduct } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockStatus, setStockStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  // View mode: Grid vs List (persisted in localStorage)
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    return (localStorage.getItem("admin_products_view_mode") as "grid" | "list") || "grid";
  });

  // Quick preview modal state
  const [previewProductId, setPreviewProductId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    document.title = "Admin | All Products";
  }, []);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("admin_products_view_mode", mode);
  };

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load products based on query states
  useEffect(() => {
    fetchProducts(page, limit, false, debouncedSearch, selectedCategory, stockStatus, sortBy);
  }, [fetchProducts, page, debouncedSearch, selectedCategory, stockStatus, sortBy]);

  const categories = useMemo(
    () => [
      "All",
      "assets",
      "boards & signage",
      "room stationery",
      "utility stationery",
      "fun & entertainment",
      "thermatic elements",
      "favour & gifts",
      "invites & planner",
    ],
    []
  );

  const handleEditClick = useCallback(
    (product: Product) => {
      const id = getProductId(product);
      if (id) {
        navigate(`/admin/products/edit/${id}`);
      }
    },
    [navigate]
  );

  const handleDeleteClick = useCallback(
    async (id: string, title: string) => {
      if (confirm(`Are you sure you want to delete "${title}"?`)) {
        try {
          await deleteProduct(id);
          toast.success("Product deleted successfully!");
          fetchProducts(page, limit, false, debouncedSearch, selectedCategory, stockStatus, sortBy);
        } catch (err: unknown) {
          console.error(err);
          toast.error(getErrorMessage(err, "Failed to delete product"));
        }
      }
    },
    [deleteProduct, page, debouncedSearch, selectedCategory, stockStatus, sortBy, fetchProducts]
  );

  const handleCopyId = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Product ID copied!", { duration: 1500 });
    setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 2000);
  }, []);

  const totalPages = Math.ceil(total / limit) || 1;

  // Static KPI counts
  const inStockCount = useMemo(() => {
    return products.filter((p) => getProductStockStatus(p)).length;
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => !getProductStockStatus(p)).length;
  }, [products]);

  return (
    <div className="p-4 sm:p-6 w-full min-h-screen bg-stone-50">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <PackageSearch size={24} className="text-[#E41F66]" />
            All Products
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Manage and organize wedding stationery, signage, and gift collections.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 hover:bg-[#E41F66] text-white rounded-xl transition-colors font-semibold text-xs sm:text-sm cursor-pointer shadow-xs w-full sm:w-auto"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Lightweight KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Items</p>
              <p className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                {total.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-rose-50 text-[#E41F66] shrink-0">
              <PackageSearch size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">In Stock</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-0.5">
                {inStockCount}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Out of Stock</p>
              <p className="text-xl sm:text-2xl font-bold text-stone-800 mt-0.5">
                {outOfStockCount}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
              <AlertCircle size={18} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Collections</p>
              <p className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                {categories.length - 1}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
              <Sparkles size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs mb-5 space-y-2.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search products by title, desc, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 pl-9 pr-8 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#E41F66] focus:bg-white"
            />
            <span className="absolute left-3 top-2.5 text-stone-400 pointer-events-none">
              <Search size={15} />
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                title="Clear"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filters & View Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#E41F66] cursor-pointer"
            >
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Collections" : cat.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={stockStatus}
              onChange={(e) => {
                setStockStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#E41F66] cursor-pointer"
            >
              <option value="All">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#E41F66] cursor-pointer"
            >
              <option value="Default">Sort: Default</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Name: A-Z">Name: A to Z</option>
            </select>

            {/* View Switcher */}
            <div className="flex items-center rounded-lg bg-stone-100 p-0.5 border border-stone-200">
              <button
                onClick={() => handleViewModeChange("grid")}
                title="Grid View"
                className={`flex items-center justify-center size-7 rounded cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-2xs font-bold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => handleViewModeChange("list")}
                title="List View"
                className={`flex items-center justify-center size-7 rounded cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-stone-900 shadow-2xs font-bold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(debouncedSearch || selectedCategory !== "All" || stockStatus !== "All" || sortBy !== "Default") && (
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-stone-500">
              <span className="font-semibold text-stone-600">Active:</span>
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-[#E41F66] font-medium border border-rose-200">
                  Search: "{debouncedSearch}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-rose-800 cursor-pointer">
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-stone-950 cursor-pointer">
                    ×
                  </button>
                </span>
              )}
              {stockStatus !== "All" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                  {stockStatus}
                  <button onClick={() => setStockStatus("All")} className="hover:text-stone-950 cursor-pointer">
                    ×
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setStockStatus("All");
                setSortBy("Default");
                setPage(1);
              }}
              className="text-[#E41F66] hover:underline font-semibold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Product Content List / Grid */}
      {loading ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 p-3 flex flex-col space-y-2.5"
              >
                <div className="w-full aspect-4/3 bg-stone-100 rounded-xl" />
                <div className="w-1/3 h-3 bg-stone-100 rounded" />
                <div className="w-3/4 h-4 bg-stone-100 rounded" />
                <div className="w-full h-3 bg-stone-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-3.5 border border-stone-200 bg-white rounded-xl flex gap-3.5 items-center"
              >
                <div className="size-20 bg-stone-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/4 h-4 bg-stone-100 rounded" />
                  <div className="w-1/2 h-3 bg-stone-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-6 max-w-md mx-auto">
          <PackageSearch size={28} className="mx-auto text-stone-400 mb-2" />
          <h3 className="text-base font-bold text-stone-900 mb-1">No Products Found</h3>
          <p className="text-stone-500 text-xs mb-4">
            {debouncedSearch
              ? `No products matching "${debouncedSearch}".`
              : "No products match the selected criteria."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setStockStatus("All");
              setSortBy("Default");
              setPage(1);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold cursor-pointer"
          >
            <RefreshCw size={12} />
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductGridCard
                  key={getProductId(product)}
                  product={product}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onPreview={(id) => setPreviewProductId(id)}
                  onCopyId={handleCopyId}
                  copiedId={copiedId}
                />
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {products.map((product) => (
                <ProductListItem
                  key={getProductId(product)}
                  product={product}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onPreview={(id) => setPreviewProductId(id)}
                  onCopyId={handleCopyId}
                  copiedId={copiedId}
                />
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 bg-white px-4 py-3 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500">
                Showing <span className="font-bold text-stone-800">{(page - 1) * limit + 1}</span> to{" "}
                <span className="font-bold text-stone-800">{Math.min(page * limit, total)}</span> of{" "}
                <span className="font-bold text-stone-800">{total}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
                >
                  <ChevronLeft size={14} /> Prev
                </button>

                <span className="px-2.5 py-1 text-xs font-bold text-stone-800 bg-stone-100 rounded">
                  {page} / {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Quick View Lightbox Modal */}
      {previewProductId && (
        <ProductPreviewModal
          productId={previewProductId}
          isOpen={Boolean(previewProductId)}
          onClose={() => setPreviewProductId(null)}
        />
      )}
    </div>
  );
};

export default Products;