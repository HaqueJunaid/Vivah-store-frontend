import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../layout/Topbar'
import HeadBar from './HeadBar'
import MobileSearchPopup from './MobileSearchPopup'
import Navbar from './Navbar'
import { LuUserRound } from "react-icons/lu";
import { HiLogin } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ShieldCheck } from "lucide-react";
import { navigationDropdown } from '../../constants/navigation';
import { useAuthStore } from '../../store/authStore';
import LogOutButton from '../auth/LogOutButton';


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isShopWeddingOpen, setIsShopWeddingOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const userAvatar = user?.provider === 'google' && user.avatar ? user.avatar : null;
  const isAdmin = role === 'admin' || user?.role === 'admin';

  const toggleCategory = (url: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [url]: !prev[url]
    }))
  }

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobileMenuOpen])

  return (
    <header className="z-10 relative w-full">
      <Topbar />
      <HeadBar onMenuClick={() => setIsMobileMenuOpen(true)} onSearchClick={() => setIsMobileSearchOpen(true)} />
      <Navbar />

      <MobileSearchPopup open={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} />


      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className='absolute w-full h-screen inset-0 bg-black/40' />
        <aside
          className={`absolute top-0 right-0 h-screen w-4/5 max-w-xs bg-stone-50 shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
        >
          <div className='flex justify-between items-center px-4 py-4 border-stone-200 border-b'>
            <span className='font-semibold text-stone-900 text-sm'>Menu</span>
            <button
              className='text-stone-700'
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label='Close menu'
            >
              ✕
            </button>
          </div>

          <nav className='flex flex-col px-4 py-3 text-stone-800 text-sm z-110'>
            <Link className='py-3 border-stone-100 border-b' to='/' onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <div className="border-stone-100 border-b py-3 flex flex-col">
              <button
                className="flex justify-between items-center w-full text-stone-800 text-left font-normal cursor-pointer select-none"
                onClick={() => setIsShopWeddingOpen(!isShopWeddingOpen)}
              >
                <span>Shop Wedding</span>
                <IoIosArrowDown className={`size-4 text-stone-500 transition-transform duration-300 ${isShopWeddingOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${isShopWeddingOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                <div className="overflow-hidden flex flex-col pl-4 gap-1">
                  {navigationDropdown.map((item) => {
                    const hasSubItems = item.baseItems && item.baseItems.length > 0;
                    const isCatOpen = openCategories[item.url] || false;

                    return (
                      <div key={item.url} className="flex flex-col py-1.5 border-b border-stone-100/50 last:border-b-0">
                        <div className="flex justify-between items-center w-full">
                          <Link
                            to={`/products/${item.url}`}
                            className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                          {hasSubItems && (
                            <button
                              className="p-1 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(item.url);
                              }}
                              aria-label={`Toggle ${item.title} sub-menu`}
                            >
                              <IoIosArrowDown className={`size-3.5 text-stone-400 transition-transform duration-200 ${isCatOpen ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>

                        {hasSubItems && (
                          <div className={`grid transition-all duration-200 ease-in-out ${isCatOpen ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                            <div className="overflow-hidden flex flex-col pl-3.5 gap-2 border-l border-stone-200">
                              {item.baseItems?.map((baseItem) => (
                                <Link
                                  key={baseItem.url}
                                  to={`/products/${baseItem.url}`}
                                  className="text-stone-500 hover:text-stone-800 text-xs py-0.5 transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {baseItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link className='py-3 border-stone-100 border-b' to='/faqs' onClick={() => setIsMobileMenuOpen(false)}>
              FAQs
            </Link>
            <Link className='py-3 border-stone-100 border-b' to='/about-us' onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link className='py-3' to='/contact-us' onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </nav>
          <div className='bottom-0 left-0 z-110 absolute flex justify-between items-center px-4.5 py-4 bg-stone-50 border-stone-300 border-t w-full text-stone-800'>
            <Link to={`/profile`} onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-stone-200/80 border-2 border-stone-300 rounded-full size-10 overflow-hidden'>
                {userAvatar ? (
                  <img src={userAvatar} alt={user?.name || 'User'} className='w-10 h-10 object-cover' />
                ) : (
                  <LuUserRound className='size-6' />
                )}
              </div>
              <h2 className='font-noraml text-lg'>Profile</h2>
            </Link>
            <IoIosArrowUp className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} onClick={() => { setIsOpen(!isOpen) }} />
          </div>
          {/* Profile dropdown, always overlays above menu and is fully visible */}
          <div className={`w-full px-3 max-w-xs bg-stone-50 absolute left-0 transition-all duration-300 z-50 ${isOpen ? 'bottom-21 opacity-100 pointer-events-auto' : 'bottom-0 opacity-0 pointer-events-none'}`} style={{ boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.10)' : 'none' }}>
            {token ?
              <>
                {isAdmin && (
                  <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
                    <Link to={`/admin/dashboard`} onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2 px-2 py-0.5 rounded-sm cursor-pointer font-medium text-stone-800'>
                      <div className='flex justify-center items-center bg-rose-100 border-2 border-rose-300 rounded-full size-8'>
                        <ShieldCheck className='size-5 text-[#E41F66]' />
                      </div>
                      Admin Panel
                    </Link>
                  </div>
                )}
                <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
                  <Link to={`/profile`} className='flex items-center gap-2 px-2 py-0.5 rounded-sm cursor-pointer'>
                    <div className='flex justify-center items-center bg-stone-200/80 border-2 border-stone-300 rounded-full size-8'>
                      <LuUserRound className='size-5' />
                    </div>
                    Profile
                  </Link>
                </div>
                <div className='block z-100 relative mb-1 p-2 py-3 w-full'>
                  <LogOutButton />
                </div>
              </>
             : (
              <>
                <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
                  <Link to={`/register`} className='flex items-center gap-1 px-2 py-0.5 rounded-sm cursor-pointer'>
                    <FiUserPlus className="size-5" /> Sign Up
                  </Link>
                </div>
                <div className='block z-100 relative hover:bg-stone-50 mb-1 p-2 py-3 border border-stone-300 rounded-md w-full text-sm text-nowrap'>
                  <Link to={`/login`} className='flex items-center gap-1 px-2 py-0.5 rounded-sm cursor-pointer'>
                    <HiLogin className="size-5 rotate-180" /> Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header
