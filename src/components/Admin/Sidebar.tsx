import { Link, useLocation } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import { Gauge, PackageSearch, ShoppingCart, Users, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: () => void }) => {
    const adminLinks = [
        {
            label: "Dashboard",
            link: "/admin/dashboard",
            icon: <Gauge />
        },
        {
            label: "Orders",
            link: "/admin/orders",
            icon: <ShoppingCart />
        },
        {
            label: "Products",
            link: "/admin/products",
            icon: <PackageSearch />
        },
        {
            label: "Users",
            link: "/admin/users",
            icon: <Users />
        },
        {
            label: "Insights",
            link: "/admin/insights",
            icon: <FaChartLine />
        }
    ]

    const { pathname } = useLocation();

    return (
        <div className={`fixed ${!isOpen ? "hidden" : "block"} lg:block z-50 top-0 left-0 w-68 max-w-[85vw] h-screen bg-stone-50 px-4 py-4 shadow-xl border-r border-stone-200 overflow-y-auto`}>
            <div className='flex items-center justify-between gap-2.5 pb-2 border-b border-stone-200/60 lg:border-none'>
                <div className='flex items-center gap-2.5'>
                    <Link to="/">
                        <img className='size-9' src="/favicon.svg" alt="Logo" />
                    </Link>
                    <h2 className="text-xl leading-none font-semibold text-stone-900">Admin Panel</h2>
                </div>
                <button 
                    onClick={setIsOpen} 
                    className='flex lg:hidden items-center justify-center size-8 text-stone-600 hover:text-stone-900 bg-stone-200/60 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer'
                    aria-label="Close Sidebar"
                >
                    <X size={18} />
                </button>
            </div>
            <div className="mt-5">
                {adminLinks.map((item, index) => (
                    <Link onClick={setIsOpen} to={item.link} key={index} className={`rounded-lg flex items-center  gap-2 px-3 py-3 mb-2 text-lg font-medium transition ${pathname === item.link ? 'bg-[#E41F66] text-stone-50 hover:bg-[#E41F66]/80 ' : 'text-stone-700 hover:bg-[#E41F66]/10'}`}>
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar