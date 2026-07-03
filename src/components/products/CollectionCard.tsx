import React from 'react'
import { Link } from 'react-router-dom'
import type { CollectionCardProps } from '../../types/allTypes'

const CollectionCard: React.FC<CollectionCardProps> = ({ title, imageUrl, to }) => {
  return (
    <Link
      to={to}
      className='group block relative bg-stone-100 rounded-md w-full aspect-square overflow-hidden border-2 border-stone-200 hover:border-[#E41F66]/70 transition-all duratoin-300 ease-in-out'
    >
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        loading='lazy'
      />
      <div className='bottom-[5%] lg:bottom-[5%] left-1/2 absolute w-[90%] text-center -translate-x-1/2'>
        <div className='bg-stone-50/90 py-1 lg:py-2 rounded-md text-sm md:text-lg backdrop-blur-xs group-hover:bg-[#E41F66]/70 group-hover:text-stone-50 transition-all duration-300 ease-in-out'>
          <span className='block md:hidden'>{title.length > 12 ? `${title.substring(0, 12)}...` : title}</span>
          <span className='hidden md:block'>{title.length > 24 ? `${title.substring(0, 24)}...` : title}</span>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
