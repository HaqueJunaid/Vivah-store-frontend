
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-stone-50 px-6 md:px-16 lg:px-24 xl:px-32 pt-8 border-stone-200 border-t w-full h-auto text-gray-500">
            <div className="flex md:flex-row flex-col justify-between gap-10 pb-7 border-gray-500/30 border-b w-full">
                <div className="md:max-w-96">
                    <Link to="/" >
                        <img className='-ml-1 w-30 lg:w-40 mb-5' src="/Assets/Logo.svg" alt="Logo" />
                    </Link>
                    <p className="text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row flex-1 md:justify-end items-start gap-20">
                    <div>
                        <h2 className="mb-5 font-semibold text-gray-800">Company</h2>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className='hover:underline'>Home</Link></li>
                            <li><Link to="/faqs" className='hover:underline'>FAQs</Link></li>
                            <li><Link to="/about-us" className='hover:underline'>About us</Link></li>
                            <li><Link to="/contact-us" className='hover:underline'>Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-5 font-semibold text-gray-800">Subscribe to our newsletter</h2>
                        <div className="space-y-2 text-sm">
                            <p className='w-2/3'>The latest Products, Upcoming Products, and resources, sent to your inbox weekly.</p>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-2 pt-4">
                                <input className="px-2 border border-gray-500/30 rounded outline-none ring-stone-600 focus:ring-2 w-full max-w-64 h-9 placeholder-gray-500" type="email" placeholder="Enter your email" />
                                <button className="bg-[#E41F66] w-fit hover:bg-[#c60b4d] px-5 rounded-sm h-9 text-normal text-stone-50 transition-all duration-300 cursor-pointer easeInOut">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 pb-5 text-xs md:text-sm text-center">
                Copyright 2026 © <a href="/">SrishBish</a>. All Right Reserved.
            </p>
        </footer>
    );
}

export default Footer