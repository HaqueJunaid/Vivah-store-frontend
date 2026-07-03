import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { Skeleton } from '../common/Skeletons';
import type { SearchProductItem as ProductItem, SearchDropdownProps } from '../../types/allTypes';


export const SearchDropdown: React.FC<SearchDropdownProps> = ({ query, debouncedQuery, onClose }) => {
    const navigate = useNavigate();
    const [results, setResults] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            setLoading(false);
            setHasSearched(false);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setHasSearched(true);

        getProducts()
            .then((res) => {
                if (isMounted && res.data?.products) {
                    const searchLower = debouncedQuery.toLowerCase().trim();
                    const filtered = res.data.products.filter((p: ProductItem) =>
                        p.title.toLowerCase().includes(searchLower) ||
                        (p.category && p.category.toLowerCase().includes(searchLower))
                    );
                    setResults(filtered.slice(0, 6)); // Top 6 matches
                }
            })
            .catch((err) => {
                console.error("Live search error:", err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [debouncedQuery]);

    if (!query.trim()) return null;

    return (
        <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-2xl rounded-b-xl border border-stone-200 mt-2 max-h-[60vh] md:max-h-96 overflow-y-auto">
            {loading ? (
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3 animate-pulse">
                        <Skeleton className="w-12 h-12 rounded-md shrink-0" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-1/4 h-3" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 animate-pulse">
                        <Skeleton className="w-12 h-12 rounded-md shrink-0" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="w-3/4 h-4" />
                            <Skeleton className="w-1/4 h-3" />
                        </div>
                    </div>
                </div>
            ) : results.length > 0 ? (
                <div className="py-2 divide-y divide-stone-100">
                    <div className="px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase text-stone-400">
                        Matching Products
                    </div>
                    {results.map((product) => {
                        const imgUrl = product.imageUrls?.[0] || product.thumbnail || 'https://picsum.photos/200/200';
                        return (
                            <Link
                                key={product._id}
                                to={`/products/${product._id}/details`}
                                onClick={() => onClose && onClose()}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer group"
                            >
                                <img
                                    src={imgUrl}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded-md border border-stone-200 shrink-0 group-hover:scale-105 transition-transform"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-[#E41F66] transition-colors">
                                        {product.title}
                                    </h4>
                                    {product.category && (
                                        <span className="inline-block text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full capitalize">
                                            {product.category}
                                        </span>
                                    )}
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-sm font-bold text-stone-900">
                                        ₹{Number(product.price).toLocaleString()}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : hasSearched && !loading ? (
                <div className="p-6 text-center text-stone-500 text-sm">
                    No matching products found for "<span className="font-semibold text-stone-800">{debouncedQuery}</span>"
                </div>
            ) : null}
        </div>
    );
};
