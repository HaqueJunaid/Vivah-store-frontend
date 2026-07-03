import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Edit3, PackageSearch, Plus, Search, Trash2 } from "lucide-react";
import ProductAddForm from "../../components/Admin/ProductAddForm";
import ProductEditForm from "../../components/Admin/ProductEditForm";
import { ProductCardSkeleton } from "../../components/common/Skeletons";
import { useProductStore } from "../../store/productStore";
import type { ProductListItemProps } from "../../types/allTypes";

const getProductId = (product: any) => product?._id || product?.id || "";
const getProductImage = (product: any) => product?.imageUrls?.[0] || product?.imageUrl || "https://picsum.photos/600/500?random=1";

const ProductListItem: React.FC<ProductListItemProps> = React.memo(({ product, onEdit, onDelete }) => {
  const id = getProductId(product);
  const image = getProductImage(product);

  return (
    <li className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
      <img className="size-28 md:size-20 object-cover rounded-lg sm:mx-0" src={image} alt={product.title} />
      <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-lg font-bold text-stone-900">{product.title}</span>
            {product.category && (
              <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}
            <span className={`text-xs w-fit font-semibold px-3 py-1 rounded-full ${product.quantity > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
            </span>
          </div>
          <p className="text-stone-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="text-stone-500 text-xs">Product ID: {id}</div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between md:justify-start gap-3 w-full md:w-fit">
          <span className="text-xl font-bold text-stone-900">${product.price?.toLocaleString()}</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(product)}
              className="flex items-center gap-2 border border-green-500 bg-green-50 text-green-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-green-100 cursor-pointer"
            >
              <Edit3 size={18} />
              Edit
            </button>

            <button 
              onClick={() => onDelete(id, product.title)}
              className="flex items-center gap-2 border border-red-500 bg-red-50 text-red-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-red-100 cursor-pointer"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
});

ProductListItem.displayName = "ProductListItem";

const Products = () => {
  const { products, loading, fetchProducts, addProduct, deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    document.title = "Admin | All Products";
    fetchProducts();
  }, [fetchProducts]);

  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockStatus, setStockStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const categories = useMemo(() => {
    const cats = products.map((p: any) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product: any) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getProductId(product).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesStock =
        stockStatus === "All" ||
        (stockStatus === "In Stock" && product.quantity > 0) ||
        (stockStatus === "Out of Stock" && (!product.quantity || product.quantity <= 0));

      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "Name: A-Z") {
      result = [...result].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return result;
  }, [products, searchQuery, selectedCategory, stockStatus, sortBy]);

  const handleOpenAdd = useCallback(() => {
    setProductToEdit(null);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setProductToEdit(null);
  }, []);

  const handleEditClick = useCallback((product: any) => {
    setProductToEdit(product);
    setIsOpen(true);
  }, []);

  const handleDeleteClick = useCallback(async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        console.error(err);
        alert(err.message || "Failed to delete product");
      }
    }
  }, [deleteProduct]);

  const handleSaveProduct = useCallback(async (
    productData: FormData | any,
    isEdit: boolean,
    onProgress?: (progress: number) => void
  ) => {
    if (isEdit) {
      try {
        const id = getProductId(productToEdit);
        if (!id) {
          throw new Error("No product ID found for editing.");
        }
        await updateProduct(id, productData as FormData, (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        });
      } catch (err: any) {
        console.error(err);
        alert(err.message || "Failed to update product");
        throw err;
      }
    } else {
      try {
        await addProduct(productData as FormData, (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        });
      } catch (err: any) {
        console.error(err);
        alert(err.message || "Failed to create product");
        throw err;
      }
    }
    setIsOpen(false);
    setProductToEdit(null);
  }, [productToEdit, updateProduct, addProduct]);

  const existingIds = useMemo(() => {
    return products.map((p: any) => getProductId(p));
  }, [products]);

  const totalQuantity = useMemo(() => {
    return products.reduce((total: number, product: any) => total + (product.quantity || 0), 0);
  }, [products]);

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
        <div className="flex items-center justify-start gap-2 text-stone-900 mb-2 md:mb-0">
          <PackageSearch size={28} />
          <h1 className="text-2xl font-medium">All Products</h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 rounded-md hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <Plus size={25} /> Add Product
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search products by title, desc, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-stone-200 bg-stone-100 px-4 py-2 pl-10 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition"
          />
          <span className="absolute left-3.5 top-2.5 text-stone-400">
            <Search size={18} />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition cursor-pointer"
          >
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition cursor-pointer"
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Sort By Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition cursor-pointer"
          >
            <option value="Default">Sort: Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Name: A-Z">Name: A-Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border border-stone-200 bg-white rounded-2xl flex gap-4 animate-pulse">
              <div className="w-24 h-24 bg-stone-200 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-1/3 h-5 bg-stone-200 rounded" />
                <div className="w-2/3 h-4 bg-stone-200 rounded" />
                <div className="w-1/4 h-4 bg-stone-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredProducts.map((product: any) => (
            <ProductListItem
              key={getProductId(product)}
              product={product}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}

      <div className="mt-8 shadow-sm rounded-3xl border-2 border-stone-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 text-center md:text-left">Product Summary</h3>
          <p className="text-sm text-stone-500 text-center md:text-left">Total volume of all listed products</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm uppercase tracking-widest text-stone-500">Total Products</p>
          <p className="text-3xl font-bold text-indigo-600">
            {totalQuantity}
          </p>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isOpen && (
        productToEdit ? (
          <ProductEditForm
            isOpen={isOpen}
            onClose={handleClose}
            onAddProduct={handleSaveProduct}
            existingIds={existingIds}
            productToEdit={productToEdit}
          />
        ) : (
          <ProductAddForm
            isOpen={isOpen}
            onClose={handleClose}
            onAddProduct={handleSaveProduct}
            existingIds={existingIds}
          />
        )
      )}
    </div>
  );
};

export default Products;