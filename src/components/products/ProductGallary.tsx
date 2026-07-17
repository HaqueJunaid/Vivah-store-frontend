import React, { useState, useRef } from 'react'

const ProductGallary: React.FC<{ images: string[], mainImage: string, handleVariantChange?: (variantIndex: number) => void, handleThumbnailClick?: (imageIndex: number) => void }> = ({ images, handleThumbnailClick, mainImage }) => {

    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
    const [isZoomed, setIsZoomed] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setZoomPos({ x, y })
    }

    const handleMouseEnter = () => setIsZoomed(true)
    const handleMouseLeave = () => setIsZoomed(false)

    return (
        <div className='md:sticky md:top-28 flex md:flex-row flex-col-reverse gap-4 w-full h-fit select-none'>
            {images.length > 1 && (
                <div className='flex flex-row md:flex-col flex-nowrap gap-3 overflow-auto max-h-[500px] shrink-0 scrollbar-none'>
                    {images.map((image, i) => (
                        <button
                            type="button"
                            key={image + i}
                            onClick={() => handleThumbnailClick?.(i)}
                            className={`w-18 h-22 shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer rounded-xl bg-white p-0.5 ${
                                mainImage === image
                                    ? "border-[#E41F66] ring-1 ring-[#E41F66]/30"
                                    : "border-stone-200 hover:border-stone-400"
                            }`}
                        >
                            <img src={image} alt={`Thumbnail ${i + 1}`} className='w-full h-full object-center object-cover rounded-xl' />
                        </button>
                    ))}
                </div>
            )}
            <div
                ref={containerRef}
                className='w-full aspect-[4/5] md:aspect-square overflow-hidden cursor-zoom-in border border-stone-200/50 bg-white rounded-2xl relative'
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    className='w-full h-full object-cover transition-transform duration-300 ease-in-out pointer-events-none'
                    style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                    src={mainImage}
                    alt='Product main image'
                />
            </div>
        </div>
    )
}

export default ProductGallary