import React from 'react'
import type { ProductGridProps, LayoutMode } from '../../types/allTypes'

const ProductGrid: React.FC<ProductGridProps> = ({ children, layout = 'grid-4' }) => {
  const layoutClassName =
    layout === 'list'
      ? 'flex flex-col'
      : layout === 'grid-2'
        ? 'grid grid-cols-2'
        : layout === 'grid-3'
          ? 'grid grid-cols-2 sm:grid-cols-3'
          : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'

  return (
    <div className={`gap-8 mt-10 mb-3 ${layoutClassName}`}>
      {children}
    </div>
  )
}

export default ProductGrid