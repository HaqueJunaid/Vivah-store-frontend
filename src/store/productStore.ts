import { create } from 'zustand';
import { getProducts, getProductsByCategory, createProduct, deleteProduct as apiDeleteProduct, updateProduct as apiUpdateProduct } from '../services/productService';
import type { ProductStore } from '../types/allTypes';
import type { AxiosProgressEvent } from 'axios';
import { getErrorMessage } from '../utils/errorMessage';

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  total: 0,
  loading: false,
  error: undefined,
  fetchProducts: async (
    page?: number,
    limit?: number,
    append?: boolean,
    search?: string,
    category?: string,
    stockStatus?: string,
    sortBy?: string
  ) => {
    set({ loading: true, error: undefined });

    try {
      const { data } = await getProducts(page, limit, search, category, stockStatus, sortBy);
      set((state) => ({
        products: append ? [...state.products, ...(data.products || [])] : (data.products || []),
        total: data.total ?? (data.products || []).length,
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load products.';
      set({ error: message, loading: false });
    }
  },
  fetchProductsByCategory: async (category: string) => {
    set({ loading: true, error: undefined });

    try {
      const { data } = await getProductsByCategory(category);
      set({
        products: data.products || [],
        total: data.products?.length || 0,
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load category products.';
      set({ error: message, loading: false });
    }
  },
  addProduct: async (productData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await createProduct(productData, onUploadProgress);
      set((state) => ({
        products: [data.product, ...state.products],
        loading: false,
      }));
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to add product.');
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },
  deleteProduct: async (id: string) => {
    set({ loading: true, error: undefined });
    try {
      await apiDeleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to delete product.');
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },
  updateProduct: async (id: string, productData: FormData, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await apiUpdateProduct(id, productData, onUploadProgress);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data.product : p)),
        loading: false,
      }));
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to update product.');
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

}));