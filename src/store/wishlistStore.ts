import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItemInterface, WishlistStoreInterface } from "../types/allTypes";


export const useWishlistStore = create<WishlistStoreInterface>()(
    persist(
        (set, get) => ({
            wishlistItems: [],
            addWishlistItem: (wishlistItem) => {
                const normalized: any = {
                    ...wishlistItem,
                    productId: String(wishlistItem.productId),
                    productPrice: typeof wishlistItem.productPrice === 'string' ? parseFloat(String(wishlistItem.productPrice).replace(/[^0-9.-]/g, '')) || 0 : wishlistItem.productPrice,
                }
                const exists = get().wishlistItems.some(item => item.productId === normalized.productId);
                if (!exists) {
                    set((state) => ({ wishlistItems: [...state.wishlistItems, normalized] }));
                }
            },
            removeWishlistItem: (productId) => (
                set((state) => ({ wishlistItems: state.wishlistItems.filter((item) => item.productId !== productId) }))
            ),
            clearWishlist: () => set({ wishlistItems: [] }),
            getWishlistItemsLength: () => {
                const wishlistItems = get().wishlistItems;
                return wishlistItems.length;
            },
            isInWishlist: (productId) => {
                const wishlistItems = get().wishlistItems;
                return wishlistItems.some((item) => item.productId === productId);
            },
        }),
        {
            name: 'wishlist-storage',
        }
    )
)
