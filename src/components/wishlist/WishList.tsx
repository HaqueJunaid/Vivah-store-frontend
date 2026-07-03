import { Trash2, Star, ShoppingBag, Heart } from 'lucide-react';
import AddToCartButton from '../cart/AddToCartButton';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../store/wishlistStore';

export const WishList = () => {
    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    const removeWishlistItem = useWishlistStore((state) => state.removeWishlistItem);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);

    const formatPrice = (value: number) => {
        const num = Number(value) || 0;
        return num.toLocaleString('en-IN', {
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'INR'
        });
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-stone-200/60 shadow-sm w-full">
                <div className="bg-[#E41F66]/10 p-5 rounded-full mb-4 text-[#E41F66] animate-bounce">
                    <Heart className="size-8" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-1">Your wishlist is empty</h3>
                <p className="text-stone-500 text-sm text-center max-w-sm mb-6">
                    Looks like you haven't added anything to your wishlist yet. Explore our wedding store to find your perfect style.
                </p>
                <Link 
                    to="/" 
                    className="bg-stone-950 text-stone-50 hover:bg-stone-800 transition px-6 py-3 rounded-full text-sm font-semibold shadow-sm"
                >
                    Discover Products
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                <div>
                    <h2 className="text-2xl font-semibold text-stone-900">My Wishlist</h2>
                    <p className="text-sm text-stone-500 mt-1">You have {wishlistItems.length} item{wishlistItems.length === 1 ? '' : 's'} saved</p>
                </div>
                <button 
                    onClick={clearWishlist}
                    className="text-sm font-medium text-stone-500 hover:text-stone-950 transition cursor-pointer"
                >
                    Remove All
                </button>
            </div>

            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                {wishlistItems.map((item) => {
                    return (
                        <div 
                            key={item.productId} 
                            className="group flex flex-col sm:flex-row gap-4 p-4 rounded-3xl border border-stone-200/60 bg-white hover:shadow-md transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Product Image Section */}
                            <div className="relative w-full sm:w-40 h-48 sm:h-auto rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                                <img 
                                    src={item.productImage} 
                                    alt={item.productName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <span className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Wishlist
                                </span>
                            </div>

                            {/* Product Details Section */}
                            <div className="flex flex-col justify-between flex-grow py-1">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-semibold text-stone-900 group-hover:text-[#E41F66] transition-colors line-clamp-2 text-md sm:text-base leading-snug">
                                            {item.productName}
                                        </h3>
                                        <button 
                                            onClick={() => removeWishlistItem(item.productId)}
                                            className="text-stone-400 hover:text-[#E41F66] hover:bg-rose-50 p-1.5 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0"
                                            title="Remove item"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                    
                                    {/* Rating or static info */}
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-amber-400">
                                            <Star className="size-3.5 fill-current" />
                                        </div>
                                        <span className="text-xs font-semibold text-stone-700">4.8</span>
                                        <span className="text-xs text-stone-400">(Saved item)</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mt-3">
                                    {/* Pricing */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-stone-950">
                                            {formatPrice(item.productPrice)}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex-grow">
                                            <AddToCartButton 
                                                product={{
                                                    id: item.productId,
                                                    title: item.productName,
                                                    price: String(item.productPrice),
                                                    imageUrl: item.productImage
                                                }} 
                                            />
                                        </div>
                                        <Link
                                            to={`/products/${item.productId}/details`}
                                            className="flex items-center justify-center p-3 rounded-md border border-stone-200 hover:border-stone-900 transition hover:bg-stone-50 cursor-pointer"
                                            title="View Details"
                                        >
                                            <ShoppingBag className="size-4 text-stone-600 group-hover:text-stone-900" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};