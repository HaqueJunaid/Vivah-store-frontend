import React from "react"
import { Minus, Plus, X } from "lucide-react"
import { useCartStore } from "../../store/cartStore"
import type { CartComponentItem as CartItem, CartComponentItemProps as CartItemProps } from "../../types/allTypes"

const Cartitem = React.memo(({ cartItems, updateQuantity }: CartItemProps) => {
    const removeFromCart = useCartStore((state) => state.removeCartItem)

    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div key={item.productId} className="p-6 border border-stone-200 bg-white shadow-xs hover:border-stone-300 rounded-lg transition-colors">
                    <div className="relative flex md:flex-row flex-col md:items-center gap-4">
                        {/* Product Image */}
                        <div className="shrink-0 bg-stone-200 rounded-lg w-30 h-30">
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="rounded-lg w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-stone-900 text-2xl">{item.productName}</h3>
                            {/* <p className="text-stone-500 text-sm">{item.productCode}</p> */}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 mr-10">
                            <button
                                onClick={() => updateQuantity(item, -1)}
                                className="flex justify-center items-center hover:bg-stone-50 border border-stone-300 rounded-full w-8 h-8"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 font-medium text-center">
                                {item.productQuantity.toString().padStart(2, '0')}
                            </span>
                            <button
                                onClick={() => updateQuantity(item, 1)}
                                className="flex justify-center items-center hover:bg-stone-50 border border-stone-300 rounded-full w-8 h-8"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Price and Total */}
                        <div className="">
                            {(() => {
                                const parsedPrice = typeof item.productPrice === 'string' ? parseFloat(item.productPrice) : item.productPrice
                                const unitPrice = Number.isFinite(parsedPrice) ? parsedPrice : 0
                                const totalPrice = unitPrice * item.productQuantity
                                return (
                                    <>
                                        <p className="font-semibold">₹{unitPrice.toFixed(2)}</p>
                                        <p className="text-stone-500 text-sm">
                                            ₹{totalPrice.toFixed(2)}
                                        </p>
                                    </>
                                )
                            })()}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeFromCart(item.productId, item.customizations, item.selectedVariant)}
                            className="top-0 right-0 absolute md:relative hover:bg-stone-100 p-2 rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5 text-stone-400" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
});

export default Cartitem