import { create } from 'zustand';
import { getProducts, getProductsByCategory, createProduct, deleteProduct as apiDeleteProduct, updateProduct as apiUpdateProduct } from '../services/productService';
import type { Product, ProductStore } from '../types/allTypes';

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  loading: false,
  error: undefined,
  fetchProducts: async () => {
    set({ loading: true, error: undefined });

    try {
      const { data } = await getProducts();
      set({ products: data.products || [], loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load products.';
      set({ error: message, loading: false });
    }
  },
  fetchProductsByCategory: async (category: string) => {
    set({ loading: true, error: undefined });

    try {
      const { data } = await getProductsByCategory(category);
      set({ products: data.products || [], loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load category products.';
      set({ error: message, loading: false });
    }
  },
  addProduct: async (productData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await createProduct(productData, onUploadProgress);
      set((state) => ({
        products: [data.product, ...state.products],
        loading: false,
      }));
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to add product.';
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
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to delete product.';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },
  updateProduct: async (id: string, productData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    set({ loading: true, error: undefined });
    try {
      const { data } = await apiUpdateProduct(id, productData, onUploadProgress);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data.product : p)),
        loading: false,
      }));
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to update product.';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

}));