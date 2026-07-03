import api from './api';

import type { AxiosProgressEvent } from 'axios';

export const getProducts = () => api.get('/products');
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

