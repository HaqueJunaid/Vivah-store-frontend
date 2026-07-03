import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { navigationDropdown } from '../../constants/navigation';

const Navbar: React.FC = () => {

    const [activeDropdownUrl, setActiveDropdownUrl] = useState<string | null>(null)

    return (
        <nav className='w-full bg-stone-50'>
            <div className='hidden lg:block relative bg-stone-50 border-stone-200 border-b w-full'>
                <div className='relative flex justify-center items-center gap-5 mx-auto w-full max-w-7xl h-fit px-4 sm:px-6 lg:px-8 py-2.5'>
                    <Link to={"/"} className='hover:text-[#E41F66] transition-all duration-300 ease-in-out'>Home</Link>
                    <div className='group relative'>
                        <Link to={"/products"} className='flex justify-center items-center hover:text-[#E41F66] transition-all duration-300 ease-in-out'>Products <IoIosArrowDown className='mt-1 ml-1 size-4' /></Link>
                        <div className='hidden group-hover:block left-0 absolute bg-white shadow-md p-1.5 border border-stone-200 w-fit'>
                            {navigationDropdown.map((item) => (
                                <div
                                    key={item.url}
                                    className='block relative hover:bg-[#E41F66]/10 mb-1 p-0.5 w-full text-sm text-nowrap'
                                    onMouseEnter={() => setActiveDropdownUrl(item.url)}
                                    onMouseLeave={() => setActiveDropdownUrl((prev) => (prev === item.url ? null : prev))}
                                >

                                    <Link to={`/products/${item.url}`} className='flex items-center gap-0.5 cursor-pointer'>
                                        {item.title}
                                        {item.baseItems && <IoIosArrowDown className='mt-0.5 size-3 -rotate-90' />}
                                    </Link>

                                    {item.baseItems && activeDropdownUrl === item.url && (
                                        <div className='top-0 left-30 z-10 absolute bg-white shadow-md ml-2 p-1.5 border border-stone-200'>
                                            {item.baseItems.map((baseItem) => (
                                                <Link
                                                    key={baseItem.url}
                                                    className='block hover:bg-[#E41F66]/10 mb-1 p-0.5 w-full text-sm text-nowrap'
                                                    to={`/products/${baseItem.url}`}
                                                >
                                                    {baseItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to={"/faqs"} className='hover:text-[#E41F66] transition-all duration-300 ease-in-out'>FAQS</Link>
                    <Link to={"/about-us"} className='hover:text-[#E41F66] transition-all duration-300 ease-in-out'>About Us</Link>
                    <Link to={"/contact-us"} className='hover:text-[#E41F66] transition-all duration-300 ease-in-out'>Contact Us</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar