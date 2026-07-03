import { LuUserRound } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { HiLogin } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { ShieldCheck } from "lucide-react";
import { useAuthStore } from '../../store/authStore';
import LogOutButton from '../auth/LogOutButton';

const UserDropdown = () => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const role = useAuthStore((state) => state.role);
    const userAvatar = user?.provider === 'google' && user.avatar ? user.avatar : null;
    const isAdmin = role === 'admin' || user?.role === 'admin';

    return (
        <div className='ml-0 md:ml-2 group relative hidden lg:block'>
            <Link to={`/profile`} className='flex justify-center items-center hover:underline'>
                {userAvatar ? (
                    <img src={userAvatar} alt={user?.name || 'User'} className='rounded-full object-cover size-8.5 outline-0 hover:outline-2 outline-[#E41F66]/50 transition-all duration-100 ease-in-out' />
                ) : (
                    <LuUserRound className="text-stone-800 size-5.5" />
                )}
            </Link>
            {token ?
                <div className='w-fit hidden rounded-md group-hover:block left-0 absolute bg-white shadow-md p-1.5 border border-stone-200 z-100'>
                    {isAdmin && (
                        <div className='block relative hover:bg-[#E41F66]/10 mb-1 p-0.5 w-full text-sm text-nowrap z-100 rounded-sm'>
                            <Link to="/admin/dashboard" className='flex items-center cursor-pointer gap-1.5 px-2 py-1 rounded-sm font-medium text-stone-800 hover:text-[#E41F66]'>
                                <ShieldCheck className="size-4 text-[#E41F66]" /> Admin Panel
                            </Link>
                        </div>
                    )}
                    <LogOutButton />
                </div>
                :
                <div className='hidden rounded-md group-hover:block left-0 absolute bg-white shadow-md p-1.5 border border-stone-200 w-fit z-100'>
                    <div className='block relative hover:hover:bg-[#E41F66]/10 mb-1 p-0.5 w-full text-sm text-nowrap z-100 rounded-sm'>
                        <Link to={`/register`} className='flex items-center cursor-pointer gap-1 px-2 py-0.5 rounded-sm'>
                            <FiUserPlus className="size-4" /> Sign Up
                        </Link>
                    </div>
                    <div className='block relative hover:hover:bg-[#E41F66]/10 mb-1 p-0.5 w-full text-sm text-nowrap z-100 rounded-sm'>

                        <Link to={`/login`} className='flex items-center cursor-pointer gap-1 px-2 py-0.5 rounded-sm'>
                            <HiLogin className="size-4 rotate-180" /> Sign In
                        </Link>
                    </div>
                </div>}

        </div>
    )
}

export default UserDropdown