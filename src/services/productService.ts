import api from './api';

import type { AxiosProgressEvent } from 'axios';

export const getProducts = (
  page?: number,
  limit?: number,
  search?: string,
  category?: string,
  stockStatus?: string,
  sortBy?: string
) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (stockStatus) params.append('stockStatus', stockStatus);
  if (sortBy) params.append('sortBy', sortBy);
  const queryString = params.toString();
  return api.get(`/products${queryString ? `?${queryString}` : ''}`);
};
export const getProductsByCategory = (category: string) => api.get(`/products/category/${encodeURIComponent(category)}`);
export const createProduct = (
  productData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => api.post('/products', productData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  onUploadProgress,
});
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const updateProduct = (
  id: string,
  productData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => api.put(`/products/${id}`, productData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  onUploadProgress,
});

export const getSimilarProducts = (id: string) => api.get(`/products/${id}/similar`);

