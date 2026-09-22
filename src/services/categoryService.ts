import api from './api';
import type { DropdownItem, BaseItem } from '../types/allTypes';

export interface CategoryApiResponse {
  success: boolean;
  count: number;
  categories: DropdownItem[];
  message?: string;
}

export interface AddSubCategoryApiResponse {
  success: boolean;
  message?: string;
  subCategory?: BaseItem;
  category?: DropdownItem;
}

export const fetchCategoriesApi = async (): Promise<DropdownItem[]> => {
  const response = await api.get<CategoryApiResponse>('/categories');
  if (response.data?.success && Array.isArray(response.data.categories)) {
    return response.data.categories;
  }
  return [];
};

export const addSubCategoryApi = async (
  categoryTitleOrUrl: string,
  subCategoryTitle: string
): Promise<AddSubCategoryApiResponse> => {
  const response = await api.post<AddSubCategoryApiResponse>('/categories/sub-category', {
    categoryTitleOrUrl,
    subCategoryTitle,
  });
  return response.data;
};

export const createCategoryApi = async (
  title: string,
  url?: string
): Promise<{ success: boolean; message?: string; category?: DropdownItem }> => {
  const response = await api.post('/categories', { title, url });
  return response.data;
};

export const deleteSubCategoryApi = async (
  categoryTitleOrUrl: string,
  subCategoryUrl: string
): Promise<{ success: boolean; message?: string; category?: DropdownItem }> => {
  const response = await api.delete('/categories/sub-category', {
    data: { categoryTitleOrUrl, subCategoryUrl },
  });
  return response.data;
};
