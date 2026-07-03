import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../utils/useDebounce';
import { SearchDropdown } from './SearchDropdown';
import { X } from 'lucide-react';
import type { MobileSearchPopupProps } from '../../types/allTypes';

const MobileSearchPopup: React.FC<MobileSearchPopupProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      handleClose();
    }
  };

  return (
    <div className='lg:hidden z-[100] fixed inset-0' onClick={handleClose}>
      <div className='absolute h-screen inset-0 bg-black/50 backdrop-blur-xs overscroll-none overflow-hidden ' />
      <div
        className='relative z-[101] mx-auto mt-12 px-4 w-full max-w-md'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
      >
        <div className='bg-white shadow-2xl rounded-xl border border-stone-200'>
          <div className='flex justify-between items-center px-4 py-3 border-stone-200 border-b bg-stone-50 rounded-t-xl'>
            <span className='font-semibold text-stone-900 text-sm'>Search Products</span>
            <button className='text-stone-500 hover:text-stone-800 font-bold p-1' onClick={handleClose} aria-label='Close search'>
              <X className='size-5' />
            </button>
          </div>

          <div className='p-4 relative'>
            <div className='relative'>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                type='text'
                placeholder='Search Product...'
                className='px-3 py-2.5 border border-stone-300 focus:border-[#E41F66] rounded-lg outline-none w-full text-stone-800 placeholder:text-stone-400 text-sm shadow-xs'
              />

              {/* Live Debounced Dropdown for Mobile */}
              <SearchDropdown query={query} debouncedQuery={debouncedQuery} onClose={handleClose} />
            </div>

            <button
              className='bg-[#E41F66] hover:bg-[#c60b4d] transition-all ease-in-out duration-300 mt-3 px-4 py-2.5 rounded-lg w-full text-stone-50 text-sm font-medium cursor-pointer shadow-sm'
              onClick={handleSearchSubmit}
              type='button'
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchPopup;
