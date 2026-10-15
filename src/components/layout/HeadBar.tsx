import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { CgMenuRight } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';
import UserDropdown from './UserDropdown';
import type { HeadBarProps } from '../../types/allTypes';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useDebounce } from '../../utils/useDebounce';
import { SearchDropdown } from './SearchDropdown';

const HeadBar: React.FC<HeadBarProps> = ({ onMenuClick, onSearchClick }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartLength = useCartStore((state) => state.getCartItemsLength());
  const wishlistLength = useWishlistStore((state) => state.getWishlistItemsLength());

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = () => {
    if (query.trim().length) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="relative bg-stone-50 border-b border-stone-200/80 w-full">
      <div className="relative flex justify-between items-center mx-auto w-full max-w-7xl h-fit px-4 sm:px-6 lg:px-8 py-4 sm:py-4.5 lg:py-6.5">
        {/* Brand Logo */}
        <Link to="/" className="shrink-0 transition-transform duration-200 hover:opacity-95">
          <img className="w-32 lg:w-52 h-auto object-contain" src="/Assets/Logo.svg" alt="Vivah Store" />
        </Link>

        {/* Desktop Modern Search Bar */}
        <div ref={searchContainerRef} className="hidden lg:flex relative items-center">
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full pl-3.5 pr-1.5 py-1 w-80 lg:w-[400px] xl:w-[460px] shadow-xs focus-within:border-[#E41F66] focus-within:ring-2 focus-within:ring-[#E41F66]/10 transition-all duration-200">
            <IoSearch className="text-stone-400 size-4.5 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit();
              }}
              type="text"
              placeholder="Search wedding stationery, invites, decor..."
              className="border-none outline-none w-full font-normal text-xs lg:text-sm text-stone-800 placeholder:text-stone-400 bg-transparent"
            />
            {query.trim().length > 0 && (
              <button
                onClick={() => setQuery('')}
                className="text-stone-400 hover:text-stone-600 p-0.5 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <IoClose className="size-4" />
              </button>
            )}
            <button
              onClick={handleSearchSubmit}
              className="bg-[#E41F66] hover:bg-[#c60b4d] text-white px-3.5 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-150 cursor-pointer shadow-xs shrink-0"
            >
              Search
            </button>
          </div>

          {/* Real-Time Live Dropdown */}
          <SearchDropdown query={query} debouncedQuery={debouncedQuery} onClose={() => setQuery('')} />
        </div>

        {/* Right Action Icons (Wishlist, Cart, Profile, Mobile Menu) */}
        <div className="flex items-center gap-1">
          {/* Mobile Search Button */}
          <button
            onClick={onSearchClick}
            className="lg:hidden p-2 rounded-full text-stone-700 hover:text-[#E41F66] hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Open search"
          >
            <IoSearch className="size-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 sm:p-2.5 rounded-full text-stone-700 hover:text-[#E41F66] hover:bg-stone-200/50 transition-colors"
            aria-label="Wishlist"
          >
            <FaRegHeart className="size-4.5 sm:size-5" />
            {wishlistLength > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-4.25 h-4.25 px-1 bg-[#E41F66] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center ring-2 ring-stone-50 shadow-xs leading-none">
                {wishlistLength}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 sm:p-2.5 rounded-full text-stone-700 hover:text-[#E41F66] hover:bg-stone-200/50 transition-colors"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart className="size-4.5 sm:size-5" />
            {cartLength > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 bg-[#E41F66] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center ring-2 ring-stone-50 shadow-xs leading-none">
                {cartLength}
              </span>
            )}
          </Link>

          {/* User Profile Dropdown (Desktop) */}
          <UserDropdown />

          {/* Mobile Drawer Trigger */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-full text-stone-700 hover:text-[#E41F66] hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <CgMenuRight className="size-5.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadBar;