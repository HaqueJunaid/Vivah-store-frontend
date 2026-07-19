import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { getProductById } from '../../services/productService'
import { useProductStore } from '../../store/productStore'
import ProductGallary from './ProductGallary.tsx'
import ProductContent from './ProductContent.tsx'
import { Skeleton } from '../common/Skeletons'

interface ProductPreviewModalProps {
  productId: string | null
  isOpen: boolean
  onClose: () => void
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ productId, isOpen, onClose }) => {
  const [dbProduct, setDbProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!isOpen || !productId) return

    // Check if the product details are already loaded in the Zustand store
    const storeProduct = useProductStore.getState().products.find(p => p._id === productId)
    if (storeProduct) {
      setDbProduct(storeProduct)
      setLoading(false)
      setError(null)
      setSelectedVariant(0)
      setSelectedImage(0)
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await getProductById(productId)
        setDbProduct(data.product)
        setSelectedVariant(0)
        setSelectedImage(0)
      } catch (err: any) {
        console.error("Fetch preview product error:", err)
        setError(err.response?.data?.message || err.message || "Failed to load product preview.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, isOpen])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !productId) return null

  const product = dbProduct ? {
    id: dbProduct._id,
    title: dbProduct.title,
    price: dbProduct.price.toString(),
    description: dbProduct.description,
    inStock: (dbProduct.quantity ?? 0) > 0,
    canUploadImage: !!(dbProduct.isCustomizable && dbProduct.customizations?.includes("customImage")),
    variants: dbProduct.hasVariants 
        ? [
            {
                name: "Default",
                images: dbProduct.imageUrls && dbProduct.imageUrls.length > 0
                    ? dbProduct.imageUrls
                    : ['https://picsum.photos/600/500'],
                inStock: (dbProduct.quantity ?? 0) > 0
            },
            {
                name: dbProduct.variantTitle || "Variant",
                images: dbProduct.variantImages && dbProduct.variantImages.length > 0 
                    ? dbProduct.variantImages 
                    : (dbProduct.imageUrls && dbProduct.imageUrls.length > 0 ? dbProduct.imageUrls : ['https://picsum.photos/600/500']),
                inStock: (dbProduct.quantity ?? 0) > 0
            }
          ]
        : [
            {
                name: "Default",
                images: dbProduct.imageUrls && dbProduct.imageUrls.length > 0
                    ? dbProduct.imageUrls
                    : ['https://picsum.photos/600/500'],
                inStock: (dbProduct.quantity ?? 0) > 0
            }
          ],
    isCustomizable: dbProduct.isCustomizable ?? false,
    customizations: dbProduct.customizations || [],
  } : null

  const currentVariant = product?.variants[selectedVariant]

  const handleVariantChange = (variantIndex: number) => {
    setSelectedVariant(variantIndex)
    setSelectedImage(0)
  }

  const handleThumbnailClick = (imageIndex: number) => {
    setSelectedImage(imageIndex)
  }

  const normalizedPrice = product ? String(Number(String(product.price).replace(/[^0-9.-]/g, '')) || 0) : '0'

  return createPortal(
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10'>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300' 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-10 border border-stone-200/50 transform scale-100 transition-all duration-300 flex flex-col'>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className='absolute top-4 right-4 z-50 text-stone-500 hover:text-stone-900 size-10 flex items-center justify-center rounded-full hover:bg-stone-150 transition-colors cursor-pointer border border-stone-200/40 bg-white/80 backdrop-blur-xs'
          aria-label="Close modal"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {loading ? (
          <div className='p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
            <div className="w-full space-y-4">
              <Skeleton className="w-full aspect-[4/5] md:aspect-square rounded-2xl" />
              <div className="flex gap-2.5">
                <Skeleton className="w-16 h-20 rounded-xl" />
                <Skeleton className="w-16 h-20 rounded-xl" />
              </div>
            </div>
            <div className="w-full space-y-6 pt-2">
              <Skeleton className="w-1/4 h-3.5 rounded-lg" />
              <Skeleton className="w-3/4 h-8 rounded-xl" />
              <Skeleton className="w-1/3 h-6 rounded-lg" />
              <Skeleton className="w-full h-24 rounded-2xl" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
          </div>
        ) : error || !product ? (
          <div className='p-12 text-center text-red-650 flex flex-col items-center justify-center gap-3 min-h-[300px]'>
            <p className='text-xl font-medium tracking-wide'>Error Loading Product</p>
            <p className='text-sm text-stone-500 max-w-md'>{error || "Product not found."}</p>
            <button 
              onClick={onClose} 
              className='mt-4 px-6 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors text-sm font-medium cursor-pointer'
            >
              Close
            </button>
          </div>
        ) : (
          <div className='p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
            {/* Gallery Section */}
            <div className="w-full">
              {currentVariant && (
                <ProductGallary 
                  images={currentVariant.images} 
                  handleThumbnailClick={handleThumbnailClick} 
                  mainImage={currentVariant.images[selectedImage]} 
                />
              )}
            </div>

            {/* Details & Customize Section */}
            <div className="w-full">
              <ProductContent 
                id={product.id} 
                handleVariantChange={handleVariantChange} 
                title={product.title} 
                price={normalizedPrice} 
                description={product.description} 
                inStock={product.inStock} 
                canUploadImage={product.canUploadImage} 
                variants={product.variants} 
                isCustomizable={product.isCustomizable} 
                customizations={product.customizations} 
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default ProductPreviewModal
