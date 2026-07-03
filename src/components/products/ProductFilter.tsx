import React, { useState, useEffect } from 'react'
import PriceRangeSlider from './PriceRangeSlider.tsx'
import { CiFilter } from "react-icons/ci";
import { X } from "lucide-react";
import { useSearchParams } from 'react-router-dom';

const ProductFilterSideBar: React.FC = () => {
    const [open, setOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true')
    const [price, setPrice] = useState(23200)

    // Sync state when URL params change (e.g. on clear)
    useEffect(() => {
        setInStock(searchParams.get('inStock') === 'true');
        const priceParam = searchParams.get('price_lte');
        setPrice(priceParam ? parseInt(priceParam, 10) : 23200);
    }, [searchParams]);

    const handlePriceChange = (nextValue: number) => {
        setPrice(nextValue)
        searchParams.set('price_lte', nextValue.toString());
        setSearchParams(searchParams, { replace: true })
    }

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setInStock(isChecked);
        if (isChecked) {
            searchParams.set('inStock', 'true');
        } else {
            searchParams.delete('inStock');
        }
        setSearchParams(searchParams, { replace: true });
    }

    const handleClearFilters = () => {
        searchParams.delete('inStock');
        searchParams.delete('price_lte');
        setSearchParams(searchParams, { replace: true });
        setInStock(false);
        setPrice(23200);
    };

    const isFilterActive = searchParams.has('inStock') || searchParams.has('price_lte');

    return (
        <div className='relative w-full lg:w-64'>
            {/* Premium Mobile/Tablet Trigger & Clear Bar (Visible below lg) */}
            <div className='lg:hidden w-full mb-2'>
                {isFilterActive ? (
                    <div className="flex gap-2.5 w-full">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="flex-grow flex items-center justify-center gap-2 border border-stone-200 bg-white hover:bg-stone-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-850 shadow-xs transition duration-200 cursor-pointer"
                        >
                            <CiFilter className="size-4.5 text-stone-800" />
                            <span>Filter</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="flex-grow flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-rose-700 transition duration-200 cursor-pointer"
                        >
                            <X className="size-4 text-rose-700" />
                            <span>Clear Filters</span>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2.5 border border-stone-200 bg-white hover:bg-stone-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-850 shadow-xs transition duration-200 cursor-pointer w-full"
                    >
                        <CiFilter className="size-4.5 text-stone-800" />
                        <span>Filter Products</span>
                    </button>
                )}
            </div>

            {/* Mobile/Tablet Slide-over Drawer (Visible below lg) */}
            <div 
                className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop Overlay */}
                <div 
                    className="absolute inset-0 bg-black/45 backdrop-blur-xs" 
                    onClick={() => setOpen(false)} 
                />
                
                {/* Drawer Panel */}
                <div 
                    className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-stone-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center px-5 py-4.5 border-b border-stone-200 bg-white">
                        <span className="font-bold text-stone-900 text-sm tracking-widest uppercase">Filters</span>
                        <button
                            type="button"
                            className="text-stone-500 hover:text-stone-900 p-1 cursor-pointer transition"
                            onClick={() => setOpen(false)}
                            aria-label="Close filters"
                        >
                            <X className="size-4.5" />
                        </button>
                    </div>

                    {/* Drawer Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto px-5 py-2 text-stone-800">
                        {/* Availability Option */}
                        <div className="py-5 border-b border-stone-200">
                            <h3 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-4">Availability</h3>
                            <div>
                                <label className="inline-flex relative items-center gap-3 text-stone-850 cursor-pointer select-none">
                                    <input type="checkbox" className="sr-only peer" checked={inStock} onChange={handleStockChange} />
                                    <div className={`peer ${inStock ? 'bg-[#E41F66]' : 'bg-stone-300'} rounded-full w-10 h-6 transition-colors duration-200`}></div>
                                    <span className="top-1 left-1 absolute bg-white rounded-full w-4 h-4 transition-transform peer-checked:translate-x-4 duration-200 ease-in-out"></span>
                                    <span className="text-sm font-medium">In Stock Only</span>
                                </label>
                            </div>
                        </div>

                        {/* Price Range Option */}
                        <div className="py-5 border-b border-stone-200">
                            <h3 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-4">Price Range</h3>
                            <PriceRangeSlider
                                max={23200}
                                step={100}
                                value={price}
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 bg-white border-t border-stone-200">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-full py-3.5 bg-stone-900 text-stone-50 hover:bg-[#E41F66] transition-all duration-300 font-bold text-xs tracking-widest uppercase text-center cursor-pointer active:scale-98 shadow-sm"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Sticky Sidebar (Visible lg and above) */}
            <div className="hidden lg:block top-45 sticky bg-stone-50 h-fit text-stone-800 w-full self-start">
                {isFilterActive && (
                    <div className="pb-4 border-b border-stone-200 mb-4">
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="w-full flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider text-rose-700 transition cursor-pointer"
                        >
                            <X className="size-3.5 text-rose-700" />
                            <span>Clear All Filters</span>
                        </button>
                    </div>
                )}

                <div className='py-5 border-stone-200 border-b pt-0'>
                    <h2 className='font-semibold text-sm uppercase tracking-wider text-stone-900'>Availability</h2>
                    <div className="mt-3">
                        <label className="inline-flex relative items-center gap-3 text-stone-850 cursor-pointer select-none">
                            <input type="checkbox" className="sr-only peer" checked={inStock} onChange={handleStockChange} />
                            <div className={`peer ${inStock ? 'bg-[#E41F66]' : 'bg-stone-300'} rounded-full w-10 h-6 transition-colors duration-200`}></div>
                            <span className="top-1 left-1 absolute bg-white rounded-full w-4 h-4 transition-transform peer-checked:translate-x-4 duration-200 ease-in-out"></span>
                            <span className="text-sm font-medium">In Stock</span>
                        </label>
                    </div>
                </div>
                <div className='py-5 border-stone-200 border-b'>
                    <h2 className='font-semibold text-sm uppercase tracking-wider text-stone-900'>Price</h2>
                    <div className="mt-3">
                        <PriceRangeSlider
                            max={23200}
                            step={100}
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductFilterSideBar