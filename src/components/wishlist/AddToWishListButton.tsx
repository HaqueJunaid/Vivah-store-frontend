import { useWishlistStore } from "../../store/wishlistStore"
import toast from "react-hot-toast"
import { FaHeart, FaRegHeart } from "react-icons/fa"

const AddToWishListButton = ({ id, title, price, imageUrl, variant = 'default' }: { id: string, title: string, price: string | number, imageUrl: string | undefined, variant?: 'default' | 'floating' | 'detail' }) => {

    const addToWishlist = useWishlistStore((state: any) => state.addWishlistItem)
    const removeFromWishlist = useWishlistStore((state: any) => state.removeWishlistItem)
    const isAddedToWishList = useWishlistStore((state: any) => state.isInWishlist(id))

    const normalizePrice = (val: string | number) => {
        if (typeof val === 'number') return val
        const cleaned = String(val).replace(/[^0-9.-]/g, '')
        const parsed = parseFloat(cleaned)
        return Number.isFinite(parsed) ? parsed : 0
    }

    const toggleWishlist = () => {
        if (isAddedToWishList) {
            removeFromWishlist(id)
            toast.success(`Product removed from wishlist`)
        } else {
            addToWishlist({
                productId: String(id),
                productName: title,
                productPrice: normalizePrice(price),
                productImage: imageUrl,
            })
            toast.success(`Product added to wishlist`)
        }
    }

    if (variant === 'floating') {
        return (
            <button
                type='button'
                className='absolute top-3 right-3 z-30 flex items-center justify-center size-9 bg-white/95 hover:bg-white backdrop-blur-xs text-stone-900 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 border border-stone-200/40 cursor-pointer'
                onClick={toggleWishlist}
                aria-label='Wishlist'
            >
                {isAddedToWishList ? (
                    <FaHeart className='size-4 text-[#E41F66] transition-all duration-300' />
                ) : (
                    <FaRegHeart className='size-4 text-stone-900 hover:text-[#E41F66] transition-all duration-300' />
                )}
            </button>
        )
    }

    if (variant === 'detail') {
        return (
            <button
                type='button'
                className='flex items-center justify-center border border-stone-300 hover:border-[#E41F66] text-stone-900 px-5 transition-all duration-300 cursor-pointer shrink-0 rounded-lg bg-white hover:text-[#E41F66] active:scale-95'
                onClick={toggleWishlist}
                aria-label='Wishlist'
            >
                {isAddedToWishList ? (
                    <FaHeart className='size-5 text-[#E41F66] transition-all duration-300' />
                ) : (
                    <FaRegHeart className='size-5 text-stone-700 hover:text-[#E41F66] transition-all duration-300' />
                )}
            </button>
        )
    }

    return (
        <button type='button' className='text-stone-800 cursor-pointer group' onClick={toggleWishlist} aria-label='Wishlist'>
            {isAddedToWishList ? <FaHeart className='size-6 sm:size-8 text-[#E41F66] group-hover:scale-110 transition-all duration-300 ease-in-out' /> : <FaRegHeart className='size-6 sm:size-8 text-stone-900 group-hover:scale-110 transition-all duration-300 ease-in-out' />}
        </button>
    )
}

export default AddToWishListButton