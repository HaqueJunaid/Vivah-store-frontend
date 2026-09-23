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
                    className="w-full flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase py-2 sm:py-2.5 px-2 border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none rounded-lg sm:rounded-xl"
                >
                    Out of stock
                </button>
            );
        }
        return (
            <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 text-xs rounded-lg py-2.5 sm:py-3 border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed select-none"
            >
                Out of stock
            </button>
        );
    }

    if (isInCart) {
        if (product.hasFixedQuantities) {
            const hasDifferentQty = product.quantity && product.quantity > 0 && product.quantity !== quantityInCart;
            
            if (hasDifferentQty) {
                return (
                    <div className="flex items-center gap-1.5 w-full select-none">
                        <button
                            type="button"
                            onClick={() => handleUpdateQty(product.quantity!)}
                            className="flex-grow flex items-center justify-center gap-1.5 cursor-pointer text-[11px] sm:text-xs font-bold tracking-wide uppercase py-2 sm:py-2.5 px-3 bg-[#E41F66] hover:bg-[#c21553] text-white rounded-lg sm:rounded-xl shadow-xs hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                        >
                            Update Cart to {product.quantity} pcs
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center justify-center border border-rose-200 bg-rose-50 hover:bg-rose-100 text-[#E41F66] rounded-lg sm:rounded-xl size-8 sm:size-9 cursor-pointer transition-colors active:scale-95 shrink-0"
                            aria-label="Remove product from cart"
                            title="Remove from cart"
                        >
                            <Trash2 className="size-3.5 sm:size-4" />
                        </button>
                    </div>
                );
            }

            if (variant === 'luxury') {
                return (
                    <div className="flex items-center gap-1.5 w-full select-none">
                        <div className="flex-grow flex items-center justify-between bg-stone-50 border border-stone-200/80 rounded-lg sm:rounded-xl px-3 py-1.5 h-8 sm:h-9 w-full">
                            <span className="text-stone-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">In Cart:</span>
                            <span className="text-[#E41F66] font-bold text-xs sm:text-sm">{quantityInCart} pcs</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center justify-center border border-rose-200 bg-rose-50 hover:bg-rose-100 text-[#E41F66] rounded-lg sm:rounded-xl size-8 sm:size-9 cursor-pointer transition-colors active:scale-95 shrink-0"
                            aria-label="Remove product from cart"
                            title="Remove from cart"
                        >
                            <Trash2 className="size-3.5 sm:size-4" />
                        </button>
                    </div>
                );
            }

            return (
                <div className="flex items-center gap-1.5 w-full">
                    <div className="flex-grow flex items-center justify-between border border-stone-300 bg-stone-50 px-3 py-1.5 rounded-lg text-xs font-semibold h-9">
                        <span className="text-stone-500 text-[10px] uppercase tracking-wider">In Cart:</span>
                        <span className="text-[#E41F66] font-bold text-xs">{quantityInCart} pcs</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="flex items-center justify-center border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 size-9 rounded-lg text-xs font-medium transition cursor-pointer active:scale-95 shrink-0"
                        aria-label="Remove product from cart"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            );
        }

        if (variant === 'luxury') {
            return (
                <div className="flex items-center gap-1.5 w-full select-none">
                    {/* Quantity Selector */}
                    <div className="flex-grow flex items-center justify-between bg-stone-50 border border-stone-200/80 rounded-lg sm:rounded-xl px-1 sm:px-1.5 py-0.5 sm:py-1 h-8 sm:h-9 w-full">
                        <button
                            type="button"
                            onClick={() => handleUpdateQty(quantityInCart - 1)}
                            className="flex items-center justify-center hover:bg-white border border-stone-200/60 rounded-md sm:rounded-lg size-6 sm:size-7 cursor-pointer transition-colors shadow-2xs active:scale-90 shrink-0"
                            aria-label="Decrease quantity"
                        >
                            <span className="text-stone-700 font-bold text-xs leading-none">-</span>
                        </button>
                        <div className="flex items-center justify-center gap-0.5 px-0.5 sm:px-1">
                            <span className="text-stone-400 font-bold text-[8px] sm:text-[9px] uppercase tracking-wider hidden xs:inline">QTY:</span>
                            <input
                                type="number"
                                min="1"
                                value={quantityInCart}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (!isNaN(val)) {
                                        handleUpdateQty(Math.max(1, val));
                                    }
                                }}
                                onBlur={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (isNaN(val) || val < 1) {
                                        handleUpdateQty(1);
                                    }
                                }}
                                className="w-6 sm:w-8 text-stone-900 font-bold text-xs sm:text-xs text-center outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                aria-label="Cart quantity"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleUpdateQty(quantityInCart + 1)}
                            className="flex items-center justify-center hover:bg-white border border-stone-200/60 rounded-md sm:rounded-lg size-6 sm:size-7 cursor-pointer transition-colors shadow-2xs active:scale-90 shrink-0"
                            aria-label="Increase quantity"
                        >
                            <span className="text-stone-700 font-bold text-xs leading-none">+</span>
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="hidden md:flex items-center justify-center border border-rose-200 bg-rose-50 hover:bg-rose-100 text-[#E41F66] rounded-lg sm:rounded-xl size-8 sm:size-9 cursor-pointer transition-colors active:scale-95 shrink-0"
                        aria-label="Remove product from cart"
                        title="Remove from cart"
                    >
                        <Trash2 className="size-3.5 sm:size-4" />
                    </button>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-1.5 w-full">
                {/* Quantity Control */}
                <div className="flex-grow flex items-center justify-between border border-stone-300 bg-white text-stone-850 px-2.5 py-1.5 rounded-lg text-xs font-medium select-none h-9">
                    <button
                        type="button"
                        onClick={() => handleUpdateQty(quantityInCart - 1)}
                        className="px-2 py-0.5 hover:text-[#E41F66] transition cursor-pointer text-sm font-bold active:scale-90"
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <div className="flex items-center justify-center gap-0.5">
                        <span className="text-stone-400 text-[10px] font-medium">Qty:</span>
                        <input
                            type="number"
                            min="1"
                            value={quantityInCart}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) {
                                    handleUpdateQty(Math.max(1, val));
                                }
                            }}
                            onBlur={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (isNaN(val) || val < 1) {
                                    handleUpdateQty(1);
                                }
                            }}
                            className="w-8 text-stone-800 text-xs font-semibold text-center outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            aria-label="Cart quantity"
                        />
                    </div>
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
                    className="flex items-center justify-center border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 size-9 rounded-lg text-xs font-medium transition cursor-pointer active:scale-95 shrink-0"
                    aria-label="Remove product from cart"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        );
    }

    if (variant === 'luxury') {
        return (
            <button
                type='button'
                className='w-full flex items-center justify-center gap-1.5 cursor-pointer text-[11px] sm:text-xs font-bold tracking-wide uppercase py-2 sm:py-2.5 px-2 bg-stone-900 hover:bg-[#E41F66] text-stone-50 rounded-lg sm:rounded-xl shadow-xs hover:shadow-md transition-all duration-300 active:scale-[0.98]'
                onClick={handleAddToCart}
            >
                <ShoppingBag className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">Add to Cart</span>
            </button>
        );
    }

    return (
        <button
            type='button'
            className='relative w-full flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold bg-stone-950 hover:bg-[#E41F66] text-white border border-stone-950 hover:border-[#E41F66] rounded-lg sm:rounded-xl py-2.5 sm:py-3 px-4 shadow-xs hover:shadow-md transition-all duration-300 active:scale-[0.98]'
            onClick={handleAddToCart}
        >
            <ShoppingBag className="size-4 shrink-0" />
            <span>Add to Cart</span>
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
        p1.quantity === p2.quantity &&
        p1.imageUrl === p2.imageUrl &&
        p1.inStock === p2.inStock &&
        p1.hasFixedQuantities === p2.hasFixedQuantities &&
        JSON.stringify(p1.customizations || {}) === JSON.stringify(p2.customizations || {}) &&
        JSON.stringify(p1.selectedVariant || null) === JSON.stringify(p2.selectedVariant || null)
    );
});

export default AddToCartButton;