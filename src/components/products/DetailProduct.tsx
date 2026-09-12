import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    ChevronDown, 
    FileText, 
    Sparkles, 
    AlertCircle, 
    HelpCircle, 
    Share2, 
    ShoppingCart, 
    MessageCircle, 
    Palette, 
    Truck 
} from 'lucide-react'
import ProductGallary from './ProductGallary.tsx'
import ProductContent from './ProductContent.tsx'
import SimilarProducts from './SimilarProducts.tsx'
import { Skeleton } from '../common/Skeletons'
import { getProductById } from '../../services/productService'

const ORDER_STEPS = [
    {
        step: 1,
        title: "Share Your Design",
        icon: <Share2 className="size-4 text-[#E41F66]" />,
        desc: "Choose a design from our collection or share your own design/reference with us. You can also provide your name, initials, logo, date, or personalised text to be included on the tag."
    },
    {
        step: 2,
        title: "Place Your Order",
        icon: <ShoppingCart className="size-4 text-[#E41F66]" />,
        desc: "Complete your order through our website with the required details."
    },
    {
        step: 3,
        title: "Join Our WhatsApp Group",
        icon: <MessageCircle className="size-4 text-emerald-600" />,
        desc: "After your order is confirmed, we'll create a WhatsApp group to coordinate your design and personalisation details."
    },
    {
        step: 4,
        title: "Design Process Begins",
        icon: <Palette className="size-4 text-[#E41F66]" />,
        desc: "Our design team will prepare your tag design and share the first draft for your review and approval."
    },
    {
        step: 5,
        title: "Print & Dispatch",
        icon: <Truck className="size-4 text-[#E41F66]" />,
        desc: "Once the final design is approved, we'll proceed with printing, finishing, quality checking, and dispatch."
    }
];

const DetailProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dbProduct, setDbProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        description: false,
        about: false,
        note: false,
        ordering: false,
    });

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    useEffect(() => {
        document.title = "VivahStore | Product Details";
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const { data } = await getProductById(id);
                setDbProduct(data.product);
            } catch (err: any) {
                console.error("Fetch product error:", err);
                setError(err.response?.data?.message || err.message || "Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const cleanImages = (imgs: any[]) => {
        if (!Array.isArray(imgs)) return ['https://picsum.photos/600/500'];
        const unique = Array.from(new Set(imgs.filter(Boolean)));
        return unique.length > 0 ? unique : ['https://picsum.photos/600/500'];
    };

    const product = dbProduct ? {
        id: dbProduct._id,
        title: dbProduct.title,
        price: dbProduct.price.toString(),
        description: dbProduct.productInfo?.description || dbProduct.description || '',
        productInfo: dbProduct.productInfo || {
            description: dbProduct.description || '',
            about: '',
            note: ''
        },
        inStock: (dbProduct.quantity ?? 0) > 0,
        canUploadImage: !!(dbProduct.isCustomizable && dbProduct.customizations?.includes("customImage")),
        variants: (() => {
            const mainImages = cleanImages(
                dbProduct.imageUrls && dbProduct.imageUrls.length > 0
                    ? dbProduct.imageUrls
                    : (dbProduct.imageUrl ? [dbProduct.imageUrl] : ['https://picsum.photos/600/500'])
            );

            if (dbProduct.hasVariants) {
                if (Array.isArray(dbProduct.variants) && dbProduct.variants.length > 0) {
                    const variantList = dbProduct.variants.map((v: any, idx: number) => ({
                        name: (v.title || v.name || `Variant ${idx + 1}`).trim(),
                        images: cleanImages(v.images && v.images.length > 0 ? v.images : mainImages),
                        inStock: (dbProduct.quantity ?? 0) > 0,
                    }));

                    const hasDefaultAlready = variantList.some(
                        (v: any) => v.name.toLowerCase() === 'default'
                    );

                    if (!hasDefaultAlready && mainImages.length > 0) {
                        return [
                            {
                                name: "Default",
                                images: mainImages,
                                inStock: (dbProduct.quantity ?? 0) > 0,
                            },
                            ...variantList,
                        ];
                    }
                    return variantList;
                }

                if (dbProduct.variantTitle) {
                    const vImages = cleanImages(
                        dbProduct.variantImages && dbProduct.variantImages.length > 0
                            ? dbProduct.variantImages
                            : mainImages
                    );
                    return [
                        {
                            name: "Default",
                            images: mainImages,
                            inStock: (dbProduct.quantity ?? 0) > 0,
                        },
                        {
                            name: dbProduct.variantTitle.trim() || "Variant",
                            images: vImages,
                            inStock: (dbProduct.quantity ?? 0) > 0,
                        },
                    ];
                }
            }

            return [
                {
                    name: "Default",
                    images: mainImages,
                    inStock: (dbProduct.quantity ?? 0) > 0,
                },
            ];
        })(),
        isCustomizable: dbProduct.isCustomizable ?? false,
        customizations: dbProduct.customizations || [],
    } : null;

    if (loading) {
        return (
            <div className='relative bg-stone-50 w-full min-h-screen py-10 sm:py-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
                    <div className="w-full space-y-4">
                        <Skeleton className="w-full aspect-[4/5] md:aspect-square rounded-2xl" />
                        <div className="flex gap-2.5">
                            <Skeleton className="w-20 h-24 rounded-xl" />
                            <Skeleton className="w-20 h-24 rounded-xl" />
                            <Skeleton className="w-20 h-24 rounded-xl" />
                        </div>
                    </div>
                    <div className="w-full space-y-6 pt-2">
                        <Skeleton className="w-1/4 h-3.5 rounded-lg" />
                        <Skeleton className="w-3/4 h-8 rounded-xl" />
                        <Skeleton className="w-1/3 h-6 rounded-lg" />
                        <Skeleton className="w-1/2 h-5 rounded-lg" />
                        <Skeleton className="w-full h-32 rounded-2xl" />
                        <Skeleton className="w-full h-12 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className='relative bg-stone-50 w-full min-h-[60vh] py-12 text-center text-red-650 flex flex-col items-center justify-center gap-3'>
                <p className='text-xl font-medium tracking-wide'>Error Loading Product</p>
                <p className='text-sm text-stone-500 max-w-md'>{error || "Product not found."}</p>
            </div>
        );
    }

    const currentVariant = (product.variants && product.variants[selectedVariant])
        ? product.variants[selectedVariant]
        : (product.variants?.[0] || { name: 'Default', images: ['https://picsum.photos/600/500'], inStock: true });

    const handleVariantChange = (variantIndex: number) => {
        setSelectedVariant(variantIndex)
        setSelectedImage(0)
    }

    const handleThumbnailClick = (imageIndex: number) => {
        setSelectedImage(imageIndex)
    }

    const normalizedPrice = String(Number(String(product.price).replace(/[^0-9.-]/g, '')) || 0)

    const descriptionText = product.productInfo?.description || product.description || '';
    const aboutText = product.productInfo?.about?.trim() || '';
    const noteText = product.productInfo?.note?.trim() || '';

    return (
        <div className='relative bg-stone-50 w-full min-h-screen py-10 sm:py-16'>
            {/* Top Section: Gallery (Left) & Buy Box (Right) */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative'> 
                <div className='w-full lg:sticky lg:top-28 self-start'>
                    <ProductGallary images={currentVariant.images} handleThumbnailClick={handleThumbnailClick} mainImage={currentVariant.images[selectedImage]} />
                </div>
                <ProductContent 
                    id={product.id} 
                    handleVariantChange={handleVariantChange} 
                    title={product.title} 
                    price={normalizedPrice} 
                    description={product.description} 
                    productInfo={product.productInfo}
                    inStock={product.inStock} 
                    canUploadImage={product.canUploadImage} 
                    variants={product.variants} 
                    isCustomizable={product.isCustomizable} 
                    customizations={product.customizations} 
                />
            </div>

            {/* Full-Width Collapsible Product Information & Ordering Guide Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16'>
                <div className='border-t border-stone-200/80 pt-10 space-y-4'>
                    <div className='mb-6'>
                        <span className='text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-1'>
                            Specifications & Details
                        </span>
                        <h2 className='text-2xl font-serif text-stone-900 tracking-wide'>
                            Product Information
                        </h2>
                    </div>

                    <div className='space-y-3'>
                        {/* 1. Collapsible: Description */}
                        {descriptionText && (
                            <div className='border border-stone-200 rounded-3xl bg-white overflow-hidden shadow-2xs transition-all duration-200'>
                                <button
                                    type='button'
                                    onClick={() => toggleSection('description')}
                                    className='w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-stone-50/70 transition-colors cursor-pointer'
                                    aria-expanded={openSections.description}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='size-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700'>
                                            <FileText size={16} />
                                        </div>
                                        <span className='text-sm sm:text-base font-semibold text-stone-900 uppercase tracking-wider text-xs'>
                                            Description
                                        </span>
                                    </div>
                                    <div className={`p-1.5 rounded-full bg-stone-100 text-stone-600 transition-transform duration-300 ${openSections.description ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                {openSections.description && (
                                    <div className='px-6 pb-6 pt-2 text-stone-600 text-sm leading-relaxed whitespace-pre-line font-light border-t border-stone-100 animate-in fade-in duration-200'>
                                        {descriptionText}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. Collapsible: About Product */}
                        {aboutText && (
                            <div className='border border-stone-200 rounded-3xl bg-white overflow-hidden shadow-2xs transition-all duration-200'>
                                <button
                                    type='button'
                                    onClick={() => toggleSection('about')}
                                    className='w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-stone-50/70 transition-colors cursor-pointer'
                                    aria-expanded={openSections.about}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='size-8 rounded-xl bg-[#E41F66]/10 text-[#E41F66] flex items-center justify-center'>
                                            <Sparkles size={16} />
                                        </div>
                                        <span className='text-sm sm:text-base font-semibold text-stone-900 uppercase tracking-wider text-xs'>
                                            About This Product & Craftsmanship
                                        </span>
                                    </div>
                                    <div className={`p-1.5 rounded-full bg-stone-100 text-stone-600 transition-transform duration-300 ${openSections.about ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                {openSections.about && (
                                    <div className='px-6 pb-6 pt-2 text-stone-700 text-sm leading-relaxed whitespace-pre-line font-light border-t border-stone-100 animate-in fade-in duration-200'>
                                        {aboutText}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 3. Collapsible: Important Note */}
                        {noteText && (
                            <div className='border border-amber-200/90 rounded-3xl bg-amber-50/30 overflow-hidden shadow-2xs transition-all duration-200'>
                                <button
                                    type='button'
                                    onClick={() => toggleSection('note')}
                                    className='w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-amber-50/60 transition-colors cursor-pointer'
                                    aria-expanded={openSections.note}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='size-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center'>
                                            <AlertCircle size={16} />
                                        </div>
                                        <span className='text-sm sm:text-base font-semibold text-amber-950 uppercase tracking-wider text-xs'>
                                            Important Note / Guidelines
                                        </span>
                                    </div>
                                    <div className={`p-1.5 rounded-full bg-amber-100 text-amber-800 transition-transform duration-300 ${openSections.note ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                {openSections.note && (
                                    <div className='px-6 pb-6 pt-2 text-amber-950/90 text-sm leading-relaxed whitespace-pre-line font-light border-t border-amber-200/60 animate-in fade-in duration-200'>
                                        {noteText}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. Collapsible: How to Place an Order (Static in Every Product) */}
                        <div className='border border-stone-200 rounded-3xl bg-white overflow-hidden shadow-2xs transition-all duration-200'>
                            <button
                                type='button'
                                onClick={() => toggleSection('ordering')}
                                className='w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-stone-50/70 transition-colors cursor-pointer'
                                aria-expanded={openSections.ordering}
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='size-8 rounded-xl bg-stone-900 text-white flex items-center justify-center'>
                                        <HelpCircle size={16} />
                                    </div>
                                    <div>
                                        <span className='text-sm sm:text-base font-semibold text-stone-900 uppercase tracking-wider text-xs block'>
                                            How to Place an Order
                                        </span>
                                        <span className='text-[11px] text-stone-400 font-normal block sm:inline'>
                                            Design coordination, WhatsApp proofing, and dispatch workflow
                                        </span>
                                    </div>
                                </div>
                                <div className={`p-1.5 rounded-full bg-stone-100 text-stone-600 transition-transform duration-300 ${openSections.ordering ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={16} />
                                </div>
                            </button>
                            {openSections.ordering && (
                                <div className='px-6 pb-8 pt-4 border-t border-stone-100 space-y-6 animate-in fade-in duration-200'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        {ORDER_STEPS.map((stepItem) => (
                                            <div 
                                                key={stepItem.step}
                                                className='p-4.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2'
                                            >
                                                <div className='flex items-center gap-2.5'>
                                                    <span className='size-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center'>
                                                        {stepItem.step}
                                                    </span>
                                                    <span className='text-xs font-bold text-stone-900 tracking-wide'>
                                                        {stepItem.title}
                                                    </span>
                                                </div>
                                                <p className='text-xs text-stone-600 leading-relaxed font-light pl-8.5'>
                                                    {stepItem.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='p-4 rounded-2xl bg-[#E41F66]/5 border border-[#E41F66]/20 flex items-center justify-between gap-4 flex-wrap'>
                                        <p className='text-xs sm:text-sm text-stone-800 font-medium'>
                                            Make every gift, sweet box, and hamper feel extra special with a personalised tag made just for your occasion. 🎁✨
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* You Might Also Like / Similar Products */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-stone-200/60 mt-16 text-stone-950'>
                <div className='text-center mb-10'>
                    <span className='text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2'>Curated Selection</span>
                    <h2 className='font-serif text-3xl md:text-4xl text-stone-900 tracking-wide'>You Might Also Like</h2>
                </div>
                <SimilarProducts productId={product.id} />
            </div>
        </div>
    )
}

export default DetailProduct