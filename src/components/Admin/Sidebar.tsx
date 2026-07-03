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
        <div className={`fixed ${!isOpen ? "hidden" : "block"} lg:block z-50 top-0 left-0 min-w-68 h-screen bg-stone-50 px-3 py-3 shadow-lg border-r-2 border-stone-200`}>
            <button onClick={() => (setIsOpen())} className='absolute flex lg:hidden items-center justify-center top-5 -right-5 size-10 bg-white shadow-md rounded-full'>
                <X size={20} />
            </button>
            <div className='flex items-center gap-2.5'>
                <Link to="/">
                    <img className='size-10' src="/favicon.svg" alt="Logo" />
                </Link>
                <h2 className="text-2xl leading-none -mt-1 font-semibold">Admin Panel</h2>
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