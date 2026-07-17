import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { X } from "lucide-react";
import { navigationDropdown } from "../../constants/navigation";
import toast from 'react-hot-toast';
import type { ProductFormInputs as Product, ProductAddFormProps } from "../../types/allTypes";

const CUSTOMIZATION_OPTIONS = [
  { label: "Custom Image Uploader", value: "customImage" },
  { label: "Couple Name", value: "coupleName" },
  { label: "Custom Description", value: "customDescription" },
  { label: "Custom Tags", value: "customTags" },
];

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Product>();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [customizationSlots, setCustomizationSlots] = useState<string[]>([]);
  const [customizationError, setCustomizationError] = useState<string | null>(null);

  // Variant image states
  const [variantImagePreviews, setVariantImagePreviews] = useState<string[]>([]);
  const [variantObjectUrls, setVariantObjectUrls] = useState<string[]>([]);
  const [selectedVariantFiles, setSelectedVariantFiles] = useState<File[]>([]);

  const validateCustomizationSlots = React.useCallback((slots: string[]) => {
    const filled = slots.filter((s) => s !== "");
    const hasDuplicates = new Set(filled).size !== filled.length;
    if (hasDuplicates) {
      setCustomizationError("Duplicate customization option selected. Please choose a different option.");
    } else {
      setCustomizationError(null);
    }
  }, []);

  const selectedCategory = watch("category");
  const hasVariants = watch("hasVariants");
  const isCustomizable = watch("isCustomizable");
  const selectedCategoryItem = React.useMemo(() => 
    navigationDropdown.find((item) => item.title === selectedCategory),
    [selectedCategory]
  );
  const subCategoryOptions = selectedCategoryItem?.baseItems ?? [];

  const clearImagePreviews = React.useCallback(() => {
    setObjectUrls((prevUrls) => {
      prevUrls.forEach(URL.revokeObjectURL);
      return [];
    });
    setImagePreviews([]);
    setSelectedFiles([]);
  }, []);

  const clearVariantImagePreviews = React.useCallback(() => {
    setVariantObjectUrls((prevUrls) => {
      prevUrls.forEach(URL.revokeObjectURL);
      return [];
    });
    setVariantImagePreviews([]);
    setSelectedVariantFiles([]);
  }, []);

  const handleImageChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));

    setObjectUrls((prev) => [...prev, ...urls]);
    setImagePreviews((prev) => [...prev, ...urls]);
  }, []);

  const handleRemoveImage = React.useCallback((idxToRemove: number) => {
    setImagePreviews((prevPreviews) => {
      const srcToRemove = prevPreviews[idxToRemove];
      if (srcToRemove && srcToRemove.startsWith('blob:')) {
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
  }, []);

  const handleVariantImageChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedVariantFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));

    setVariantObjectUrls((prev) => [...prev, ...urls]);
    setVariantImagePreviews((prev) => [...prev, ...urls]);
  }, []);

  const handleRemoveVariantImage = React.useCallback((idxToRemove: number) => {
    setVariantImagePreviews((prevPreviews) => {
      const srcToRemove = prevPreviews[idxToRemove];
      if (srcToRemove && srcToRemove.startsWith('blob:')) {
        setVariantObjectUrls((prevUrls) => {
          const blobIdx = prevUrls.indexOf(srcToRemove);
          if (blobIdx !== -1) {
            URL.revokeObjectURL(srcToRemove);
            setSelectedVariantFiles((prevFiles) => prevFiles.filter((_, i) => i !== blobIdx));
            return prevUrls.filter((_, i) => i !== blobIdx);
          }
          return prevUrls;
        });
      }
      return prevPreviews.filter((_, i) => i !== idxToRemove);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (isOpen) {
      reset({
        id: "",
        title: "",
        description: "",
        quantity: 0,
        price: 0,
        imageUrl: "",
        category: "Assets",
        subCategory: "",
        hasVariants: false,
        variantTitle: "",
        isCustomizable: false,
      });
      setCustomizationSlots([]);
      setCustomizationError(null);
      setImagePreviews([]);
      setSelectedFiles([]);
      setObjectUrls([]);
      setVariantImagePreviews([]);
      setSelectedVariantFiles([]);
      setVariantObjectUrls([]);
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("category", data.category || "Assets");
    if (data.subCategory) {
      formData.append("subCategory", data.subCategory);
    }
    
    // Variant info
    formData.append("hasVariants", String(data.hasVariants));
    if (data.hasVariants) {
      if (!data.variantTitle) {
        toast.error("Variant title is required.");
        return;
      }
      if (selectedVariantFiles.length === 0) {
        toast.error("Please upload at least one variant image.");
        return;
      }
      formData.append("variantTitle", data.variantTitle);
      selectedVariantFiles.forEach((file) => {
        formData.append("variantImages", file);
      });
    }

    formData.append("isCustomizable", String(data.isCustomizable));
    if (data.isCustomizable) {
      const activeSlots = customizationSlots.filter(s => s !== "");
      const hasDuplicates = new Set(activeSlots).size !== activeSlots.length;
      if (hasDuplicates) {
        setCustomizationError("Duplicate customization option selected. Please choose a different option.");
        return;
      }
      formData.append("customizations", JSON.stringify(activeSlots));
    }

    selectedFiles.forEach((file) => {
      formData.append("ImageUrls", file);
    });

    const existingUrls = imagePreviews.filter(url => !url.startsWith('blob:'));
    existingUrls.forEach(url => {
      formData.append("existingImageUrls", url);
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);
      await onAddProduct(formData, false, (progress) => {
        setUploadProgress(progress);
      });
      clearImagePreviews();
      clearVariantImagePreviews();
      reset();
      onClose();
    } catch (err: any) {
      // Errors will be caught and alerted in parent Products component
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs" 
        onClick={() => {
          if (!isUploading) {
            onClose();
            reset();
          }
        }} 
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 overflow-y-auto max-h-[90vh] z-10">
        <div className="flex justify-between items-center pb-3 border-b border-stone-100">
          <h2 className="text-xl font-semibold text-stone-900">
            Add New Product
          </h2>
          <button 
            type="button" 
            disabled={isUploading}
            onClick={() => {
              onClose();
              reset();
            }} 
            className="text-stone-400 hover:text-stone-900 hover:bg-stone-100 p-1.5 rounded-full transition cursor-pointer disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Category</label>
            <select
              disabled={isUploading}
              {...register("category", { required: "Category is required" })}
              defaultValue="Assets"
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
            >
              <option value="Assets">Assets</option>
              <option value="Boards & Signage">Boards & Signage</option>
              <option value="Room Stationery">Room Stationery</option>
              <option value="Utility Stationery">Utility Stationery</option>
              <option value="Fun & Entertainment">Fun & Entertainment</option>
              <option value="Thermatic Elements">Thermatic Elements</option>
              <option value="Favour & Gifts">Favour & Gifts</option>
              <option value="Invites & Planner">Invites & Planner</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {subCategoryOptions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Sub Category</label>
              <select
                disabled={isUploading}
                {...register("subCategory", {
                  validate: (value) =>
                    subCategoryOptions.length === 0 || value
                      ? true
                      : "Sub Category is required",
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
              >
                <option value="">Select sub category</option>
                {subCategoryOptions.map((item) => (
                  <option key={item.url} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="text-red-500 text-xs mt-1">{errors.subCategory.message}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasVariants"
              disabled={isUploading}
              {...register("hasVariants")}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 disabled:opacity-60"
            />
            <label htmlFor="hasVariants" className="text-sm text-stone-700">
              This product has variants
            </label>
          </div>

          {hasVariants && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Variant Title</label>
                <input
                  type="text"
                  disabled={isUploading}
                  {...register("variantTitle", {
                    required: hasVariants ? "Variant title is required" : false,
                  })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
                  placeholder="e.g. Red, Large"
                />
                {errors.variantTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.variantTitle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Variant Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isUploading}
                  onChange={handleVariantImageChange}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none file:text-stone-700 file:bg-white file:border file:border-stone-200 file:rounded-md file:px-3 file:py-2 disabled:opacity-60"
                />
                {variantImagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {variantImagePreviews.map((src, idx) => (
                      <div key={`${src}-${idx}`} className="group relative h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                        <img src={src} alt={`Variant Preview ${idx + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => handleRemoveVariantImage(idx)}
                          className="absolute top-1 right-1 bg-stone-900/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer hover:bg-stone-950"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isCustomizable"
              disabled={isUploading}
              {...register("isCustomizable")}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 disabled:opacity-60"
            />
            <label htmlFor="isCustomizable" className="text-sm text-stone-700 font-medium">
              Allow product customization
            </label>
          </div>

          {isCustomizable && (
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Customization Fields
                </label>
                {customizationSlots.length < CUSTOMIZATION_OPTIONS.length && (
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => {
                      const unused = CUSTOMIZATION_OPTIONS.find(opt => !customizationSlots.includes(opt.value))?.value || "";
                      const nextSlots = [...customizationSlots, unused];
                      setCustomizationSlots(nextSlots);
                      validateCustomizationSlots(nextSlots);
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    + Add Field
                  </button>
                )}
              </div>

              {customizationError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {customizationError}
                </div>
              )}

              {customizationSlots.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No customization fields added yet. Click "+ Add Field" above.</p>
              ) : (
                <div className="space-y-2">
                  {customizationSlots.map((slotValue, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        disabled={isUploading}
                        value={slotValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          const nextSlots = [...customizationSlots];
                          nextSlots[idx] = val;
                          setCustomizationSlots(nextSlots);
                          validateCustomizationSlots(nextSlots);
                        }}
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-stone-900 transition-all"
                      >
                        <option value="">Select customization option</option>
                        {CUSTOMIZATION_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => {
                          const nextSlots = customizationSlots.filter((_, i) => i !== idx);
                          setCustomizationSlots(nextSlots);
                          validateCustomizationSlots(nextSlots);
                        }}
                        className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg transition cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Product Name</label>
            <input
              type="text"
              disabled={isUploading}
              {...register("title", { required: "Product Name is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
              placeholder="e.g. Mechanical Keyboard"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Price ($)</label>
              <input
                type="number"
                step="0.01"
                disabled={isUploading}
                {...register("price", { 
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0.5, message: "Price must be at least 0.5" }
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
                placeholder="e.g. 99"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Quantity</label>
              <input
                type="number"
                disabled={isUploading}
                {...register("quantity", { 
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Quantity must be positive or 0" }
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all disabled:opacity-60"
                placeholder="e.g. 15"
              />
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={handleImageChange}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none file:text-stone-700 file:bg-white file:border file:border-stone-200 file:rounded-md file:px-3 file:py-2 disabled:opacity-60"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {imagePreviews.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="group relative h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img src={src} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-stone-900/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer hover:bg-stone-950"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Description</label>
            <textarea
              rows={3}
              disabled={isUploading}
              {...register("description", { required: "Description is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all resize-none disabled:opacity-60"
              placeholder="Describe your product here..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="pt-4 border-t border-stone-100">
            {isUploading ? (
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Uploading Images...</span>
                  <span className="text-sm font-bold text-stone-900">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-stone-950 h-full rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-sm font-medium text-white transition cursor-pointer"
                >
                  Add Product
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ProductAddForm);
