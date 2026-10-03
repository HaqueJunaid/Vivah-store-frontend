import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../auth/LogOutButton';
import { Menu, Home, ChevronRight } from 'lucide-react';

const PATH_LABELS: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  products: 'Products',
  add: 'Add Product',
  new: 'New Product',
  edit: 'Edit Product',
  orders: 'Orders',
  users: 'Users',
  insights: 'Insights',
};

const formatSegment = (segment: string) => {
  return PATH_LABELS[segment.toLowerCase()] ||
    segment
      .replace(/-/g, ' ')
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
};

const Breadcrum = ({ setIsOpen }: { setIsOpen: () => void }) => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const to = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      label: formatSegment(segment),
      to,
    };
  });

  return (
    <header className="sticky top-0 z-30 w-full py-3 px-4 sm:px-6 border-b border-stone-200/80 bg-white/90 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xs">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 font-medium overflow-x-auto no-scrollbar py-0.5 min-w-0">
        <Link
          to="/admin/dashboard"
          aria-label="Admin Dashboard"
          className="inline-flex items-center gap-1 shrink-0 text-stone-400 hover:text-stone-900 transition-colors p-1 rounded-lg hover:bg-stone-100"
        >
          <Home size={16} />
        </Link>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <div key={crumb.to} className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <ChevronRight size={14} className="text-stone-300 shrink-0" />
              {isLast ? (
                <span className="text-[#E41F66] font-bold bg-[#E41F66]/10 px-2 py-0.5 rounded-md border border-[#E41F66]/20">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="hover:text-stone-900 transition-colors px-1.5 py-0.5 rounded-md hover:bg-stone-100"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden sm:block">
          <LogOutButton />
        </div>
        <button 
          className="lg:hidden flex items-center justify-center size-9 text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer shadow-2xs" 
          onClick={setIsOpen}
          aria-label="Toggle Admin Navigation"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

export default Breadcrum;