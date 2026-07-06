import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductFilter from '../products/ProductFilter.tsx'
import SortBy from '../products/SortBy.tsx'
import LayoutChanger from '../products/LayoutChanger.tsx'
import ProductGrid from '../products/ProductGrid.tsx'
import ProductCard from '../products/ProductCard.tsx'
import { ProductCardSkeleton } from '../common/Skeletons'
import { useProductStore } from '../../store/productStore'
import { navigationDropdown } from '../../constants/navigation'
import type {LayoutChangerMode as LayoutMode} from '../../types/allTypes'

const ProductLayout: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'default');
  const [layout, setLayout] = useState<LayoutMode>('grid-3');
  const [page, setPage] = useState(1);

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchProductsByCategory = useProductStore((state) => state.fetchProductsByCategory);
  const products = useProductStore((state) => state.products);
  const total = useProductStore((state) => state.total);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  const searchKeyword = useMemo(() => {
    const fromQuery = searchParams.get('search');
    return fromQuery ? fromQuery.trim() : '';
  }, [searchParams]);

  const categoryId = useMemo(() => {
    if (id && id !== 'all') {
      return id;
    }
    return '';
  }, [id]);

  const categoryTitle = useMemo(() => {
    if (!categoryId) return '';
    for (const item of navigationDropdown) {
      if (item.url === categoryId) return item.title;
      if (item.baseItems) {
        const sub = item.baseItems.find((b) => b.url === categoryId);
        if (sub) return sub.title;
      }
    }
    return decodeURIComponent(categoryId).replace(/-/g, ' ');
  }, [categoryId]);

  useEffect(() => {
    document.title = searchKeyword 
      ? `VivahStore | Search: ${searchKeyword}` 
      : categoryTitle
      ? `VivahStore | ${categoryTitle}`
      : 'VivahStore | Products';
  }, [searchKeyword, categoryTitle]);

  useEffect(() => {
    setSort(searchParams.get('sort') || 'default');
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts(1, 12, false);
    }
  }, [categoryId, fetchProducts, fetchProductsByCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, 12, true);
  };

  const hasMore = !categoryId && products.length < total;

  const productData = useMemo(() => {
    return products.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      imageUrl: product.imageUrls?.[0] || product.thumbnail || 'https://picsum.photos/600/500',
      inStock: (product.quantity ?? 0) > 0,
      date: product.createdAt || new Date().toISOString(),
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...productData];

    // Filter by search keyword if present
    if (searchKeyword) {
      const term = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          (p.category && p.category.toLowerCase().includes(term)) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(term))
      );
    }

    const priceLte = searchParams.get('price_lte');
    const inStock = searchParams.get('inStock');

    if (priceLte) {
      filtered = filtered.filter((p) => p.price <= Number(priceLte));
    }

    if (inStock === 'true') {
      filtered = filtered.filter((p) => p.inStock);
    }

    if (sort) {
      switch (sort) {
        case 'default':
          break;
        case 'best-selling':
          break;
        case 'alpha-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'alpha-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'date-asc':
          filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'date-desc':
          filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
      }
    }

    return filtered;
  }, [productData, searchKeyword, searchParams, sort]);

  const titleText = useMemo(() => {
    if (searchKeyword) {
      return `Search Results for "${searchKeyword}"`;
    }
    if (categoryTitle) {
      return categoryTitle;
    }
    return 'All Products';
  }, [searchKeyword, categoryTitle]);

  return (
    <div className='relative bg-stone-50 border-stone-200 border-b w-full'>
      <div className='relative flex lg:flex-row flex-col gap-3 lg:gap-7 mx-auto w-full max-w-7xl h-fit px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
        <ProductFilter />
        <div className='bg-stone-50 px-2 py-5 w-full text-stone-800'>
          <div className='flex md:flex-row flex-col md:justify-between items-start gap-4'>
            <div>
              <h2 className='font-semibold text-2xl md:text-3xl capitalize'>
                {titleText}
              </h2>
              {searchKeyword && (
                <p className="text-sm text-stone-500 mt-1">
                  Found {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
                </p>
              )}
            </div>
            <div className='md:hidden inline'>
              <SortBy sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className='hidden md:flex md:flex-row flex-col md:justify-between md:items-center gap-3 mt-4'>
            <SortBy sort={sort} setSort={setSort} />
            <div className='flex justify-between items-center gap-4'>
              <LayoutChanger layout={layout} setLayout={setLayout} />
            </div>
          </div>

          {error ? (
            <p className='text-center text-red-600 mt-6'>{error}</p>
          ) : products.length === 0 && loading ? (
            <ProductGrid layout={layout}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </ProductGrid>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 mt-6 p-8">
              <h3 className="text-xl font-bold text-stone-800 mb-2">No Products Found</h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                We couldn't find any products matching your search criteria. Try searching with a different keyword or browse all collections.
              </p>
            </div>
          ) : (
            <>
              <ProductGrid layout={layout}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    layout={layout}
                    title={product.title}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    inStock={product.inStock}
                  />
                ))}
              </ProductGrid>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12 mb-6">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#E41F66] to-pink-600 hover:from-pink-600 hover:to-[#E41F66] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-w-[200px]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      'Load More Products'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;