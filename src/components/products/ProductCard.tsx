import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from '../cart/AddToCartButton'
import AddToWishListButton from '../wishlist/AddToWishListButton'
import type { ProductCardProps } from '../../types/allTypes'
import { LuEye } from "react-icons/lu";
import ProductPreviewModal from './ProductPreviewModal'

const ProductCard: React.FC<ProductCardProps> = React.memo(({
  title,
  price,
  imageUrl,
  id,
  inStock,
  layout = 'grid-4'
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (layout === 'list') {
    return (
      <div className='group relative flex flex-row items-stretch bg-white border border-stone-200/60 hover:border-[#E41F66]/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out w-full gap-3 sm:gap-4 md:gap-6 p-2.5 sm:p-3.5 md:p-4'>
        {/* Image Section */}
        <div className='relative w-24 sm:w-36 md:w-48 shrink-0 aspect-square overflow-hidden bg-stone-50 border border-stone-100 rounded-lg sm:rounded-xl'>
          <Link to={`/products/${id}/details`} className='block w-full h-full'>
            <img
              src={imageUrl}
              alt={title}
              className='w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-stone-900/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
          </Link>

          {!inStock && (
            <span className='absolute top-1.5 left-1.5 z-10 bg-stone-900/90 text-stone-100 text-[8px] sm:text-[9px] tracking-wider font-semibold uppercase px-1.5 py-0.5 border border-stone-800 backdrop-blur-xs rounded'>
              Out of Stock
            </span>
          )}

          <AddToWishListButton
            id={id}
            title={title}
            price={price.toString()}
            imageUrl={imageUrl}
            variant="floating"
          />
          <button
            type='button'
            className='absolute top-9 sm:top-11.5 right-1.5 sm:right-2.5 z-20 flex items-center justify-center size-7 sm:size-8 bg-white/90 hover:bg-white backdrop-blur-md text-stone-900 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 border border-stone-150 cursor-pointer group/btn'
            onClick={() => setIsPreviewOpen(true)}
            aria-label='Quick View'
          >
            <LuEye className='size-3.5 sm:size-4 text-stone-700 group-hover/btn:text-[#E41F66] transition-all duration-300' />
          </button>
        </div>

        {/* Info Section */}
        <div className='flex flex-col justify-between flex-grow py-0.5 sm:py-1 min-w-0'>
          <div className='space-y-1'>
            <span className='text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#E41F66] font-bold block'>
              VIVAH STORE
            </span>

            <Link to={`/products/${id}/details`} className='block group/title'>
              <h3 className='text-stone-900 font-bold text-xs sm:text-base md:text-lg tracking-tight line-clamp-2 group-hover/title:text-[#E41F66] transition-colors duration-200 leading-snug'>
                {title}
              </h3>
            </Link>

            <p className='text-stone-950 font-extrabold text-xs sm:text-sm md:text-base tracking-tight'>
              ₹{formattedPrice}
            </p>
          </div>

          <div className='max-w-xs w-full mt-2 sm:mt-3'>
            <AddToCartButton
              product={{ id, title, price: price.toString(), imageUrl, inStock }}
              variant="luxury"
            />
          </div>
        </div>
        {isPreviewOpen && (
          <ProductPreviewModal
            productId={id}
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className='group relative flex flex-col h-full bg-white border border-stone-200/60 hover:border-[#E41F66]/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease-out'>
      {/* Image container */}
      <div className='relative w-full aspect-square overflow-hidden bg-stone-50 border-b border-stone-100'>
        <Link to={`/products/${id}/details`} className='block w-full h-full'>
          <img
            src={imageUrl}
            alt={title}
            className='w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-stone-900/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
        </Link>

        {/* Badges */}
        {!inStock && (
          <span className='absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-stone-900/90 text-stone-100 text-[8px] sm:text-[9px] tracking-wider font-bold uppercase px-2 py-0.5 sm:py-1 border border-stone-800 backdrop-blur-xs rounded-md shadow-xs'>
            Out of Stock
          </span>
        )}

        {/* Floating Wishlist Button */}
        <AddToWishListButton
          id={id}
          title={title}
          price={price.toString()}
          imageUrl={imageUrl}
          variant="floating"
        />
        {/* Quick View Button */}
        <button
          type='button'
          className='absolute top-9.5 sm:top-11.5 md:top-12.5 right-2 sm:right-2.5 z-20 flex items-center justify-center size-7 sm:size-8 md:size-9 bg-white/90 hover:bg-white backdrop-blur-md text-stone-900 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group/btn'
          onClick={() => setIsPreviewOpen(true)}
          aria-label='Quick View'
        >
          <LuEye className='size-3.5 sm:size-4 text-stone-700 group-hover/btn:text-[#E41F66] transition-all duration-300' />
        </button>
      </div>

      {/* Product Info Section */}
      <div className='p-2.5 sm:p-3.5 md:p-4 flex flex-col flex-grow justify-between'>
        <div>
          {/* Collection Subtitle */}
          <span className='text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#E41F66] font-bold mb-0.5 sm:mb-1 block'>
            VIVAH STORE
          </span>

          {/* Product Title */}
          <Link to={`/products/${id}/details`} className='block mb-1 group/title'>
            <h3 className='text-stone-850 font-bold text-xs sm:text-sm md:text-base tracking-tight line-clamp-2 leading-snug group-hover/title:text-[#E41F66] transition-colors duration-200 min-h-[2rem] sm:min-h-[2.5rem]'>
              {title}
            </h3>
          </Link>

          {/* Price */}
          <p className='text-stone-950 font-extrabold text-xs sm:text-sm md:text-base tracking-tight mb-2 sm:mb-3'>
            ₹{formattedPrice}
          </p>
        </div>

        {/* Button Wrapper */}
        <div className='mt-auto pt-1 z-10 relative'>
          <AddToCartButton
            product={{ id, title, price: price.toString(), imageUrl, inStock }}
            variant="luxury"
          />
        </div>
      </div>
      {isPreviewOpen && (
        <ProductPreviewModal
          productId={id}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  )
});

export default ProductCard
