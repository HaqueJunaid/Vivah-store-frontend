import React, { useState, useRef, type ChangeEvent } from 'react'
import type { ProductContentProps } from "../../types/allTypes";
import AddToCartButton from '../cart/AddToCartButton';
import AddToWishListButton from '../wishlist/AddToWishListButton';

const FIELD_CONFIG: Record<string, { label: string; placeholder: string; type: string }> = {
    coupleName: { label: "Couple Name", placeholder: "Enter couple name", type: "text" },
    customDescription: { label: "Custom Description", placeholder: "Enter custom description", type: "text" },
    customTags: { label: "Custom Tags", placeholder: "Enter custom tags", type: "text" },
};

const ProductContent: React.FC<ProductContentProps> = ({ 
    id, 
    title, 
    price, 
    description,
    inStock, 
    canUploadImage, 
    variants, 
    isCustomizable,
    customizations: activeCustomizationKeys,
    handleVariantChange 
}) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [quantity, setQuantity] = useState(1)
    const [activeVariant, setActiveVariant] = useState(0)
    const [customizations, setCustomizations] = useState<Record<string, string>>({})

    const handleCustomizationChange = (key: string, value: string) => {
        setCustomizations(prev => ({ ...prev, [key]: value }));
    }

    const handleQunatityChange = (incOrDec: 'inc' | 'dec') => {
        if (incOrDec === 'inc') {
            setQuantity(quantity + 1)
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const clearUploadedImage = () => {
        setUploadedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const normalizedActionPrice = Number(String(price).replace(/[^0-9.-]/g, '')) || 0
    const textKeys = (activeCustomizationKeys || []).filter(key => key !== 'customImage');

    return (
        <div className='flex flex-col gap-4 py-2 w-full'>
            <div className='flex flex-col gap-2.5 mb-6 pb-6 border-b border-stone-200/80 text-stone-900'>
                {inStock ? (
                    <span className='flex items-center gap-1.5 text-xs text-[#E41F66] font-semibold tracking-widest uppercase'>
                        <span className='size-1.5 rounded-full bg-[#E41F66] animate-pulse' />
                        In Stock
                    </span>
                ) : (
                    <span className='flex items-center gap-1.5 text-xs text-stone-500 font-semibold tracking-widest uppercase'>
                        <span className='size-1.5 rounded-full bg-stone-400' />
                        Out of Stock
                    </span>
                )}
                <h1 className='font-sans font-medium text-3xl sm:text-4xl tracking-wide capitalize leading-tight text-stone-900'>{title}</h1>
                <p className='text-[#E41F66] font-semibold text-2xl tracking-wide mt-1'>₹{price}</p>
            </div>

            {/* Product Description */}
            {description && (
                <div className='pb-6 border-b border-stone-200/80'>
                    <span className='text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block mb-2'>Description</span>
                    <p className='text-stone-600 text-sm leading-relaxed whitespace-pre-line font-light'>
                        {description}
                    </p>
                </div>
            )}

            {/* Quantity selection */}
            <div className='flex flex-col gap-3 pb-6 border-b border-stone-200/80'>
                <span className='text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold'>Quantity</span>
                <div className='flex items-center border border-stone-300 w-fit rounded-none bg-white'>
                    <button 
                        type="button" 
                        onClick={() => handleQunatityChange('dec')} 
                        className='px-4 py-2.5 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer select-none text-base font-medium border-r border-stone-200'
                    >
                        -
                    </button>
                    <span className='px-6 text-stone-900 font-medium min-w-12 text-center select-none text-sm'>{quantity}</span>
                    <button 
                        type="button" 
                        onClick={() => handleQunatityChange('inc')} 
                        className='px-4 py-2.5 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer select-none text-base font-medium border-l border-stone-200'
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Custom Image Uploader */}
            {canUploadImage && (
                <div className='flex flex-col gap-3 pt-3 pb-6 border-b border-stone-200/80'>
                    <span className='text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold'>Upload Custom Image</span>
                    {uploadedImage ? (
                        <div className='flex flex-col items-start gap-3 w-80'>
                            <div className='border border-stone-200 rounded-none p-1 bg-white relative group'>
                                <img src={uploadedImage} alt='Uploaded preview' className='w-auto h-48 object-cover' />
                                <button
                                    type='button'
                                    onClick={clearUploadedImage}
                                    className='absolute top-2 right-2 bg-stone-900/85 hover:bg-stone-900 text-white rounded-full p-1.5 opacity-90 transition-opacity cursor-pointer text-xs'
                                    aria-label="Remove image"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ) : (
                        <label htmlFor="fileInput" className="flex flex-col items-center gap-3 p-8 border border-stone-300 hover:border-[#E41F66]/50 border-dashed rounded-none w-full max-w-md text-sm transition-colors cursor-pointer bg-white group">
                            <svg className="size-8 text-stone-400 group-hover:text-[#E41F66] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p className="text-stone-500 text-xs tracking-wide">Drag & drop your reference file here</p>
                            <p className="text-stone-400 text-xs">Or <span className="text-stone-900 font-semibold underline">browse file</span></p>
                            <input
                                id="fileInput"
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>
            )}

            {/* Design Variants */}
            {variants && variants.length > 0 && (
                <div className='flex flex-col gap-3 pt-3 pb-6 border-b border-stone-200/80'>
                    <span className='text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold'>Design Variants</span>
                    <div className='flex flex-wrap gap-4'>
                        {variants.map((variant, index) => (
                            <button 
                                type="button"
                                key={index} 
                                onClick={() => { setActiveVariant(index); handleVariantChange(index); }} 
                                className={`relative flex flex-col items-center gap-1.5 bg-white p-0.5 border transition-all duration-300 cursor-pointer rounded-none ${
                                    activeVariant === index 
                                        ? 'border-[#E41F66] ring-1 ring-[#E41F66]/30' 
                                        : 'border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                <img src={variant.images[0]} alt={variant.name} className='w-16 h-20 object-cover' />
                                <span className='text-[10px] tracking-wide text-stone-600 px-1 py-0.5'>{variant.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Dynamically Selected Text Customization Fields */}
            {isCustomizable && textKeys.length > 0 && (
                <div className='flex flex-col pt-3 pb-6 border-b border-stone-200/80 gap-4'>
                    <span className='text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold'>Product Customization</span>
                    <div className='space-y-4'>
                        {textKeys.map((key) => {
                            const config = FIELD_CONFIG[key] || { 
                                label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim(), 
                                placeholder: `Enter ${key}`, 
                                type: "text" 
                            };
                            return (
                                <div key={key} className='flex flex-col gap-1.5'>
                                    <label className='text-stone-700 text-xs font-semibold uppercase tracking-wider'>{config.label}</label>
                                    <input 
                                        type={config.type} 
                                        placeholder={config.placeholder} 
                                        value={customizations[key] || ''} 
                                        onChange={(e) => handleCustomizationChange(key, e.target.value)} 
                                        className='p-3 border border-stone-200 focus:border-[#E41F66] rounded-none outline-none text-sm transition bg-white' 
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Actions: Add to Cart and Wishlist */}
            <div className='flex gap-4 pt-6 pb-6 items-stretch w-full'>
                <div className='flex-grow'>
                    <AddToCartButton 
                        product={{ 
                            id, 
                            title, 
                            price: String(normalizedActionPrice), 
                            imageUrl: variants?.[activeVariant]?.images?.[0],
                            quantity,
                            selectedVariant: variants?.[activeVariant],
                            uploadedImage: uploadedImage || undefined,
                            customizations,
                            inStock: variants && variants.length > 0 ? (variants[activeVariant]?.inStock ?? true) : inStock
                        }} 
                        variant="luxury"
                    />
                </div>
                <AddToWishListButton 
                    id={id} 
                    title={title} 
                    price={normalizedActionPrice} 
                    imageUrl={variants?.[activeVariant]?.images?.[0]} 
                    variant="detail"
                />
            </div>
        </div>
    )
}

export default ProductContent
