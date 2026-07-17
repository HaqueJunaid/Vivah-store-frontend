import { ShoppingCart, MapPin, Plus, Check } from 'lucide-react';
import OrderSummary from '../../components/cart/OrderSummary';
import Cartitem from '../../components/cart/Cartitem';
import AddAddressForm from '../../components/profile/AddAddressForm';
import { AddressSkeleton } from '../../components/common/Skeletons';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { getAddresses } from '../../services/addressService';
import { createOrder } from '../../services/orderService';
import toast from 'react-hot-toast';
import type { AddressItem } from '../../types/allTypes';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { user } = useAuthStore();
    const cartItems = useCartStore((state) => state.cartItems);
    const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<AddressItem[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);

    useEffect(() => {
        document.title = "VivahStore | Cart";
    }, []);

    useEffect(() => {
        if (user) {
            setLoadingAddresses(true);
            getAddresses()
                .then((res) => {
                    if (res.data.success) {
                        setAddresses(res.data.addresses);
                        if (res.data.addresses.length > 0) {
                            setSelectedAddressId(res.data.addresses[0]._id || null);
                        }
                    }
                })
                .catch((err) => {
                    console.error("Failed to load addresses in cart:", err);
                })
                .finally(() => {
                    setLoadingAddresses(false);
                });
        }
    }, [user]);

    const updateQuantity = (item: any, change: number) => {
        const newQuantity = Math.max(1, item.productQuantity + change);
        updateCartItemQuantity(item.productId, newQuantity, item.customizations, item.selectedVariant);
    };

    const handleAddressAdded = (newAddr: AddressItem) => {
        setAddresses((prev) => [newAddr, ...prev]);
        if (newAddr._id) {
            setSelectedAddressId(newAddr._id);
        }
    };

    const subtotal = useCartStore((state) => state.getCartTotal());
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId) || addresses[0];

    const handleCheckout = async () => {
        if (!user) {
            toast.error("Please sign in to complete your checkout.");
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (!selectedAddressId) {
            toast.error("Please select or add a shipping address.");
            return;
        }

        setCheckingOut(true);
        try {
            const res = await createOrder({
                addressId: selectedAddressId,
                paymentMethod: 'mock'
            });

            if (res.data.success) {
                toast.success("Order placed successfully!");
                clearCart();
                navigate(`/orders/${res.data.order._id}`);
            } else {
                toast.error(res.data.message || "Failed to place order.");
            }
        } catch (err: any) {
            console.error("Checkout error:", err);
            toast.error(err.response?.data?.message || "Failed to place order.");
        } finally {
            setCheckingOut(false);
        }
    };

    return (
        <div className="bg-stone-50 min-h-screen">
            <div className="mx-auto px-4 py-8 container">
                {/* Header */}
                <div className="flex items-start gap-3 mb-8">
                    <div className="rounded-full bg-[#E41F66]/10 p-3 text-[#E41F66]">
                        <ShoppingCart className="size-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-stone-900 text-3xl">My Cart</h1>
                        <p className="mt-2 text-sm text-stone-500">You have {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart.</p>
                        {cartItems.length > 0 && (
                            <p className="text-sm text-stone-500 mt-2">Estimated cart value: <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                        )}
                    </div>
                </div>

                <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
                    {/* Main Content: Delivery Address & Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Address Section */}
                        <div className="p-6 border border-stone-200 rounded-lg bg-white shadow-xs">
                            <div className="flex justify-between items-center mb-4 pb-3 border-b border-stone-100">
                                <h2 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                                    <MapPin className="size-5 text-[#E41F66]" /> Shipping & Delivery Address
                                </h2>
                                {user && addresses.length > 0 && !showAddForm && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="text-sm font-medium text-[#E41F66] hover:text-[#c60b4d] flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                        <Plus className="size-4" /> Add New
                                    </button>
                                )}
                            </div>

                            {!user ? (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm flex justify-between items-center">
                                    <span>Please sign in to view and manage your delivery addresses.</span>
                                    <Link to="/login" className="font-semibold underline text-amber-900 hover:text-amber-950">Sign In</Link>
                                </div>
                            ) : loadingAddresses ? (
                                <AddressSkeleton />
                            ) : showAddForm ? (
                                <AddAddressForm
                                    cancel={setShowAddForm}
                                    onSubmitSuccess={handleAddressAdded}
                                />
                            ) : addresses.length === 0 ? (
                                <div className="text-center py-6 bg-stone-50 border border-dashed border-stone-300 rounded-lg">
                                    <MapPin className="size-8 mx-auto text-stone-400 mb-2" />
                                    <p className="text-stone-700 font-medium mb-1">No delivery address found</p>
                                    <p className="text-stone-500 text-sm mb-4">Please add a shipping address to complete your order.</p>
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="bg-[#E41F66] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#c60b4d] transition-all cursor-pointer inline-flex items-center gap-2"
                                    >
                                        <Plus className="size-4" /> Add Delivery Address
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {addresses.length > 1 && (
                                        <div className="mb-3">
                                            <label className="block text-xs font-medium text-stone-500 mb-1">Select Delivery Location:</label>
                                            <select
                                                value={selectedAddressId || ''}
                                                onChange={(e) => setSelectedAddressId(e.target.value)}
                                                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-md text-sm text-stone-800"
                                            >
                                                {addresses.map((a) => (
                                                    <option key={a._id} value={a._id}>
                                                        {a.firstName} {a.lastName} - {a.address}, {a.city} ({a.postalCode})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {selectedAddress && (
                                        <div className="p-4 bg-stone-50 border border-stone-200 rounded-md relative">
                                            <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
                                                <Check className="size-4" /> Deliver to this address
                                            </div>
                                            <p className="font-semibold text-stone-900">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                                            <p className="text-stone-600 text-sm mt-1">{selectedAddress.address}{selectedAddress.apartment ? `, ${selectedAddress.apartment}` : ''}</p>
                                            <p className="text-stone-600 text-sm">{selectedAddress.city}, {selectedAddress.country} - {selectedAddress.postalCode}</p>
                                            <p className="text-stone-600 text-sm mt-1">Phone: <span className="font-medium">{selectedAddress.phone}</span></p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div>
                            {cartItems.length === 0 ? (
                                <div className="p-10 border border-stone-200 rounded-lg bg-white text-center shadow-xs">
                                    <p className="text-stone-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <Cartitem cartItems={cartItems} updateQuantity={updateQuantity} />
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <OrderSummary 
                        subtotal={subtotal} 
                        onCheckout={handleCheckout} 
                        disabled={checkingOut || cartItems.length === 0} 
                    />
                </div>
            </div>
        </div>
    );
};

export default CartPage;