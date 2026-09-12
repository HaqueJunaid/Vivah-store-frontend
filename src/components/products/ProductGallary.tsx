import React, { useState, useRef } from 'react'

const ProductGallary: React.FC<{ images: string[], mainImage: string, handleVariantChange?: (variantIndex: number) => void, handleThumbnailClick?: (imageIndex: number) => void }> = ({ images, handleThumbnailClick, mainImage }) => {

    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
    const [isZoomed, setIsZoomed] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const uniqueImages = Array.from(new Set((images || []).filter(Boolean)));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)) return
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setZoomPos({ x, y })
    }

    const handleMouseEnter = () => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768 && !window.matchMedia('(pointer: coarse)').matches) {
            setIsZoomed(true)
        }
    }
    const handleMouseLeave = () => setIsZoomed(false)

    return (
        <div className='md:sticky md:top-28 flex md:flex-row flex-col-reverse gap-4 w-full h-fit select-none'>
            {uniqueImages.length > 1 && (
                <div className='flex flex-row md:flex-col flex-nowrap gap-3 overflow-auto max-h-[500px] shrink-0 scrollbar-none'>
                    {uniqueImages.map((image, i) => (
                        <button
                            type="button"
                            key={image + i}
                            onClick={() => handleThumbnailClick?.(i)}
                            className={`w-18 h-22 shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer rounded-xl bg-white p-1 flex items-center justify-center ${
                                mainImage === image
                                    ? "border-[#E41F66] ring-1 ring-[#E41F66]/30"
                                    : "border-stone-200 hover:border-stone-400"
                            }`}
                        >
                            <img src={image} alt={`Thumbnail ${i + 1}`} className='w-full h-full object-center object-contain rounded-lg bg-stone-50/50' />
                        </button>
                    ))}
                </div>
            )}
            <div
                ref={containerRef}
                className='w-full aspect-[4/5] sm:aspect-square overflow-hidden md:cursor-zoom-in cursor-default border border-stone-200/80 bg-white rounded-2xl relative flex items-center justify-center p-3 shadow-2xs'
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    className='w-full h-full object-contain transition-transform duration-200 ease-out pointer-events-none will-change-transform transform-gpu'
                    style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                    src={mainImage}
                    alt='Product main image'
                    decoding='async'
                />
            </div>
        </div>
    )
}

export default ProductGallary