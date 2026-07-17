import { Link } from 'react-router-dom'
import AddToCartButton from '../../components/cart/AddToCartButton'
import { useWishlistStore } from '../../store/wishlistStore'
import { HeartIcon, X } from 'lucide-react'
import { useEffect } from 'react'

const WishListPage = () => {
  useEffect(() => {
    document.title = "VivahStore | Wishlist";
  }, []);

  const wishlistItems = useWishlistStore((state) => state.wishlistItems)
  const removeWishlistItem = useWishlistStore((state) => state.removeWishlistItem)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  const parsePrice = (v: any) => {
    if (typeof v === 'number') return v
    const n = Number(String(v).replace(/[^0-9.-]/g, ''))
    return Number.isFinite(n) ? n : 0
  }

  const formatPrice = (v: any) => {
    const n = parsePrice(v)
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const wishlistValue = wishlistItems.reduce((sum, item) => sum + parsePrice(item.productPrice), 0)

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-[#E41F66]/10 p-3 text-[#E41F66]">
              <HeartIcon className="size-5" />
            </div>
            <div>
              <h1 className="font-bold text-stone-900 text-3xl">My Wishlist</h1>
              <p className="mt-2 text-sm text-stone-500">You have {wishlistItems.length} item{wishlistItems.length === 1 ? '' : 's'} saved for later.</p>
              {wishlistItems.length > 0 && (
                <p className="text-sm text-stone-500 mt-2">Estimated wishlist value: <span className="font-semibold text-stone-900">₹{wishlistValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
              )}
            </div>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:border-stone-900 hover:text-stone-900 transition cursor-pointer"
              >
                Clear wishlist
              </button>
            </div>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="p-12 border border-stone-200 bg-white text-center rounded-xl">
            <p className="text-stone-500 text-sm">Your wishlist is empty. Add products from the catalog to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.productId} className="group relative flex flex-col h-full bg-white border border-stone-200/40 hover:border-[#E41F66]/20 rounded-2xl overflow-hidden shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-out">
                {/* Image Container with Hover Zoom & Floating Close */}
                <div className="relative w-full aspect-square overflow-hidden bg-stone-50 border-b border-stone-100">
                  <Link to={`/products/${item.productId}/details`} className="block w-full h-full">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Link>

                  {/* Floating Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeWishlistItem(item.productId)}
                    className="absolute top-3 right-3 z-10 bg-white/95 hover:bg-white text-stone-600 hover:text-[#E41F66] rounded-full p-2 shadow-xs transition duration-200 cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium mb-1.5 block">
                    Vivah Store
                  </span>

                  <Link to={`/products/${item.productId}/details`} className="block mb-1 group/title">
                    <h3 className="text-stone-900 font-medium text-sm md:text-[15px] tracking-wide line-clamp-1 group-hover/title:text-[#E41F66] transition-colors duration-300">
                      {item.productName}
                    </h3>
                  </Link>

                  <p className="text-stone-900 font-semibold text-xs md:text-sm tracking-wide mb-4">
                    ₹{formatPrice(item.productPrice)}
                  </p>

                  {/* Luxury Add To Cart Button */}
                  <div className="mt-auto pt-2 z-10 relative">
                    <AddToCartButton
                      product={{
                        id: item.productId,
                        title: item.productName,
                        price: String(parsePrice(item.productPrice)),
                        imageUrl: item.productImage,
                      }}
                      variant="luxury"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishListPage