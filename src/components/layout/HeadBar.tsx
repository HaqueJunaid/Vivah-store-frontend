import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";
import UserDropdown from './UserDropdown';
import type { HeadBarProps } from "../../types/allTypes";
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useDebounce } from '../../utils/useDebounce';
import { SearchDropdown } from './SearchDropdown';

const HeadBar: React.FC<HeadBarProps> = ({ onMenuClick, onSearchClick }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartLength = useCartStore((state: any) => state.getCartItemsLength());
  const wishlistLength = useWishlistStore((state: any) => state.getWishlistItemsLength());

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
    } else {
      alert('Please enter a search query');
    }
  };

  return (
    <div className='relative bg-stone-50 border-stone-200 border-b w-full'>
      <div className='relative flex justify-between items-center mx-auto w-full max-w-7xl h-fit px-4 sm:px-6 lg:px-8 py-4 lg:py-7'>
        <Link to="/">
          <img className='w-32 sm:w-40 lg:w-50' src="/Assets/Logo.svg" alt="Logo" />
        </Link>

        {/* Desktop Search Bar with Live Debounced Dropdown */}
        <div ref={searchContainerRef} className='hidden lg:flex relative justify-center items-center gap-2'>
          <div className='flex justify-center items-center gap-2 bg-white px-2 py-1 border border-stone-300 rounded-sm relative w-96'>
            <IoSearch className='fill-stone-800 size-5 shrink-0' />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit();
              }}
              type='text'
              placeholder='Search Product...'
              className='border-none outline-none w-full font-normal text-md text-stone-800 placeholder:text-stone-400'
            />
          </div>

          <button
            onClick={handleSearchSubmit}
            className='bg-[#E41F66] hover:bg-[#c60b4d] px-4 py-1.5 rounded-sm text-normal text-stone-50 active:scale-95 transition-all duration-300 cursor-pointer easeInOut font-medium text-sm'
          >
            Search
          </button>

          {/* Real-Time Live Dropdown */}
          <SearchDropdown query={query} debouncedQuery={debouncedQuery} onClose={() => setQuery('')} />
        </div>

        <div className='flex justify-center items-center gap-1.5 sm:gap-2.5'>
          <button onClick={onSearchClick} aria-label='Open search'>
            <IoSearch className='lg:hidden block size-6' />
          </button>
          <Link to="/wishlist" className='relative' aria-label='Wishlist count'>
            <span className='-top-1 -right-1 absolute bg-[#E41F66] px-1 rounded-full text-[9px] text-stone-50'>{wishlistLength}</span>
            <FaRegHeart className='size-5 cursor-pointer' />
          </Link>
          <Link to="/cart" className='relative'>
            <span className='-top-1 -right-1 absolute bg-[#E41F66] px-1 rounded-full text-[9px] text-stone-50'>{cartLength}</span>
            <FiShoppingCart className='size-5 cursor-pointer' />
          </Link>
          <UserDropdown />
          <button onClick={onMenuClick} aria-label='Open menu'>
            <CgMenuRight className='lg:hidden block size-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadBar;