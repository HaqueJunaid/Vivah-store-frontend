import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useCategoryStore } from '../../store/categoryStore';

const Navbar: React.FC = () => {
  const categories = useCategoryStore((state) => state.categories);
  const location = useLocation();
  const [activeCategoryUrl, setActiveCategoryUrl] = useState<string | null>(null);

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full bg-stone-50 border-b border-stone-200/80 sticky top-0 z-40">
      <div className="hidden lg:block relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-6 py-2.5 font-medium text-[14.5px] text-stone-700">
          {/* Home */}
          <Link
            to="/"
            className={`transition-colors duration-200 hover:text-[#E41F66] ${
              isActiveRoute('/') && location.pathname === '/' ? 'text-[#E41F66] font-semibold' : ''
            }`}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="group relative"
            onMouseLeave={() => setActiveCategoryUrl(null)}
          >
            <Link
              to="/products"
              className={`flex items-center gap-1 transition-colors duration-200 group-hover:text-[#E41F66] ${
                isActiveRoute('/products') ? 'text-[#E41F66] font-semibold' : ''
              }`}
            >
              <span>Products</span>
              <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#E41F66]" />
            </Link>

            {/* Level 1 Dropdown */}
            <div className="hidden group-hover:block absolute left-0 top-full pt-1.5 w-60 z-50">
              <div className="bg-white rounded-xl shadow-xl shadow-stone-900/10 border border-stone-200/80 py-1.5 overflow-visible">
                {categories.map((cat) => {
                  const hasSub = cat.baseItems && cat.baseItems.length > 0;
                  const isHovered = activeCategoryUrl === cat.url;

                  return (
                    <div
                      key={cat.url}
                      className="relative group/cat px-1.5"
                      onMouseEnter={() => setActiveCategoryUrl(cat.url)}
                    >
                      <Link
                        to={`/products/${cat.url}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                          isHovered
                            ? 'bg-rose-50/70 text-[#E41F66] font-medium'
                            : 'text-stone-700 hover:bg-rose-50/70 hover:text-[#E41F66]'
                        }`}
                      >
                        <span className="truncate">{cat.title}</span>
                        {hasSub && (
                          <ChevronRight
                            className={`size-3.5 shrink-0 ml-2 transition-colors ${
                              isHovered ? 'text-[#E41F66]' : 'text-stone-400 group-hover/cat:text-[#E41F66]'
                            }`}
                          />
                        )}
                      </Link>

                      {/* Level 2 Sub-Dropdown */}
                      {hasSub && isHovered && (
                        <div
                          className="absolute left-full top-0 -ml-0.5 pl-1 w-60 z-50"
                          onMouseEnter={() => setActiveCategoryUrl(cat.url)}
                        >
                          <div className="bg-white rounded-xl shadow-xl shadow-stone-900/10 border border-stone-200/80 py-1.5 max-h-[380px] overflow-y-auto">
                            {cat.baseItems?.map((subItem) => (
                              <div key={subItem.url} className="px-1.5">
                                <Link
                                  to={`/products/${subItem.url}`}
                                  className="block px-3 py-2 rounded-lg text-[13px] text-stone-600 hover:text-[#E41F66] hover:bg-rose-50/70 transition-colors truncate"
                                >
                                  {subItem.title}
                                </Link>
                              </div>
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

          {/* FAQs */}
          <Link
            to="/faqs"
            className={`transition-colors duration-200 hover:text-[#E41F66] ${
              isActiveRoute('/faqs') ? 'text-[#E41F66] font-semibold' : ''
            }`}
          >
            FAQs
          </Link>

          {/* About Us */}
          <Link
            to="/about-us"
            className={`transition-colors duration-200 hover:text-[#E41F66] ${
              isActiveRoute('/about-us') ? 'text-[#E41F66] font-semibold' : ''
            }`}
          >
            About Us
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact-us"
            className={`transition-colors duration-200 hover:text-[#E41F66] ${
              isActiveRoute('/contact-us') ? 'text-[#E41F66] font-semibold' : ''
            }`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;