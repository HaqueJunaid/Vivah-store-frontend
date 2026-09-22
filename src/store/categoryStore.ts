import { create } from 'zustand';
import { navigationDropdown as defaultNavigationDropdown } from '../constants/navigation';
import { fetchCategoriesApi, addSubCategoryApi } from '../services/categoryService';
import type { DropdownItem, BaseItem } from '../types/allTypes';

export const slugify = (text: string): string => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

interface CategoryState {
  categories: DropdownItem[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addSubCategory: (
    categoryTitleOrUrl: string,
    subCategoryTitle: string
  ) => Promise<{
    success: boolean;
    subCategory?: BaseItem;
    message?: string;
  }>;
  getCategory: (categoryTitleOrUrl: string) => DropdownItem | undefined;
  getSubCategories: (categoryTitleOrUrl: string) => BaseItem[];
  resetCategories: () => void;
}

export const useCategoryStore = create<CategoryState>()((set, get) => ({
  categories: defaultNavigationDropdown,
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const apiCategories = await fetchCategoriesApi();
      if (apiCategories && apiCategories.length > 0) {
        set({ categories: apiCategories, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err: any) {
      console.error('Failed to fetch categories from backend database:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to fetch categories',
        isLoading: false,
      });
    }
  },

  addSubCategory: async (categoryTitleOrUrl: string, subCategoryTitle: string) => {
    const trimmedTitle = subCategoryTitle.trim();
    if (!trimmedTitle) {
      return { success: false, message: 'Sub-category title cannot be empty.' };
    }

    const normalizedTarget = categoryTitleOrUrl.trim().toLowerCase();
    const categories = get().categories;

    const targetCategoryIndex = categories.findIndex(
      (cat) =>
        cat.title.toLowerCase() === normalizedTarget ||
        cat.url.toLowerCase() === normalizedTarget
    );

    if (targetCategoryIndex === -1) {
      return { success: false, message: `Category "${categoryTitleOrUrl}" not found.` };
    }

    const targetCategory = categories[targetCategoryIndex];
    const existingBaseItems = targetCategory.baseItems || [];

    const slug = slugify(trimmedTitle);
    if (!slug) {
      return { success: false, message: 'Invalid sub-category title format.' };
    }

    // Client-side quick duplicate check
    const isDuplicate = existingBaseItems.some(
      (item) =>
        item.title.toLowerCase() === trimmedTitle.toLowerCase() ||
        item.url.toLowerCase() === slug.toLowerCase()
    );

    if (isDuplicate) {
      return {
        success: false,
        message: `Sub-category "${trimmedTitle}" already exists in ${targetCategory.title}.`,
      };
    }

    try {
      const response = await addSubCategoryApi(categoryTitleOrUrl, trimmedTitle);

      if (response.success && response.subCategory) {
        const newSubCategory = response.subCategory;

        // Update Zustand store
        const updatedCategories = get().categories.map((cat, idx) => {
          if (idx !== targetCategoryIndex) return cat;
          return {
            ...cat,
            baseItems: [...(cat.baseItems || []), newSubCategory],
          };
        });

        // Keep in-memory default array updated as well
        const memoryCat = defaultNavigationDropdown.find(
          (c) =>
            c.title.toLowerCase() === normalizedTarget ||
            c.url.toLowerCase() === normalizedTarget
        );
        if (memoryCat) {
          if (!memoryCat.baseItems) memoryCat.baseItems = [];
          if (!memoryCat.baseItems.some((i) => i.url === slug)) {
            memoryCat.baseItems.push(newSubCategory);
          }
        }

        set({ categories: updatedCategories });

        return {
          success: true,
          subCategory: newSubCategory,
          message: response.message || `Sub-category "${trimmedTitle}" added successfully.`,
        };
      }

      return {
        success: false,
        message: response.message || 'Failed to add sub-category.',
      };
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to save sub-category to database.';
      return {
        success: false,
        message: errMsg,
      };
    }
  },

  getCategory: (categoryTitleOrUrl: string) => {
    const normalized = categoryTitleOrUrl.trim().toLowerCase();
    return get().categories.find(
      (cat) =>
        cat.title.toLowerCase() === normalized ||
        cat.url.toLowerCase() === normalized
    );
  },

  getSubCategories: (categoryTitleOrUrl: string) => {
    const cat = get().getCategory(categoryTitleOrUrl);
    return cat?.baseItems || [];
  },

  resetCategories: () => {
    set({ categories: defaultNavigationDropdown });
  },
}));
