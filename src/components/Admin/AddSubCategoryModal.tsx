import React, { useState, useEffect, useRef, useId } from 'react';
import { X, Plus, Link2, FolderTree, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCategoryStore, slugify } from '../../store/categoryStore';
import type { BaseItem } from '../../types/allTypes';

interface AddSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle?: string;
  onSubCategoryAdded?: (newSubCategory: BaseItem) => void;
}

const AddSubCategoryModal: React.FC<AddSubCategoryModalProps> = ({
  isOpen,
  onClose,
  categoryTitle,
  onSubCategoryAdded,
}) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const addSubCategory = useCategoryStore((state) => state.addSubCategory);

  const slug = title.trim() ? slugify(title) : '';

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setError(null);
      setIsSubmitting(false);
      // Auto focus input
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Sub-category title is required');
      inputRef.current?.focus();
      return;
    }

    if (!categoryTitle) {
      setError('No parent category selected');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addSubCategory(categoryTitle, trimmedTitle);

      if (result.success && result.subCategory) {
        toast.success(result.message || `Sub-category "${trimmedTitle}" added!`);
        if (onSubCategoryAdded) {
          onSubCategoryAdded(result.subCategory);
        }
        onClose();
      } else {
        setError(result.message || 'Failed to add sub-category');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add sub-category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${inputId}-title`}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E41F66]/10 text-[#E41F66]">
              <FolderTree className="size-5" />
            </div>
            <div>
              <h3 id={`${inputId}-title`} className="text-base font-bold text-stone-900">
                Add New Sub-Category
              </h3>
              <p className="text-xs text-stone-500">
                Target: <span className="font-semibold text-stone-700">{categoryTitle || 'None selected'}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Sub-Category Title <span className="text-red-500">*</span>
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Acrylic Welcome Sign"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#E41F66] focus:bg-white transition placeholder:text-stone-400"
            />
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Auto Link Preview */}
          <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-stone-600">
              <Link2 className="size-3.5 text-[#E41F66]" />
              <span>Generated Link (Navbar & Route)</span>
            </div>
            <p className="font-mono text-stone-500 break-all text-[11px]">
              {slug ? `/products/${slug}` : '/products/[auto-generated-slug]'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E41F66] text-white text-sm font-semibold hover:bg-[#c41554] shadow-md shadow-[#E41F66]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  <span>Add Sub-Category</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AddSubCategoryModal);
