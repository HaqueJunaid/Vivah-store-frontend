import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  X, 
  ExternalLink, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Store
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { logoutUser } from '../../services/authService';
import { setAuthToken } from '../../services/api';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const adminLinks = [
    {
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Orders",
      link: "/admin/orders",
      icon: ShoppingCart,
      badge: null,
    },
    {
      label: "Products",
      link: "/admin/products",
      icon: Package,
      badge: null,
    },
    {
      label: "Users",
      link: "/admin/users",
      icon: Users,
      badge: null,
    },
    {
      label: "Insights",
      link: "/admin/insights",
      icon: TrendingUp,
      badge: null,
    }
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Continue clearing local state
    } finally {
      logout();
      setAuthToken(undefined);
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  const isLinkActive = (link: string) => {
    if (link === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin";
    }
    return pathname.startsWith(link);
  };

  const userDisplayName = user?.name || user?.email?.split('@')[0] || "Administrator";
  const userInitials = (userDisplayName[0] || "A").toUpperCase();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white border-r border-stone-200/80 flex flex-col justify-between shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Top Section: Header & Navigation */}
      <div className="flex flex-col flex-1 min-h-0">
        
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-stone-100 flex items-center justify-between gap-3">
          <Link 
            to="/" 
            onClick={onClose}
            className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
          >
            <div className="size-10 rounded-2xl bg-[#E41F66]/10 border border-[#E41F66]/20 flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 group-hover:bg-[#E41F66]/15 transition-all">
              <img className="size-full object-contain" src="/favicon.svg" alt="Logo" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-stone-900 tracking-tight">Admin Studio</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#E41F66]/10 text-[#E41F66] border border-[#E41F66]/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-semibold text-stone-400">Management Portal</p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex lg:hidden items-center justify-center size-8 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
          
          {/* Main Navigation */}
          <div>
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
              Menu
            </span>
            <nav className="space-y-1">
              {adminLinks.map((item) => {
                const active = isLinkActive(item.link);
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.link}
                    to={item.link}
                    onClick={onClose}
                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-linear-to-r from-[#E41F66] to-[#d01556] text-white shadow-md shadow-[#E41F66]/20 font-bold"
                        : "text-stone-600 hover:text-stone-950 hover:bg-stone-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-xl flex items-center justify-center transition-colors ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-stone-100 text-stone-600 group-hover:bg-stone-200/70 group-hover:text-stone-900"
                        }`}
                      >
                        <IconComponent size={18} />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {active ? (
                      <ChevronRight size={15} className="text-white/80" />
                    ) : (
                      <ChevronRight size={15} className="text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Store size={13} className="text-[#E41F66]" />
                Live Store
              </span>
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Preview your public catalog and shop frontend live.
            </p>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition shadow-2xs group"
            >
              <span>View Storefront</span>
              <ExternalLink size={12} className="text-stone-400 group-hover:text-stone-800 transition-colors" />
            </Link>
          </div>

        </div>

      </div>

      {/* Bottom Section: User Profile & Logout */}
      <div className="p-4 border-t border-stone-100 bg-stone-50/50">
        <div className="p-2.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-linear-to-br from-[#E41F66] to-pink-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-stone-900 truncate">
                  {userDisplayName}
                </p>
                <ShieldCheck size={13} className="text-[#E41F66] shrink-0" />
              </div>
              <p className="text-[10px] text-stone-400 truncate">
                {user?.email || "admin@example.com"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;