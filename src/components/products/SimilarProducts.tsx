import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { getSimilarProducts } from '../../services/productService';
import { ProductCardSkeleton } from '../common/Skeletons';

interface SimilarProductsProps {
    productId?: string;
}

export default function SimilarProducts({ productId }: SimilarProductsProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        getSimilarProducts(productId)
            .then((res) => {
                if (res.data.success && Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                console.error("Failed to load similar products:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <ProductCardSkeleton key={idx} />
                ))}
            </div>
        );
    }

    if (!loading && products.length === 0) {
        return null; // Don't render "You Might Also Like" section if no similar products
    }

    return (
        <div className="w-full relative px-2">
            {/* Custom Premium Swiper Overrides */}
            <style>{`
                .swiper-container-similar {
                    position: relative;
                    padding: 4px 6px;
                }
                .swiper-container-similar .swiper-button-prev,
                .swiper-container-similar .swiper-button-next {
                    background-color: rgba(255, 255, 255, 0.96) !important;
                    border: 1px solid #E4E4E7 !important;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 9999px !important;
                    color: #18181B !important;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.06) !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                }
                .swiper-container-similar .swiper-button-prev::after,
                .swiper-container-similar .swiper-button-next::after {
                    font-size: 13px !important;
                    font-weight: 900 !important;
                }
                .swiper-container-similar .swiper-button-prev:hover,
                .swiper-container-similar .swiper-button-next:hover {
                    background-color: #E41F66 !important;
                    border-color: #E41F66 !important;
                    color: #FFFFFF !important;
                    box-shadow: 0 8px 24px rgba(228, 31, 102, 0.35) !important;
                }
                .swiper-container-similar .swiper-button-prev {
                    left: -14px !important;
                }
                .swiper-container-similar .swiper-button-next {
                    right: -14px !important;
                }
                @media (max-width: 767px) {
                    .swiper-container-similar .swiper-button-prev,
                    .swiper-container-similar .swiper-button-next {
                        display: none !important;
                    }
                }
            `}</style>

            <Swiper
                slidesPerView={2}
                spaceBetween={16}
                className="mySwiper swiper-container-similar"
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 28,
                    },
                }}
            >
                {products.map((item) => (
                    <SwiperSlide key={item._id} className="pb-4">
                        <ProductCard
                            id={item._id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrls?.[0] || ''}
                            inStock={item.quantity > 0}
                            layout="grid-4"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
