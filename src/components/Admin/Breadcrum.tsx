import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../auth/LogOutButton';
import { Menu } from 'lucide-react';

const PATH_LABELS: Record<string, string> = {
    admin: 'Admin',
    dashboard: 'Dashboard',
    products: 'Products',
    add: 'Add Product',
    new: 'New Product',
    orders: 'Orders',
    users: 'Users',
    insights: 'Insights',
};

const formatSegment = (segment: string) => {
    return PATH_LABELS[segment] ||
        segment
            .replace(/-/g, ' ')
            .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
};

const BreadcrumbSeparator = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.784 15.68 11.46 4.13h1.75L8.534 15.68z" fill="#CBD5E1" />
    </svg>
);

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
        <div className="w-full py-2.5 sm:py-3 px-3 sm:px-5 border-b border-stone-200 bg-white/80 backdrop-blur-xs flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto no-scrollbar py-0.5 min-w-0">
                <Link to="/" aria-label="Admin Home" className="inline-flex items-center shrink-0 hover:text-stone-900 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                        <path d="M18.333 10.17v1.267c0 3.251 0 4.876-.977 5.886-.976 1.01-2.547 1.01-5.69 1.01H8.333c-3.143 0-4.714 0-5.69-1.01-.977-1.01-.977-2.635-.977-5.886V10.17c0-1.907 0-2.86.433-3.651.432-.79 1.223-1.281 2.804-2.262l1.666-1.035C8.241 2.185 9.076 1.667 10 1.667s1.76.518 3.43 1.555l1.667 1.035c1.58.98 2.371 1.471 2.804 2.262M12.5 15h-5" stroke="#6B7280" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </Link>

                {crumbs.map((crumb, index) => (
                    <span key={crumb.to} className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                        <BreadcrumbSeparator />
                        {index < crumbs.length - 1 ? (
                            <Link to={crumb.to} className="hover:text-stone-900 transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-[#E41F66] font-semibold">{crumb.label}</span>
                        )}
                    </span>
                ))}
            </div>
            <div className="hidden md:block shrink-0">
                <LogOutButton />
            </div>
            <button 
                className="lg:hidden flex items-center justify-center p-1.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors shrink-0 cursor-pointer" 
                onClick={setIsOpen}
                aria-label="Toggle Admin Navigation"
            >
                <Menu size={22} />
            </button>
        </div>
    );
};

export default Breadcrum;