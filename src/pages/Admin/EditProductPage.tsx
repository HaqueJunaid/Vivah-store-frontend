import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  ChevronLeft,
  Upload,
  X,
  AlertCircle,
  Layers,
  Sliders,
  Package,
  CheckCircle2,
  Loader2,
  FileText,
  Plus,
  Trash2,
  Image as ImageIcon,
  Settings2,
  Palette,
  Ruler,
  Boxes,
  ExternalLink
} from "lucide-react";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../store/categoryStore";
import { customizationOptions } from "../../constants/productCustomization";
import AddSubCategoryModal from "../../components/Admin/AddSubCategoryModal";
import { useProductStore } from "../../store/productStore";
import { getProductById } from "../../services/productService";
import ProductDimensionsModal from "../../components/Admin/ProductDimensionsModal";
import ProductBatchQuantitiesModal from "../../components/Admin/ProductBatchQuantitiesModal";
import { DEFAULT_BATCH_QUANTITIES } from "../../constants/productBatchQuantities";
import { formatDimensionString } from "../../constants/productDimensions";
import type { Product, ProductFormInputs, ProductDimension } from "../../types/allTypes";

interface FormVariantItem {
  id: string;
  title: string;
  imagePreviews: string[];
  selectedFiles: File[];
  objectUrls: string[];
}

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateProduct } = useProductStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      category: "Assets",
      subCategory: "",
      hasVariants: false,
      variantTitle: "",
      isCustomizable: false,
      hasFixedQuantities: false,
      price: 0,
      inStock: true,
      description: "",
      about: "",
      note: "",
    },
  });

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  // Multi-variant state
  const [variantsList, setVariantsList] = useState<FormVariantItem[]>([
    {
      id: "var-" + Date.now(),
      title: "",
      imagePreviews: [],
      selectedFiles: [],
      objectUrls: [],
    },
  ]);

  // Customizations
  const [customizationSlots, setCustomizationSlots] = useState<string[]>([]);
  const [customizationError, setCustomizationError] = useState<string | null>(null);

  // Dimensions / Size variations
  const [dimensions, setDimensions] = useState<ProductDimension[]>([]);
  const [isDimensionsModalOpen, setIsDimensionsModalOpen] = useState(false);

  // Predefined Batch Quantities
  const [batchQuantities, setBatchQuantities] = useState<number[]>(DEFAULT_BATCH_QUANTITIES);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin | Edit Product";
  }, []);

  // Fetch product to edit
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setLoadingProduct(true);
        const { data } = await getProductById(id);
        const prod = data.product as Product & { imageUrl?: string };

        const allCategories = useCategoryStore.getState().categories;
        const matchedCategory = allCategories.find(
          (item) => item.title.toLowerCase() === prod.category?.toLowerCase()
        )?.title || "Assets";

        const categoryItem = allCategories.find(
          (item) => item.title.toLowerCase() === matchedCategory.toLowerCase()
        );
        const matchedSubCategory = categoryItem?.baseItems?.find(
          (sub) => sub.title.toLowerCase() === prod.subCategory?.toLowerCase()
        )?.title || prod.subCategory || "";

        reset({
          id: prod._id,
          title: prod.title,
          category: matchedCategory,
          subCategory: matchedSubCategory,
          price: prod.price,
          inStock: prod.inStock !== undefined ? prod.inStock : ((prod.quantity ?? 0) > 0),
          description: prod.productInfo?.description || prod.description || "",
          about: prod.productInfo?.about || "",
          note: prod.productInfo?.note || "",
          hasVariants: !!prod.hasVariants,
          variantTitle: prod.variantTitle || "",
          isCustomizable: !!prod.isCustomizable,
          hasFixedQuantities: !!prod.hasFixedQuantities,
        });

        setCustomizationSlots(prod.customizations || []);

        if (prod.dimensions && Array.isArray(prod.dimensions)) {
          setDimensions(prod.dimensions);
        } else {
          setDimensions([]);
        }

        if (prod.batchQuantities && Array.isArray(prod.batchQuantities) && prod.batchQuantities.length > 0) {
          setBatchQuantities(prod.batchQuantities);
        } else {
          setBatchQuantities(DEFAULT_BATCH_QUANTITIES);
        }

        if (prod.imageUrls && prod.imageUrls.length > 0) {
          setImagePreviews(prod.imageUrls);
        } else if (prod.imageUrl) {
          setImagePreviews([prod.imageUrl]);
        } else {
          setImagePreviews([]);
        }

        if (prod.hasVariants && prod.variants && Array.isArray(prod.variants) && prod.variants.length > 0) {
          const parsed = prod.variants.map((v, index) => ({
            id: v._id || `var-${index}-${Date.now()}`,
            title: v.title || v.name || `Variant ${index + 1}`,
            imagePreviews: Array.isArray(v.images) ? v.images : (v.image ? [v.image] : []),
            selectedFiles: [],
            objectUrls: [],
          }));
          setVariantsList(parsed);
        } else {
          setVariantsList([
            {
              id: "var-" + Date.now(),
              title: "",
              imagePreviews: [],
              selectedFiles: [],
              objectUrls: [],
            },
          ]);
        }
      } catch (err: unknown) {
        console.error("Failed to load product for editing:", err);
        toast.error("Failed to load product information");
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProductDetails();
  }, [id, reset]);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      variantsList.forEach((v) => {
        v.objectUrls.forEach((url) => URL.revokeObjectURL(url));
      });
    };
  }, [objectUrls, variantsList]);

  // Category & Sub-Category
  const categories = useCategoryStore((state) => state.categories);
  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] = useState(false);

  const watchedTitle = watch("title") || "";
  const selectedCategory = watch("category");
  const hasVariants = watch("hasVariants");
  const isCustomizable = watch("isCustomizable");
  const hasFixedQuantities = watch("hasFixedQuantities");

  const selectedCategoryItem = useMemo(
    () => categories.find((item) => item.title === selectedCategory),
    [categories, selectedCategory]
  );
  const subCategoryOptions = selectedCategoryItem?.baseItems ?? [];

  const handleSubCategoryAdded = useCallback(
    (newSubCategory: { title: string; url: string }) => {
      setValue("subCategory", newSubCategory.title, { shouldValidate: true });
    },
    [setValue]
  );

  const validateCustomizationSlots = useCallback((slots: string[]) => {
    const filled = slots.filter((s) => s !== "");
    const hasDuplicates = new Set(filled).size !== filled.length;
    if (hasDuplicates) {
      setCustomizationError("Duplicate customization option selected. Please choose a different option.");
    } else {
      setCustomizationError(null);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setObjectUrls((prev) => [...prev, ...urls]);
    setImagePreviews((prev) => [...prev, ...urls]);
  };

  const handleRemoveImage = (idxToRemove: number) => {
    setImagePreviews((prevPreviews) => {
      const srcToRemove = prevPreviews[idxToRemove];
      if (srcToRemove && srcToRemove.startsWith("blob:")) {
        setObjectUrls((prevUrls) => {
          const blobIdx = prevUrls.indexOf(srcToRemove);
          if (blobIdx !== -1) {
            URL.revokeObjectURL(srcToRemove);
            setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== blobIdx));
            return prevUrls.filter((_, i) => i !== blobIdx);
          }
          return prevUrls;
        });
      }
      return prevPreviews.filter((_, i) => i !== idxToRemove);
    });
  };

  // --- Dynamic Variant Operations ---
  const handleAddVariant = () => {
    setVariantsList((prev) => [
      ...prev,
      {
        id: "var-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        title: "",
        imagePreviews: [],
        selectedFiles: [],
        objectUrls: [],
      },
    ]);
  };

  const handleRemoveVariant = (vId: string) => {
    setVariantsList((prev) => {
      const target = prev.find((v) => v.id === vId);
      if (target) {
        target.objectUrls.forEach((url) => URL.revokeObjectURL(url));
      }
      const filtered = prev.filter((v) => v.id !== vId);
      return filtered.length > 0 ? filtered : [
        {
          id: "var-" + Date.now(),
          title: "",
          imagePreviews: [],
          selectedFiles: [],
          objectUrls: [],
        }
      ];
    });
  };

  const handleVariantTitleChange = (vId: string, title: string) => {
    setVariantsList((prev) =>
      prev.map((v) => (v.id === vId ? { ...v, title } : v))
    );
  };

  const handleVariantImageChange = (vId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;

    const urls = files.map((file) => URL.createObjectURL(file));

    setVariantsList((prev) =>
      prev.map((v) => {
        if (v.id !== vId) return v;
        return {
          ...v,
          selectedFiles: [...v.selectedFiles, ...files],
          objectUrls: [...v.objectUrls, ...urls],
          imagePreviews: [...v.imagePreviews, ...urls],
        };
      })
    );
  };

  const handleRemoveVariantImage = (vId: string, idxToRemove: number) => {
    setVariantsList((prev) =>
      prev.map((v) => {
        if (v.id !== vId) return v;
        const srcToRemove = v.imagePreviews[idxToRemove];
        let nextObjectUrls = [...v.objectUrls];
        let nextSelectedFiles = [...v.selectedFiles];

        if (srcToRemove && srcToRemove.startsWith("blob:")) {
          const blobIdx = nextObjectUrls.indexOf(srcToRemove);
          if (blobIdx !== -1) {
            URL.revokeObjectURL(srcToRemove);
            nextSelectedFiles = nextSelectedFiles.filter((_, i) => i !== blobIdx);
            nextObjectUrls = nextObjectUrls.filter((_, i) => i !== blobIdx);
          }
        }

        return {
          ...v,
          selectedFiles: nextSelectedFiles,
          objectUrls: nextObjectUrls,
          imagePreviews: v.imagePreviews.filter((_, i) => i !== idxToRemove),
        };
      })
    );
  };


  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    if (!id) return;

    const remainingExisting = imagePreviews.filter((url) => !url.startsWith("blob:"));
    if (remainingExisting.length === 0 && selectedFiles.length === 0) {
      toast.error("Please retain or upload at least one main product image.");
      return;
    }

    if (data.hasVariants) {
      if (variantsList.length === 0) {
        toast.error("Please add at least one variant.");
        return;
      }
      for (let i = 0; i < variantsList.length; i++) {
        const v = variantsList[i];
        if (!v.title.trim()) {
          toast.error(`Please provide a title for Variant #${i + 1}`);
          return;
        }
        if (v.imagePreviews.length === 0) {
          toast.error(`Please upload or retain at least one image for Variant #${i + 1} (${v.title})`);
          return;
        }
      }
    }

    if (data.isCustomizable) {
      const activeSlots = customizationSlots.filter((s) => s !== "");
      const hasDuplicates = new Set(activeSlots).size !== activeSlots.length;
      if (hasDuplicates) {
        setCustomizationError("Duplicate customization option selected. Please choose a different option.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("price", String(data.price));
    formData.append("inStock", String(data.inStock !== false));
    formData.append("quantity", data.inStock !== false ? "1" : "0");
    formData.append("category", data.category || "Assets");
    if (data.subCategory) {
      formData.append("subCategory", data.subCategory);
    }

    // Structured productInfo object
    const productInfoObj = {
      description: data.description?.trim() || "",
      about: data.about?.trim() || "",
      note: data.note?.trim() || "",
    };
    formData.append("productInfo", JSON.stringify(productInfoObj));
    formData.append("description", productInfoObj.description);
    formData.append("about", productInfoObj.about);
    formData.append("note", productInfoObj.note);

    // Variants handling
    formData.append("hasVariants", String(data.hasVariants));
    if (data.hasVariants) {
      const variantsMeta = variantsList.map((v) => ({
        title: v.title.trim(),
        name: v.title.trim(),
        existingImages: v.imagePreviews.filter((url) => !url.startsWith("blob:")),
      }));
      formData.append("variants", JSON.stringify(variantsMeta));

      // Append new files for each variant
      variantsList.forEach((v, index) => {
        v.selectedFiles.forEach((file) => {
          formData.append(`variantImages_${index}`, file);
        });
      });

      // Legacy fallback
      formData.append("variantTitle", variantsList[0]?.title.trim() || "");
      const legacyExisting = variantsList[0]?.imagePreviews.filter((url) => !url.startsWith("blob:")) || [];
      formData.append("variantImages", legacyExisting.join(","));
    }

    // Customizations
    formData.append("isCustomizable", String(data.isCustomizable));
    if (data.isCustomizable) {
      const activeSlots = customizationSlots.filter((s) => s !== "");
      formData.append("customizations", JSON.stringify(activeSlots));
    }

    formData.append("hasFixedQuantities", String(data.hasFixedQuantities || false));
    if (data.hasFixedQuantities) {
      formData.append("batchQuantities", JSON.stringify(batchQuantities));
    }

    // Dimensions
    formData.append("hasDimensions", String(dimensions.length > 0));
    if (dimensions.length > 0) {
      formData.append("dimensions", JSON.stringify(dimensions));
    }

    // Main Images: Retained URLs
    const existingMainUrls = imagePreviews.filter((url) => !url.startsWith("blob:"));
    existingMainUrls.forEach((url) => {
      formData.append("existingImageUrls", url);
    });

    // Main Images: New files
    selectedFiles.forEach((file) => {
      formData.append("ImageUrls", file);
    });

    try {
      setIsSubmitting(true);
      setUploadProgress(0);

      await updateProduct(id, formData, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err: unknown) {
      console.error("Update product failed:", err);
      toast.error(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-3">
        <Loader2 size={36} className="animate-spin text-[#E41F66]" />
        <p className="text-sm font-semibold text-stone-600">Loading product editor studio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/60 pb-20">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/admin/products"
              className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
              title="Back to products"
            >
              <ChevronLeft size={18} />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Product Editor Studio
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  <span className="size-1.5 rounded-full bg-blue-500" />
                  Editing ID: {id?.substring(0, 8)}...
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-stone-900 truncate">
                {watchedTitle.trim() || "Editing Product"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to={`/products/${id}/details`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition cursor-pointer"
            >
              <ExternalLink size={13} /> View Live
            </Link>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              disabled={isSubmitting}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-4.5 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-stone-950 hover:bg-[#E41F66] rounded-xl shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Saving ({uploadProgress}%)...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload Progress Bar */}
        {isSubmitting && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-[#E41F66] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Studio Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Card 1: Core Essentials */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <Package size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Essentials &amp; Catalog Info</h2>
                  <p className="text-xs text-stone-500">Update title, categorization, and pricing structure.</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-stone-400 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200/60 hidden sm:inline-block">
                Required Fields
              </span>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1">
                    Product Name / Title <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {watchedTitle.length}/100
                  </span>
                </div>
                <input
                  type="text"
                  disabled={isSubmitting}
                  maxLength={100}
                  {...register("title", { required: "Product Name is required" })}
                  placeholder="e.g. Custom Premium Acrylic Wedding Invitation Suite"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 px-4 py-3 text-sm text-stone-900 font-medium outline-none focus:border-[#E41F66] focus:bg-white transition-all disabled:opacity-60 placeholder:text-stone-400"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1 font-medium">{errors.title.message}</p>}
              </div>

              {/* Category & SubCategory Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={isSubmitting}
                    {...register("category", { required: "Category is required" })}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 px-4 py-3 text-sm text-stone-900 font-medium outline-none focus:border-[#E41F66] focus:bg-white transition-all cursor-pointer disabled:opacity-60"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SubCategory */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Subcategory
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAddSubCategoryModalOpen(true)}
                      className="text-[11px] font-bold text-[#E41F66] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} /> Add New
                    </button>
                  </div>
                  <select
                    disabled={isSubmitting}
                    {...register("subCategory")}
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 px-4 py-3 text-sm text-stone-900 font-medium outline-none focus:border-[#E41F66] focus:bg-white transition-all cursor-pointer disabled:opacity-60"
                  >
                    <option value="">-- None / General --</option>
                    {subCategoryOptions.map((sub, idx) => (
                      <option key={idx} value={sub.title}>
                        {sub.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & In Stock Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Base Price */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Base Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 font-bold">
                      $
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      disabled={isSubmitting}
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0.01, message: "Price must be greater than 0" },
                      })}
                      placeholder="29.99"
                      className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 pl-8 pr-4 py-3 text-sm text-stone-900 font-mono font-bold outline-none focus:border-[#E41F66] focus:bg-white transition-all disabled:opacity-60"
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 mt-1 font-medium">{errors.price.message}</p>}
                </div>

                {/* In Stock Toggle Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Inventory Status
                  </label>
                  <label className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border border-stone-200 bg-stone-50/40 hover:bg-stone-50 transition cursor-pointer select-none">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        disabled={isSubmitting}
                        {...register("inStock")}
                        className="size-4.5 text-[#E41F66] rounded-md border-stone-300 focus:ring-[#E41F66] accent-[#E41F66] cursor-pointer"
                      />
                      <span className="text-xs font-bold text-stone-800">
                        {watch("inStock") ? "In Stock & Available" : "Out of Stock"}
                      </span>
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${watch("inStock") ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                      {watch("inStock") ? "Active" : "Hidden"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Predefined Batch Quantities (FEATURED) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#E41F66]/10 text-[#E41F66] rounded-2xl">
                  <Boxes size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Predefined Batch Quantities</h2>
                  <p className="text-xs text-stone-500">Allow buyers to select from fixed bundle tiers (e.g. 25, 50, 100 pcs).</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!hasFixedQuantities) {
                    setValue("hasFixedQuantities", true);
                  }
                  setIsBatchModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-[#E41F66] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0"
              >
                <Settings2 size={13} />
                <span>Configure Batches</span>
              </button>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50/40 p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    {...register("hasFixedQuantities")}
                    className="size-5 text-[#E41F66] rounded-md border-stone-300 focus:ring-[#E41F66] accent-[#E41F66] cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold text-stone-900 block">
                      Sell in Fixed Batch Quantities Only
                    </span>
                    <span className="text-xs text-stone-500">
                      When enabled, customers must select from configured quantity packs instead of typing arbitrary units.
                    </span>
                  </div>
                </label>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${hasFixedQuantities ? "bg-[#E41F66]/10 text-[#E41F66]" : "bg-stone-200 text-stone-600"}`}>
                  {hasFixedQuantities ? "Enabled" : "Disabled"}
                </span>
              </div>

              {hasFixedQuantities && (
                <div className="pt-3 border-t border-stone-200/80 space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <Layers size={13} className="text-[#E41F66]" />
                      Active Batch Tiers ({batchQuantities.length} tiers)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsBatchModalOpen(true)}
                      className="text-xs font-bold text-[#E41F66] hover:underline cursor-pointer"
                    >
                      + Add / Edit Tiers
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {batchQuantities.map((qty) => (
                      <span
                        key={qty}
                        className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold font-mono shadow-2xs flex items-center gap-1"
                      >
                        <span>{qty}</span>
                        <span className="text-[10px] font-normal text-stone-400">pcs</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Media Gallery Studio */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Product Media &amp; Gallery</h2>
                  <p className="text-xs text-stone-500">Upload new high resolution photography or reorder existing shots.</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                {imagePreviews.length} {imagePreviews.length === 1 ? "Image" : "Images"}
              </span>
            </div>

            {/* Upload Dropzone */}
            <label className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border-2 border-dashed border-stone-300 hover:border-[#E41F66] bg-stone-50/40 hover:bg-rose-50/20 transition-all duration-200 cursor-pointer text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={isSubmitting}
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="p-3.5 bg-white group-hover:bg-[#E41F66]/10 text-stone-600 group-hover:text-[#E41F66] rounded-2xl shadow-xs border border-stone-200 group-hover:border-[#E41F66]/30 transition-all duration-200 mb-3">
                <Upload size={22} />
              </div>
              <p className="text-sm font-bold text-stone-900">
                Click to add new photos or drag &amp; drop
              </p>
              <p className="text-xs text-stone-400 mt-1">
                High-res PNG, JPG, or WEBP (up to 10MB each)
              </p>
            </label>

            {/* Image Previews Grid */}
            {imagePreviews.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Product Photos ({imagePreviews.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-2xs"
                    >
                      <img
                        src={src}
                        alt={`Upload preview ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-stone-700 hover:text-red-600 hover:bg-white shadow-sm transition opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Product Story & Details */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Product Story &amp; Details</h2>
                  <p className="text-xs text-stone-500">Edit overview description, craftsmanship story, and buyer guidelines.</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Field 1: Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-stone-400">Main overview summary</span>
                </div>
                <textarea
                  rows={4}
                  disabled={isSubmitting}
                  {...register("description", { required: "Product description is required" })}
                  placeholder="Describe the product, its key highlights, finish options, and what makes it special..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 p-4 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition leading-relaxed resize-none disabled:opacity-60"
                />
                {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
              </div>

              {/* Field 2: About & Craftsmanship */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    About &amp; Craftsmanship
                  </label>
                  <span className="text-[11px] text-stone-400">Optional</span>
                </div>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  {...register("about")}
                  placeholder="Tell the artisan story, materials used (e.g. 350 GSM archival cotton cardstock), foil stamping technique..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 p-4 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition leading-relaxed resize-none disabled:opacity-60"
                />
              </div>

              {/* Field 3: Buyer Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Buyer Notes
                  </label>
                  <span className="text-[11px] text-stone-400">Optional</span>
                </div>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  {...register("note")}
                  placeholder="Important information for customers: digital proof turnaround in 24 hours, production time 3-5 days..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/40 p-4 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition leading-relaxed resize-none disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Variants & Finishes (Optional) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <Palette size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Color &amp; Style Variations</h2>
                  <p className="text-xs text-stone-500">Add variations like colors, foils, or material finishes with dedicated photos.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  disabled={isSubmitting}
                  {...register("hasVariants")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E41F66]"></div>
              </label>
            </div>

            {hasVariants && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Configured Variations ({variantsList.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-[#E41F66] text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus size={13} /> Add Variant
                  </button>
                </div>

                <div className="space-y-3">
                  {variantsList.map((variant, vIdx) => (
                    <div
                      key={variant.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/40 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-extrabold text-stone-400">#{vIdx + 1}</span>
                        <input
                          type="text"
                          value={variant.title}
                          onChange={(e) => handleVariantTitleChange(variant.id, e.target.value)}
                          placeholder="Variant title (e.g. Matte Black, Gold Foil, Rose Gold)"
                          className="flex-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-900 outline-none focus:border-[#E41F66]"
                        />
                        {variantsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="Delete variant"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      {/* Variant Images */}
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        <label className="size-16 rounded-xl border-2 border-dashed border-stone-300 hover:border-[#E41F66] bg-white flex flex-col items-center justify-center text-stone-400 hover:text-[#E41F66] transition cursor-pointer shrink-0">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleVariantImageChange(variant.id, e)}
                            className="hidden"
                          />
                          <Plus size={16} />
                          <span className="text-[9px] font-bold mt-0.5">Photo</span>
                        </label>

                        {variant.imagePreviews.map((vImg, iIdx) => (
                          <div
                            key={iIdx}
                            className="relative size-16 rounded-xl overflow-hidden border border-stone-200 bg-white shrink-0 group"
                          >
                            <img src={vImg} alt="Variant preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveVariantImage(variant.id, iIdx)}
                              className="absolute inset-0 bg-stone-950/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 6: Dimensions & Size Presets (Optional) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <Ruler size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Dimensions &amp; Physical Sizes</h2>
                  <p className="text-xs text-stone-500">Edit measurement options (width, height, thickness) for buyer selection.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDimensionsModalOpen(true)}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-[#E41F66] text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0"
              >
                <Plus size={13} />
                <span>{dimensions.length > 0 ? "Manage Sizes" : "Add Dimensions"}</span>
              </button>
            </div>

            {dimensions.length === 0 ? (
              <div className="p-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50/40 text-center">
                <p className="text-xs font-semibold text-stone-500">No dimensions configured yet</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Click &quot;Add Dimensions&quot; to specify 5x7 in, 4x6 in, or custom sizes.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {dimensions.map((dim, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs font-semibold text-stone-800 flex items-center gap-2"
                  >
                    <span>{dim.label || formatDimensionString(dim)}</span>
                    <button
                      type="button"
                      onClick={() => setDimensions((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-stone-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 7: Buyer Customizations (Optional) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-stone-100 text-stone-800 rounded-2xl">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900">Buyer Customization Slots</h2>
                  <p className="text-xs text-stone-500">Enable fields for buyers to input names, dates, or upload artwork.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  disabled={isSubmitting}
                  {...register("isCustomizable")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E41F66]"></div>
              </label>
            </div>

            {isCustomizable && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Enabled Input Fields ({customizationSlots.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCustomizationSlots([...customizationSlots, ""])}
                    className="text-xs font-bold text-[#E41F66] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Field Slot
                  </button>
                </div>

                {customizationError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{customizationError}</span>
                  </div>
                )}

                {customizationSlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <select
                      value={slot}
                      onChange={(e) => {
                        const updated = [...customizationSlots];
                        updated[idx] = e.target.value;
                        setCustomizationSlots(updated);
                        validateCustomizationSlots(updated);
                      }}
                      className="flex-1 rounded-xl border border-stone-200 bg-stone-50/40 px-3.5 py-2.5 text-xs font-semibold text-stone-900 outline-none focus:border-[#E41F66]"
                    >
                      <option value="">-- Choose Input Option --</option>
                      {customizationOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = customizationSlots.filter((_, i) => i !== idx);
                        setCustomizationSlots(updated);
                        validateCustomizationSlots(updated);
                      }}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-stone-950 hover:bg-[#E41F66] rounded-xl shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving ({uploadProgress}%)...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Modals */}
      <AddSubCategoryModal
        isOpen={isAddSubCategoryModalOpen}
        onClose={() => setIsAddSubCategoryModalOpen(false)}
        categoryTitle={selectedCategory}
        onSubCategoryAdded={handleSubCategoryAdded}
      />

      <ProductDimensionsModal
        isOpen={isDimensionsModalOpen}
        onClose={() => setIsDimensionsModalOpen(false)}
        initialDimensions={dimensions}
        onSave={(updated) => setDimensions(updated)}
      />

      <ProductBatchQuantitiesModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        initialQuantities={batchQuantities}
        onSave={(updated) => {
          setBatchQuantities(updated);
          setValue("hasFixedQuantities", true);
        }}
      />
    </div>
  );
};

export default EditProductPage;
