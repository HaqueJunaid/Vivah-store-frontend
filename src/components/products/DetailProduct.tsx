import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGallary from './ProductGallary.tsx'
import ProductContent from './ProductContent.tsx'
import SimilarProducts from './SimilarProducts.tsx'
import { Skeleton } from '../common/Skeletons'
import { getProductById } from '../../services/productService'

const DetailProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dbProduct, setDbProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)

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

    const currentVariant = product.variants[selectedVariant];

    const handleVariantChange = (variantIndex: number) => {
        setSelectedVariant(variantIndex)
        setSelectedImage(0)
    }

    const handleThumbnailClick = (imageIndex: number) => {
        setSelectedImage(imageIndex)
    }

    const normalizedPrice = String(Number(String(product.price).replace(/[^0-9.-]/g, '')) || 0)

    return (
        <div className='relative bg-stone-50 w-full min-h-screen py-10 sm:py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'> 
                <ProductGallary images={currentVariant.images} handleThumbnailClick={handleThumbnailClick} mainImage={currentVariant.images[selectedImage]} />
                {/* @ts-ignore */}
                <ProductContent id={product.id} handleVariantChange={handleVariantChange} title={product.title} price={normalizedPrice} description={product.description} inStock={product.inStock} canUploadImage={product.canUploadImage} variants={product.variants} isCustomizable={product.isCustomizable} customizations={product.customizations} />
            </div>
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