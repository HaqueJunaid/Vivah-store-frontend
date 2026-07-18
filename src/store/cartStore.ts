import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCart, syncCart, clearCart as clearCartApi } from "../services/cartService";
import { useAuthStore } from "./authStore";
import type { cartItemInterface, cartStoreInterface, CartItemApi } from "../types/allTypes";


const isSameItem = (a: cartItemInterface, b: cartItemInterface) => {
    if (a.productId !== b.productId) return false;
    const customA = JSON.stringify(a.customizations || {});
    const customB = JSON.stringify(b.customizations || {});
    const variantA = JSON.stringify(a.selectedVariant || null);
    const variantB = JSON.stringify(b.selectedVariant || null);
    return customA === customB && variantA === variantB;
};

const formatItemForApi = (item: cartItemInterface): CartItemApi => ({
    productId: item.productId,
    productName: item.productName,
    productPrice: typeof item.productPrice === 'string' ? parseFloat(item.productPrice) || 0 : item.productPrice,
    productImage: item.productImage || '',
    productQuantity: item.productQuantity,
    selectedVariant: item.selectedVariant || null,
    uploadedImage: item.uploadedImage || '',
    customizations: item.customizations || {},
});

export const useCartStore = create<cartStoreInterface>()(
    persist(
        (set, get) => ({
            cartItems: [],
            isHydrated: false,
            setHydrated: (val) => set({ isHydrated: val }),
            addCartItem: (cartItem) => {
                const normalizedItem: cartItemInterface = {
                    ...cartItem,
                    productPrice: typeof cartItem.productPrice === 'string' ? parseFloat(String(cartItem.productPrice)) || 0 : cartItem.productPrice,
                    productQuantity: cartItem.productQuantity > 0 ? cartItem.productQuantity : 1,
                };
                const currentItems = get().cartItems;
                const existingIndex = currentItems.findIndex(item => isSameItem(item, normalizedItem));
                
                let updatedItems: cartItemInterface[];
                if (existingIndex > -1) {
                    updatedItems = currentItems.map((item, idx) =>
                        idx === existingIndex
                            ? { ...item, productQuantity: item.productQuantity + normalizedItem.productQuantity }
                            : item
                    );
                } else {
                    updatedItems = [...currentItems, normalizedItem];
                }
                set({ cartItems: updatedItems });

                const token = useAuthStore.getState().token;
                if (token) {
                    syncCart(updatedItems.map(formatItemForApi)).catch(err => console.error("Sync cart error:", err));
                }
            },
            removeCartItem: (productId, customizations, selectedVariant) => {
                const targetItem = { productId, customizations, selectedVariant } as cartItemInterface;
                const updatedItems = get().cartItems.filter(item => {
                    if (customizations !== undefined || selectedVariant !== undefined) {
                        return !isSameItem(item, targetItem);
                    }
                    return item.productId !== productId;
                });
                set({ cartItems: updatedItems });

                const token = useAuthStore.getState().token;
                if (token) {
                    syncCart(updatedItems.map(formatItemForApi)).catch(err => console.error("Sync cart error:", err));
                }
            },
            updateCartItemQuantity: (productId, quantity, customizations, selectedVariant) => {
                const targetItem = { productId, customizations, selectedVariant } as cartItemInterface;
                const updatedItems = get().cartItems.map(item => {
                    const matches = (customizations !== undefined || selectedVariant !== undefined) ? isSameItem(item, targetItem) : item.productId === productId;
                    if (matches) {
                        return { ...item, productQuantity: quantity };
                    }
                    return item;
                });
                set({ cartItems: updatedItems });

                const token = useAuthStore.getState().token;
                if (token) {
                    syncCart(updatedItems.map(formatItemForApi)).catch(err => console.error("Sync cart error:", err));
                }
            },
            clearCart: () => {
                set({ cartItems: [] });
                const token = useAuthStore.getState().token;
                if (token) {
                    clearCartApi().catch(err => console.error("Clear cart error:", err));
                }
            },
            getCartTotal: () => {
                const cartItems = get().cartItems;
                return cartItems.reduce((total, item) => {
                    const price = typeof item.productPrice === 'string' ? parseFloat(item.productPrice) || 0 : item.productPrice;
                    return total + (price * item.productQuantity);
                }, 0);
            },
            getCartItemsLength: () => {
                const cartItems = get().cartItems;
                return cartItems.length;
            },
            getCartIsInCart: (productId: string) => {
                const cartItems = get().cartItems;
                return cartItems.some((item) => item.productId === productId);
            },
            syncWithBackend: async () => {
                const token = useAuthStore.getState().token;
                if (!token) return;
                try {
                    const currentItems = get().cartItems;
                    const { data } = await syncCart(currentItems.map(formatItemForApi));
                    if (data.success && Array.isArray(data.items)) {
                        set({ cartItems: data.items });
                    }
                } catch (error) {
                    console.error("Sync with backend failed:", error);
                }
            },
            fetchCartFromBackend: async () => {
                const token = useAuthStore.getState().token;
                if (!token) return;
                try {
                    const { data } = await getCart();
                    if (data.success && Array.isArray(data.items)) {
                        set({ cartItems: data.items });
                    }
                } catch (error) {
                    console.error("Fetch cart failed:", error);
                }
            }
        }),
        {
            name: 'cart-storage',
            onRehydrateStorage: (state) => {
                return (state, error) => {
                    if (!error) {
                        state?.setHydrated(true);
                    }
                };
            }
        }
    )
);