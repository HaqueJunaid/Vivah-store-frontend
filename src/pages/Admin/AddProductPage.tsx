import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { 
  ChevronLeft, 
  Upload, 
  X, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  Sliders, 
  Package, 
  CheckCircle2, 
  Loader2,
  FileText,
  Plus,
  Trash2
} from "lucide-react";
import toast from "react-hot-toast";
import { useCategoryStore } from "../../store/categoryStore";
import AddSubCategoryButton from "../../components/Admin/AddSubCategoryButton";
import AddSubCategoryModal from "../../components/Admin/AddSubCategoryModal";
import { useProductStore } from "../../store/productStore";
import type { ProductFormInputs } from "../../types/allTypes";

const CUSTOMIZATION_OPTIONS = [
  { label: "Custom Image Uploader", value: "customImage" },
  { label: "Couple Name", value: "coupleName" },
  { label: "Custom Description", value: "customDescription" },
  { label: "Custom Tags", value: "customTags" },
];

interface FormVariantItem {
  id: string;
  title: string;
  imagePreviews: string[];
  selectedFiles: File[];
  objectUrls: string[];
}

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  useEffect(() => {
    document.title = "Admin | Add New Product";
  }, []);

  // Category & Sub-Category
  const categories = useCategoryStore((state) => state.categories);
  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] = useState(false);

  const selectedCategory = watch("category");
  const hasVariants = watch("hasVariants");
  const isCustomizable = watch("isCustomizable");

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

  useEffect(() => {
    if (selectedCategory) {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue]);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      variantsList.forEach((v) => {
        v.objectUrls.forEach((url) => URL.revokeObjectURL(url));
      });
    };
  }, [objectUrls, variantsList]);

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
    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one main product image.");
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
        if (v.selectedFiles.length === 0) {
          toast.error(`Please upload at least one image for Variant #${i + 1} (${v.title})`);
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

    // Structured productInfo object and direct fields for backwards compatibility
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
      }));
      formData.append("variants", JSON.stringify(variantsMeta));

      // Append files for each variant using variantImages_INDEX
      variantsList.forEach((v, index) => {
        v.selectedFiles.forEach((file) => {
          formData.append(`variantImages_${index}`, file);
        });
      });

      // Legacy fallback title
      formData.append("variantTitle", variantsList[0]?.title.trim() || "");
    }

    // Customizations
    formData.append("isCustomizable", String(data.isCustomizable));
    if (data.isCustomizable) {
      const activeSlots = customizationSlots.filter((s) => s !== "");
      formData.append("customizations", JSON.stringify(activeSlots));
    }

    formData.append("hasFixedQuantities", String(data.hasFixedQuantities || false));

    // Main Images
    selectedFiles.forEach((file) => {
      formData.append("ImageUrls", file);
    });

    try {
      setIsSubmitting(true);
      setUploadProgress(0);

      await addProduct(formData, (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      toast.success("Product created and published successfully!");
      navigate("/admin/products");
    } catch (err: any) {
      console.error("Create product failed:", err);
      toast.error(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/70 p-3.5 sm:p-6 lg:p-10">
      <div className="max-w-5xl w-full mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="space-y-1.5 min-w-0">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-0.5"
            >
              <ChevronLeft size={16} /> Back to Products
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">Add New Product</h1>
              <span className="text-xs font-semibold bg-[#E41F66]/10 text-[#E41F66] px-2.5 py-0.5 rounded-full border border-[#E41F66]/20 shrink-0">
                Catalog Item
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl wrap-break-word leading-relaxed">
              Create a new product listing with rich specifications, overview, detailed about information, and customer guidance.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition cursor-pointer disabled:opacity-50 text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-[#E41F66] rounded-xl shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-60 text-center whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="p-2 bg-stone-100 rounded-xl text-stone-800 shrink-0">
                <Package size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-stone-900">Basic Information</h2>
                <p className="text-xs text-stone-500 wrap-break-word">Core listing identification, categories, and inventory parameters.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Product Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  {...register("title", { 
                    required: "Product Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" }
                  })}
                  placeholder="e.g. Royal Golden Laser-Cut Wedding Invitation Suite"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-3.5 sm:px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition disabled:opacity-60"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1.5">{errors.title.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  disabled={isSubmitting}
                  {...register("category", { required: "Category is required" })}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition cursor-pointer disabled:opacity-60"
                >
                  {categories.map((cat) => (
                    <option key={cat.url} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1.5">{errors.category.message}</p>}
              </div>

              {/* Sub-Category */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Sub-Category {subCategoryOptions.length > 0 && <span className="text-red-500">*</span>}
                  </label>
                  <AddSubCategoryButton
                    disabled={isSubmitting || !selectedCategory}
                    onClick={() => setIsAddSubCategoryModalOpen(true)}
                  />
                </div>
                <select
                  disabled={isSubmitting || subCategoryOptions.length === 0}
                  {...register("subCategory", {
                    validate: (value) =>
                      subCategoryOptions.length === 0 || value ? true : "Sub Category is required",
                  })}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition cursor-pointer disabled:opacity-60"
                >
                  <option value="">
                    {subCategoryOptions.length === 0 ? "No sub-categories available" : "Select sub-category"}
                  </option>
                  {subCategoryOptions.map((item) => (
                    <option key={item.url} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.subCategory && <p className="text-xs text-red-500 mt-1.5">{errors.subCategory.message}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Price (₹ INR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-stone-400 font-semibold text-sm">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    disabled={isSubmitting}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0.5, message: "Price must be at least ₹0.50" },
                    })}
                    placeholder="e.g. 1499"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 pl-8 pr-4 py-3 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition disabled:opacity-60 font-mono"
                  />
                </div>
                {errors.price && <p className="text-xs text-red-500 mt-1.5">{errors.price.message}</p>}
              </div>

              {/* Stock Status Checkbox */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Availability / Stock Status
                </label>
                <label className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled={isSubmitting}
                      {...register("inStock")}
                      className="size-5 text-[#E41F66] rounded-md border-stone-300 focus:ring-[#E41F66] accent-[#E41F66] cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        In Stock
                      </span>
                      <span className="text-xs text-stone-500">
                        {watch("inStock") ? "Available for ordering" : "Marked as out of stock"}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${watch("inStock") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {watch("inStock") ? "In Stock" : "Out of Stock"}
                  </span>
                </label>
              </div>

              {/* Fixed Quantity Tier Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled={isSubmitting}
                      {...register("hasFixedQuantities")}
                      className="size-5 text-[#E41F66] rounded-md border-stone-300 focus:ring-[#E41F66] accent-[#E41F66] cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        Sell in Predefined Batch Quantities Only
                      </span>
                      <span className="text-xs text-stone-500">
                        When enabled, buyers select from fixed quantities (25, 50, 75, 100... 1000 pcs) instead of standard 1-by-1 increments.
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${watch("hasFixedQuantities") ? "bg-[#E41F66]/10 text-[#E41F66]" : "bg-stone-200 text-stone-600"}`}>
                    {watch("hasFixedQuantities") ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Structured Product Information (productInfo) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E41F66]/10 text-[#E41F66] rounded-xl shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-stone-900">Product Information & Story</h2>
                  <p className="text-xs text-stone-500 wrap-break-word">Provide an overview, craftsmanship story, and vital notes for buyers.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full w-fit">
                Structured Info Schema
              </span>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* Field 1: Description */}
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-stone-400">Main overview summary</span>
                </div>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  {...register("description", { required: "Product description is required" })}
                  placeholder="Description here..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 sm:p-4 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition resize-none disabled:opacity-60 leading-relaxed"
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>

              {/* Field 2: About Product */}
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                    <Sparkles size={14} className="text-[#E41F66]" />
                    About This Product
                  </label>
                  <span className="text-[11px] text-stone-400">Craftsmanship & specs</span>
                </div>
                <textarea
                  rows={4}
                  disabled={isSubmitting}
                  {...register("about")}
                  placeholder="About here..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 sm:p-4 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition resize-none disabled:opacity-60 leading-relaxed"
                />
                <p className="text-[11px] text-stone-400">
                  This detailed info will be displayed in an elegant dedicated section on the product page.
                </p>
              </div>

              {/* Field 3: Important Note */}
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <AlertCircle size={14} className="text-amber-600" />
                    Important Note / Guidelines
                  </label>
                  <span className="text-[11px] text-stone-400">Key customer alerts</span>
                </div>
                <textarea
                  rows={2}
                  disabled={isSubmitting}
                  {...register("note")}
                  placeholder="Important note here..."
                  className="w-full rounded-2xl border border-amber-200/80 bg-amber-50/30 p-3.5 sm:p-4 text-sm text-stone-900 outline-none focus:border-amber-500 focus:bg-white transition resize-none disabled:opacity-60 leading-relaxed"
                />
                <p className="text-[11px] text-stone-400">
                  Renders as a luxury highlighted callout banner to make essential instructions effortlessly visible.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Media & Gallery */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 rounded-xl text-stone-800 shrink-0">
                  <Upload size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-stone-900">Product Gallery</h2>
                  <p className="text-xs text-stone-500 wrap-break-word">Upload high-resolution photography.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full shrink-0">
                {imagePreviews.length} {imagePreviews.length === 1 ? "Image" : "Images"}
              </span>
            </div>

            <div className="space-y-4">
              <label 
                htmlFor="mainImageInput"
                className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-stone-200 border-dashed rounded-2xl sm:rounded-3xl hover:border-[#E41F66] transition-colors cursor-pointer bg-stone-50/40 hover:bg-stone-50/80 group text-center"
              >
                <div className="size-11 sm:size-12 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-[#E41F66] group-hover:scale-110 transition-all mb-2.5">
                  <Upload size={20} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-800">
                  Click or drag images to upload
                </p>
                <p className="text-[11px] text-stone-400 mt-1">PNG, JPG, WEBP up to 10MB per file</p>
                <input
                  id="mainImageInput"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isSubmitting}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3 pt-2">
                  {imagePreviews.map((src, idx) => (
                    <div key={`${src}-${idx}`} className="group relative aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-2xs">
                      <img src={src} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          Primary
                        </span>
                      )}
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 bg-stone-900/80 hover:bg-red-600 text-white rounded-full p-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card 4: Variants Configuration */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 rounded-xl text-stone-800 shrink-0">
                  <Layers size={20} />
                </div>
                <div className="min-w-0 flex flex-col md:flex-row">
                  <h2 className="text-base sm:text-lg font-semibold text-stone-900">Product Variants</h2>
                  <p className="text-xs text-stone-500 wrap-break-word">Enable for multiple designs, colorways, or pack options.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="checkbox"
                  id="hasVariantsToggle"
                  disabled={isSubmitting}
                  {...register("hasVariants")}
                  className="size-5 rounded-md border-stone-300 text-[#E41F66] focus:ring-[#E41F66] cursor-pointer"
                />
                <label htmlFor="hasVariantsToggle" className="text-xs sm:text-sm font-semibold text-stone-800 cursor-pointer whitespace-nowrap">
                  Has Variants
                </label>
              </div>
            </div>

            {hasVariants && (
              <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Product Variants ({variantsList.length})
                  </span>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleAddVariant}
                    className="inline-flex items-center w-fit gap-1.5 px-3 py-1.5 rounded-xl bg-[#E41F66]/10 hover:bg-[#E41F66]/20 text-[#E41F66] text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    <Plus size={14} />
                    Add Variant
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {variantsList.map((v, index) => (
                    <div
                      key={v.id}
                      className="p-4 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4 shadow-2xs relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-stone-200/70 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="size-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm font-bold text-stone-900 truncate">
                            {v.title ? v.title : `Variant #${index + 1}`}
                          </span>
                        </div>
                        {variantsList.length > 1 && (
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => handleRemoveVariant(v.id)}
                            className="text-stone-400 hover:text-red-600 transition p-1 rounded-lg hover:bg-red-50 cursor-pointer flex items-center gap-1 text-xs font-semibold shrink-0"
                            title="Remove this variant"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Variant Title */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                          Variant Title / Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitting}
                          value={v.title}
                          onChange={(e) => handleVariantTitleChange(v.id, e.target.value)}
                          placeholder="e.g. Design 1, Emerald Green, Pack of 50"
                          className="w-full rounded-xl border border-stone-200 bg-white px-3.5 sm:px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#E41F66] transition"
                        />
                      </div>

                      {/* Variant Images Upload */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                            Variant Images <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-stone-400">
                            {v.imagePreviews.length} {v.imagePreviews.length === 1 ? "image" : "images"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={isSubmitting}
                          onChange={(e) => handleVariantImageChange(v.id, e)}
                          className="w-full rounded-xl border border-stone-200 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-stone-700 outline-none file:text-xs file:font-semibold file:bg-stone-100 file:border-0 file:rounded-lg file:px-2.5 file:py-1 file:mr-2.5 hover:file:bg-stone-200 cursor-pointer"
                        />
                        {v.imagePreviews.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                            {v.imagePreviews.map((src, idx) => (
                              <div key={`${src}-${idx}`} className="group relative aspect-square rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                                <img src={src} alt={`Variant Preview ${idx + 1}`} className="h-full w-full object-cover" />
                                <button
                                  type="button"
                                  disabled={isSubmitting}
                                  onClick={() => handleRemoveVariantImage(v.id, idx)}
                                  className="absolute top-1 right-1 bg-stone-900/80 text-white rounded-full p-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition cursor-pointer hover:bg-red-600"
                                  title="Remove image"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleAddVariant}
                  className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-[#E41F66] rounded-2xl text-stone-600 hover:text-[#E41F66] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer bg-stone-50/50 hover:bg-[#E41F66]/5"
                >
                  <Plus size={16} />
                  Add Another Variant
                </button>
              </div>
            )}
          </div>

          {/* Card 5: Customization Configuration */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
            <div className="flex flex-col md-flex-row md:items-center justify-between pb-4 border-b border-stone-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 rounded-xl text-stone-800 shrink-0">
                  <Sliders size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-stone-900">Customization & Personalization</h2>
                  <p className="text-xs text-stone-500 wrap-break-word">Allow customers to input customized text or upload photos.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="checkbox"
                  id="isCustomizableToggle"
                  disabled={isSubmitting}
                  {...register("isCustomizable")}
                  className="size-5 rounded-md border-stone-300 text-[#E41F66] focus:ring-[#E41F66] cursor-pointer"
                />
                <label htmlFor="isCustomizableToggle" className="text-xs sm:text-sm font-semibold text-stone-800 cursor-pointer whitespace-nowrap">
                  Allow Customization
                </label>
              </div>
            </div>

            {isCustomizable && (
              <div className="p-4 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Customization Fields</span>
                  {customizationSlots.length < CUSTOMIZATION_OPTIONS.length && (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        const unused = CUSTOMIZATION_OPTIONS.find((opt) => !customizationSlots.includes(opt.value))?.value || "";
                        const nextSlots = [...customizationSlots, unused];
                        setCustomizationSlots(nextSlots);
                        validateCustomizationSlots(nextSlots);
                      }}
                      className="text-xs font-bold text-[#E41F66] hover:text-[#c41554] cursor-pointer shrink-0"
                    >
                      + Add Field
                    </button>
                  )}
                </div>

                {customizationError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                    {customizationError}
                  </div>
                )}

                {customizationSlots.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">No customization fields added yet. Click "+ Add Field" above.</p>
                ) : (
                  <div className="space-y-2.5">
                    {customizationSlots.map((slotValue, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <select
                          disabled={isSubmitting}
                          value={slotValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            const nextSlots = [...customizationSlots];
                            nextSlots[idx] = val;
                            setCustomizationSlots(nextSlots);
                            validateCustomizationSlots(nextSlots);
                          }}
                          className="w-full rounded-xl border border-stone-200 bg-white px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm text-stone-800 outline-none focus:border-[#E41F66] transition"
                        >
                          <option value="">Select customization field</option>
                          {CUSTOMIZATION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            const nextSlots = customizationSlots.filter((_, i) => i !== idx);
                            setCustomizationSlots(nextSlots);
                            validateCustomizationSlots(nextSlots);
                          }}
                          className="text-stone-400 hover:text-red-500 p-2 rounded-xl transition cursor-pointer hover:bg-red-50 shrink-0"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky/Bottom Actions */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-sm space-y-4">
            {isSubmitting ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Uploading Assets to ImageKit...</span>
                  <span className="text-sm font-bold text-stone-900">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-[#E41F66] to-stone-900 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500 text-center sm:text-left">
                  By publishing, this product will instantly become active and available for customers in the catalog.
                </p>
                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-2xl bg-stone-900 hover:bg-[#E41F66] text-xs sm:text-sm font-semibold text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <CheckCircle2 size={18} />
                    <span>Publish Product</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </form>
      </div>

      <AddSubCategoryModal
        isOpen={isAddSubCategoryModalOpen}
        onClose={() => setIsAddSubCategoryModalOpen(false)}
        categoryTitle={selectedCategory}
        onSubCategoryAdded={handleSubCategoryAdded}
      />
    </div>
  );
};

export default AddProductPage;
