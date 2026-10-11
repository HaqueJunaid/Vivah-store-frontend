import { Info, ShieldCheck, CreditCard, Banknote } from "lucide-react";
import type { OrderSummaryProps } from "../../types/allTypes";

const OrderSummary = ({
    subtotal,
    gstRate,
    shippingCost,
    onCheckout,
    disabled,
    paymentMethod = 'cashfree',
    setPaymentMethod,
}: OrderSummaryProps) => {
    const gstAmount = subtotal * ((gstRate || 0) / 100);
    const delivery = shippingCost || 0;
    const total = subtotal + gstAmount + delivery;

    const handlePayClick = () => {
        if (onCheckout) {
            onCheckout(paymentMethod);
        }
    };

    return (
        <div className="lg:col-span-1">
            <div className="top-8 sticky p-6 border border-stone-200 bg-white rounded-xl shadow-xs">
                <h2 className="mb-5 font-bold text-xl text-stone-900">Order Summary</h2>

                <div className="space-y-3.5 mb-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-stone-600">Sub-Total</span>
                        <span className="font-semibold text-stone-900">₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-stone-600">GST ({gstRate || 18}%)</span>
                        </div>
                        <span className="font-semibold text-stone-900">₹{gstAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                            <span className="text-stone-600">Delivery Charges</span>
                            <Info className="w-3.5 h-3.5 text-stone-400" />
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-stone-900">₹{delivery.toFixed(2)}</p>
                            {delivery === 0 && <p className="text-emerald-600 text-xs mt-0.5 font-medium">Free</p>}
                        </div>
                    </div>

                    <div className="pt-3.5 border-t border-stone-200">
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-stone-900">Grand Total</span>
                            <span className="font-bold text-[#E41F66]">₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method Selector */}
                {setPaymentMethod && (
                    <div className="mb-6 pt-4 border-t border-stone-100">
                        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                            Select Payment Method
                        </label>
                        <div className="space-y-2.5">
                            <label
                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    paymentMethod === 'cashfree'
                                        ? 'border-[#E41F66] bg-pink-50/40 text-stone-900 ring-1 ring-[#E41F66]'
                                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment_choice"
                                    value="cashfree"
                                    checked={paymentMethod === 'cashfree'}
                                    onChange={() => setPaymentMethod('cashfree')}
                                    className="mt-0.5 accent-[#E41F66]"
                                />
                                <div className="flex-1 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold flex items-center gap-1.5 text-stone-900">
                                            <CreditCard className="size-4 text-[#E41F66]" />
                                            Cashfree Payments
                                        </span>
                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                            Instant
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1">
                                        UPI (GPay/PhonePe), Cards, NetBanking, Wallets
                                    </p>
                                </div>
                            </label>

                            <label
                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    paymentMethod === 'cod'
                                        ? 'border-[#E41F66] bg-pink-50/40 text-stone-900 ring-1 ring-[#E41F66]'
                                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment_choice"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                    className="mt-0.5 accent-[#E41F66]"
                                />
                                <div className="flex-1 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold flex items-center gap-1.5 text-stone-900">
                                            <Banknote className="size-4 text-stone-600" />
                                            Cash on Delivery (COD)
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1">
                                        Pay with cash upon delivery of package
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

                <button
                    onClick={handlePayClick}
                    disabled={disabled}
                    className="bg-[#E41F66] hover:bg-[#c60b4d] disabled:bg-stone-300 mb-5 py-3.5 rounded-lg w-full font-semibold text-white transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                    {paymentMethod === 'cashfree' ? `Pay ₹${total.toFixed(2)} with Cashfree` : 'Place COD Order'}
                </button>

                <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-3">
                        <ShieldCheck className="size-4 text-emerald-600" />
                        <span>100% Safe & Secure Cashfree Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2 py-1 bg-stone-100 text-stone-700 rounded border border-stone-200">
                            UPI
                        </span>
                        <span className="text-[11px] font-bold px-2 py-1 bg-stone-100 text-stone-700 rounded border border-stone-200">
                            Google Pay
                        </span>
                        <span className="text-[11px] font-bold px-2 py-1 bg-stone-100 text-stone-700 rounded border border-stone-200">
                            PhonePe
                        </span>
                        <span className="text-[11px] font-bold px-2 py-1 bg-stone-100 text-stone-700 rounded border border-stone-200">
                            Cards / NetBanking
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;