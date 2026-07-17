import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from '../cart/AddToCartButton'
import AddToWishListButton from '../wishlist/AddToWishListButton'
import type { ProductCardProps, LayoutMode } from '../../types/allTypes'

const ProductCard: React.FC<ProductCardProps> = React.memo(({
  title,
  price,
  imageUrl,
  id,
  inStock,
  layout = 'grid-4'
}) => {
  const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (layout === 'list') {
    return (
      <div className='group relative flex flex-row items-stretch bg-white border border-stone-200/40 hover:border-[#E41F66]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 ease-out w-full gap-4 md:gap-6 p-4 md:p-5'>
        {/* Image Section */}
        <div className='relative w-32 sm:w-48 md:w-56 shrink-0 aspect-square overflow-hidden bg-stone-50 border border-stone-150 rounded-xl'>
          <Link to={`/products/${id}/details`} className='block w-full h-full'>
            <img
              src={imageUrl}
              alt={title}
              className='w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
          </Link>

          {!inStock && (
            <span className='absolute top-2 left-2 z-10 bg-stone-900/90 text-stone-100 text-[8px] sm:text-[9px] tracking-widest font-semibold uppercase px-2 py-1 border border-stone-800 backdrop-blur-xs'>
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
        </div>

        {/* Info Section */}
        <div className='flex flex-col justify-between flex-grow py-1 sm:py-2'>
          <div className='space-y-1.5'>
            <span className='text-[10px] uppercase tracking-[0.25em] text-[#E41F66]/70 font-semibold block'>
              VIVAH STORE
            </span>

            <Link to={`/products/${id}/details`} className='block group/title'>
              <h3 className='text-stone-900 font-bold text-base sm:text-lg md:text-xl tracking-wide line-clamp-2 group-hover/title:text-[#E41F66] transition-colors duration-300'>
                {title}
              </h3>
            </Link>

            <p className='text-stone-950 font-extrabold text-sm sm:text-base md:text-lg tracking-wide'>
              ₹{formattedPrice}
            </p>
          </div>

          <div className='max-w-xs w-full mt-4 sm:mt-0'>
            <AddToCartButton
              product={{ id, title, price: price.toString(), imageUrl, inStock }}
              variant="luxury"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='group relative flex flex-col h-full bg-white border border-stone-200/40 hover:border-[#E41F66]/20 rounded-2xl overflow-hidden shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-out'>
      {/* Image container */}
      <div className='relative w-full aspect-square overflow-hidden bg-stone-50 border-b border-stone-100'>
        <Link to={`/products/${id}/details`} className='block w-full h-full'>
          <img
            src={imageUrl}
            alt={title}
            className='w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
        </Link>

        {/* Badges */}
        {!inStock && (
          <span className='absolute top-3 left-3 z-10 bg-stone-900/90 text-stone-100 text-[9px] tracking-widest font-semibold uppercase px-2.5 py-1.5 border border-stone-800 backdrop-blur-xs'>
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
      </div>

      {/* Product Info Section */}
      <div className='p-4 md:p-5 flex flex-col flex-grow'>
        {/* Collection Subtitle */}
        <span className='text-[10px] uppercase tracking-[0.25em] text-[#E41F66]/70 font-semibold mb-1.5 block'>
          VIVAH STORE
        </span>

        {/* Product Title */}
        <Link to={`/products/${id}/details`} className='block mb-1 group/title'>
          <h3 className='text-stone-900 font-bold text-sm md:text-base tracking-wide line-clamp-1 group-hover/title:text-[#E41F66] transition-colors duration-300'>
            {title}
          </h3>
        </Link>

        {/* Price */}
        <p className='text-stone-950 font-extrabold text-sm md:text-base tracking-wide mb-4'>
          ₹{formattedPrice}
        </p>

        {/* Button Wrapper */}
        <div className='mt-auto pt-2 z-10 relative'>
          <AddToCartButton
            product={{ id, title, price: price.toString(), imageUrl, inStock }}
            variant="luxury"
          />
        </div>
      </div>
    </div>
  )
});

export default ProductCard
