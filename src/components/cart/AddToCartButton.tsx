import React, { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import toast from 'react-hot-toast';
import { ShoppingBag, Trash2 } from "lucide-react";
import type { AddToCartProduct as Product } from "../../types/allTypes";

const AddToCartButton = React.memo(({ product, variant = 'default' }: { product: Product; variant?: 'default' | 'luxury' }) => {
    const quantityInCart = useCartStore((state: any) => {
        const item = state.cartItems.find((item: any) => {
            if (item.productId !== product.id) return false;
            const variantA = JSON.stringify(item.selectedVariant || null);
            const variantB = JSON.stringify(product.selectedVariant || null);
            if (variantA !== variantB) return false;
            const customA = JSON.stringify(item.customizations || {});
            const customB = JSON.stringify(product.customizations || {});
            return customA === customB;
        });
        return item ? item.productQuantity : 0;
    });

    const isInCart = quantityInCart > 0;

    const updateCartItemQuantity = useCartStore((state: any) => state.updateCartItemQuantity);
    const removeCartItem = useCartStore((state: any) => state.removeCartItem);
    const addToCart = useCartStore((state: any) => state.addCartItem);
    
    // Out of stock if explicitly false
    const isOutofStock = product.inStock === false;

    const handleUpdateQty = (newQty: number) => {
        if (newQty <= 0) {
            removeCartItem(product.id, product.customizations, product.selectedVariant);
            toast.success("Product removed from cart");
        } else {
            updateCartItemQuantity(product.id, newQty, product.customizations, product.selectedVariant);
        }
    };

    const handleRemove = () => {
        removeCartItem(product.id, product.customizations, product.selectedVariant);
        toast.success("Product removed from cart");
    };

    const handleAddToCart = () => {
        if (!product.id) {
            toast.error('Cannot add product to cart: invalid product id')
            return
        }
        const cleanedPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/[^0-9.-]/g, '')) || 0
        const qty = product.quantity && product.quantity > 0 ? product.quantity : 1;
        addToCart({ 
            productId: product.id, 
            productName: product.title, 
            productPrice: cleanedPrice, 
            productImage: product.imageUrl, 
            productQuantity: qty,
            selectedVariant: product.selectedVariant,
            uploadedImage: product.uploadedImage,
            customizations: product.customizations,
        });
        toast.success(`Product added to cart`);
    };

    if (isOutofStock) {
        if (variant === 'luxury') {
            return (
                <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase py-3 border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none"
                >
                    Out of stock
                </button>
            );
        }
        return (
            <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 text-xs rounded-md py-3 border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none"
            >
                Out of stock
            </button>
        );
    }

    if (isInCart) {
        if (variant === 'luxury') {
            return (
                <div className="flex items-center gap-1.5 w-full select-none">
                    {/* Quantity Selector */}
                    <div className="flex-grow flex items-center justify-between bg-stone-50 border border-stone-200 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => handleUpdateQty(quantityInCart - 1)}
                            className="flex items-center justify-center hover:bg-white border border-stone-150/50 rounded-full w-6.5 h-6.5 cursor-pointer transition-colors shadow-2xs active:scale-90"
                            aria-label="Decrease quantity"
                        >
                            <span className="text-stone-600 font-bold text-xs leading-none">-</span>
                        </button>
                        <span className="text-stone-850 font-bold text-[10px] sm:text-xs">
                            QTY: {quantityInCart}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleUpdateQty(quantityInCart + 1)}
                            className="flex items-center justify-center hover:bg-white border border-stone-150/50 rounded-full w-6.5 h-6.5 cursor-pointer transition-colors shadow-2xs active:scale-90"
                            aria-label="Increase quantity"
                        >
                            <span className="text-stone-600 font-bold text-xs leading-none">+</span>
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="flex items-center justify-center border border-red-200 bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-700 rounded-lg w-9 h-9 cursor-pointer transition-colors active:scale-95 shrink-0"
                        aria-label="Remove product from cart"
                        title="Remove from cart"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            );
        }

        return (
            <div className="flex flex-col sm:flex-row items-stretch gap-1.5 w-full">
                {/* Quantity Control */}
                <div className="flex-grow flex items-center justify-between border border-stone-300 bg-white text-stone-850 px-3 py-2 rounded-md text-xs font-medium select-none">
                    <button
                        type="button"
                        onClick={() => handleUpdateQty(quantityInCart - 1)}
                        className="px-2 py-0.5 hover:text-[#E41F66] transition cursor-pointer text-sm font-bold active:scale-90"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span className="text-stone-800 text-[11px] font-medium">
                        Qty: {quantityInCart}
                    </span>
                    <button
                        type="button"
                        onClick={() => handleUpdateQty(quantityInCart + 1)}
                        className="px-2 py-0.5 hover:text-[#E41F66] transition cursor-pointer text-sm font-bold active:scale-90"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                {/* Remove Action */}
                <button
                    type="button"
                    onClick={handleRemove}
                    className="flex items-center justify-center border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-2 rounded-md text-[11px] font-medium transition cursor-pointer active:scale-95"
                    aria-label="Remove product from cart"
                >
                    Remove
                </button>
            </div>
        );
    }

    if (variant === 'luxury') {
        return (
            <button
                type='button'
                className='w-full flex flex-nowrap items-center justify-center gap-2 cursor-pointer text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase py-3 border border-stone-900 bg-stone-900 text-stone-50 hover:bg-[#E41F66] hover:border-[#E41F66] rounded-lg transition-all duration-300 ease-in-out'
                onClick={handleAddToCart}
            >
                <ShoppingBag className="text-stone-50 hidden size-4 group-hover:inline-block group-hover:opacity-100 transition-all duration-300 ease-in-out" />
                ADD TO CART
            </button>
        );
    }

    return (
        <button
            type='button'
            className='relative w-full flex flex-nowrap items-center justify-center gap-3 cursor-pointer text-xs text-nowrap lg:text-sm bg-stone-950 text-stone-55 border border-stone-950 rounded-md py-3 overflow-hidden group hover:scale-95 transition-all duration-300 ease-in-out'
            onClick={handleAddToCart}
        >
            <ShoppingBag className="text-stone-55 hidden size-4 group-hover:inline-block group-hover:opacity-100 transition-all duration-300 ease-in-out" />
            ADD TO CART
        </button>
    );
}, (prevProps, nextProps) => {
    const p1 = prevProps.product;
    const p2 = nextProps.product;
    return (
        prevProps.variant === nextProps.variant &&
        p1.id === p2.id &&
        p1.title === p2.title &&
        p1.price === p2.price &&
        p1.imageUrl === p2.imageUrl &&
        p1.inStock === p2.inStock &&
        JSON.stringify(p1.customizations || {}) === JSON.stringify(p2.customizations || {}) &&
        JSON.stringify(p1.selectedVariant || null) === JSON.stringify(p2.selectedVariant || null)
    );
});

export default AddToCartButton;