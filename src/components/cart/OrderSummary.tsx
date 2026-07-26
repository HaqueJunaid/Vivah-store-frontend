import { Info } from "lucide-react"
import type { OrderSummaryProps } from "../../types/allTypes";

const OrderSummary = ({ subtotal, gstRate, shippingCost, onCheckout, disabled }: OrderSummaryProps) => {
    const gstAmount = subtotal * ((gstRate || 0) / 100);
    const delivery = shippingCost || 0;
    const total = subtotal + gstAmount + delivery;

    return (
        <div className="lg:col-span-1 ">
            <div className="top-8 sticky p-6 border border-stone-200 bg-white rounded-lg">
                <h2 className="mb-6 font-bold text-xl">Order Summary</h2>

                <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Sub-Total</span>
                        <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">GST ({gstRate}%)</span>
                        </div>
                        <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Delivery</span>
                            <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">₹{delivery.toFixed(2)}</p>
                            {delivery === 0 && <p className="text-green-600 text-xs mt-1">Free</p>}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-stone-200">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-indigo-600">₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={onCheckout}
                    disabled={disabled}
                    className="bg-black hover:bg-gray-800 disabled:bg-gray-400 mb-6 py-3 rounded-lg w-full font-semibold text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                    Check Out
                </button>

                <div className="mb-6">
                    <p className="mb-3 text-gray-600 text-sm">We Accept</p>
                    <div className="flex gap-3">
                        <div className="flex justify-center items-center bg-blue-600 rounded w-12 h-8">
                            <span className="font-bold text-white text-xs">P</span>
                        </div>
                        <div className="flex justify-center items-center bg-purple-600 rounded w-12 h-8">
                            <span className="font-bold text-white text-xs">S</span>
                        </div>
                        <div className="flex justify-center items-center bg-blue-500 rounded w-12 h-8">
                            <span className="font-bold text-white text-xs">Pay</span>
                        </div>
                        <div className="flex justify-center items-center bg-green-600 rounded w-12 h-8">
                            <span className="font-bold text-white text-xs">W</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary