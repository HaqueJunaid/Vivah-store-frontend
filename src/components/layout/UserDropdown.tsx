import React from 'react';
import { LuUserRound } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { HiLogin } from 'react-icons/hi';
import { FiUserPlus } from 'react-icons/fi';
import { ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import LogOutButton from '../auth/LogOutButton';

const UserDropdown: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const userAvatar = user?.provider === 'google' && user.avatar ? user.avatar : null;
  const isAdmin = role === 'admin' || user?.role === 'admin';

  return (
    <div className="group relative hidden lg:block">
      <Link
        to="/profile"
        className="flex items-center justify-center p-2 rounded-full text-stone-700 hover:text-[#E41F66] hover:bg-stone-200/50 transition-colors"
        aria-label="User profile"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={user?.name || 'User'}
            className="rounded-full object-cover size-7.5 ring-2 ring-stone-200 group-hover:ring-[#E41F66]/50 transition-all"
          />
        ) : (
          <LuUserRound className="size-5" />
        )}
      </Link>

      {/* Floating Dropdown Card */}
      <div className="hidden group-hover:block absolute right-0 top-full pt-1.5 w-48 z-50">
        <div className="bg-white rounded-xl shadow-xl shadow-stone-900/10 border border-stone-200/80 p-1.5">
          {token ? (
            <div className="space-y-1">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-[#E41F66] hover:bg-rose-50/70 transition-colors"
                >
                  <ShieldCheck className="size-4 text-[#E41F66]" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-[#E41F66] hover:bg-rose-50/70 transition-colors"
              >
                <LuUserRound className="size-4" />
                <span>My Profile</span>
              </Link>
              <div className="pt-1 mt-1 border-t border-stone-100 px-1">
                <LogOutButton />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-[#E41F66] hover:bg-rose-50/70 transition-colors"
              >
                <HiLogin className="size-4 rotate-180 text-stone-500" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:text-[#E41F66] hover:bg-rose-50/70 transition-colors"
              >
                <FiUserPlus className="size-4 text-stone-500" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;