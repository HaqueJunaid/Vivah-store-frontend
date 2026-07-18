import React from "react";
import { Minus, Plus, X, Paintbrush, Box, Image as ImageIcon } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import type { CartComponentItemProps as CartItemProps } from "../../types/allTypes";

const Cartitem = React.memo(({ cartItems, updateQuantity }: CartItemProps) => {
    const removeFromCart = useCartStore((state) => state.removeCartItem);

    return (
        <div className="space-y-5">
            {cartItems.map((item) => {
                const parsedPrice = typeof item.productPrice === 'string' ? parseFloat(item.productPrice) : item.productPrice;
                const unitPrice = Number.isFinite(parsedPrice) ? parsedPrice : 0;
                const totalPrice = unitPrice * item.productQuantity;
                const mainImage = item.uploadedImage || item.productImage || 'https://picsum.photos/600/500';

                return (
                    <div 
                        key={item.productId} 
                        className="p-5 md:p-6 border border-stone-200 bg-white shadow-xs hover:shadow-md hover:border-stone-300 rounded-xl transition-all duration-300 relative group"
                    >
                        {/* Remove Button (Top-Right) */}
                        <button
                            onClick={() => removeFromCart(item.productId, item.customizations, item.selectedVariant)}
                            className="absolute top-4 right-4 bg-stone-50 hover:bg-red-50 hover:text-red-500 p-2 rounded-full transition-all duration-200 cursor-pointer border border-stone-100"
                            title="Remove item"
                        >
                            <X className="w-4 h-4 text-stone-500 hover:text-red-500" />
                        </button>

                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                            {/* Product Image Panel */}
                            <div className="relative shrink-0 rounded-lg w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border border-stone-100 bg-stone-50 shadow-2xs">
                                <img
                                    src={mainImage}
                                    alt={item.productName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {item.uploadedImage && (
                                    <div className="absolute bottom-1 right-1 bg-stone-900/80 backdrop-blur-xs text-white p-1 rounded-sm" title="Custom Uploaded Image">
                                        <ImageIcon className="w-3.5 h-3.5" />
                                    </div>
                                )}
                            </div>

                            {/* Product Details Panel */}
                            <div className="flex-1 min-w-0 pr-4 sm:pr-8">
                                <h3 className="font-bold text-stone-900 text-lg md:text-xl leading-tight truncate">
                                    {item.productName}
                                </h3>

                                {/* Variant Badge */}
                                {item.selectedVariant && (() => {
                                    const variant = item.selectedVariant;
                                    const name = typeof variant === 'string' ? variant : (variant.name || variant.title || 'Default');
                                    const imageUrl = typeof variant === 'object' && variant.images && variant.images.length > 0 ? variant.images[0] : null;
                                    return (
                                        <div className="mt-1.5 flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
                                            <Box className="w-3.5 h-3.5 text-stone-400" />
                                            <span className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-md text-stone-700 font-medium capitalize">
                                                {imageUrl && (
                                                    <img src={imageUrl} className="w-3.5 h-3.5 object-cover rounded-full border border-stone-300" alt={name} />
                                                )}
                                                <span>Variant: {name}</span>
                                            </span>
                                        </div>
                                    );
                                })()}

                                {/* Customizations List */}
                                {item.customizations && Object.entries(item.customizations).length > 0 && (
                                    <div className="mt-2.5">
                                        <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1.5">
                                            <Paintbrush className="w-3.5 h-3.5 text-[#E41F66]" />
                                            <span>Custom Specifications:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {Object.entries(item.customizations).map(([key, val]) => (
                                                <span 
                                                    key={key} 
                                                    className="inline-flex items-center bg-[#E41F66]/5 border border-[#E41F66]/10 text-[#E41F66] text-xs px-2.5 py-0.5 rounded-md font-medium"
                                                >
                                                    <span className="opacity-70 capitalize mr-1">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                                    <span className="font-semibold">{val as React.ReactNode}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quantity Selector & Price Alignment */}
                            <div className="flex flex-row sm:flex-col md:flex-row items-center justify-between sm:justify-center gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-150">
                                {/* Quantity Selector */}
                                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-full p-1.5">
                                    <button
                                        onClick={() => updateQuantity(item, -1)}
                                        disabled={item.productQuantity <= 1}
                                        className="flex justify-center items-center hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent border border-stone-200 rounded-full w-7 h-7 cursor-pointer transition-colors shadow-2xs"
                                        title="Decrease Quantity"
                                    >
                                        <Minus className="w-3.5 h-3.5 text-stone-600" />
                                    </button>
                                    <span className="w-9 text-sm font-semibold text-center text-stone-850">
                                        {item.productQuantity.toString().padStart(2, '0')}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item, 1)}
                                        className="flex justify-center items-center hover:bg-white border border-stone-200 rounded-full w-7 h-7 cursor-pointer transition-colors shadow-2xs"
                                        title="Increase Quantity"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-stone-600" />
                                    </button>
                                </div>

                                {/* Price Details */}
                                <div className="text-right shrink-0 min-w-[100px]">
                                    <div className="text-xs text-stone-400 font-semibold mb-0.5">Unit: ₹{unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                    <div className="font-extrabold text-stone-900 text-lg">
                                        ₹{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

Cartitem.displayName = "Cartitem";

export default Cartitem;