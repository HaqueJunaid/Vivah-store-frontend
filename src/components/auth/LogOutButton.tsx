import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logoutUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { setAuthToken } from '../../services/api';

const LogOutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore backend failure and still clear local auth state.
    } finally {
      logout();
      setAuthToken(undefined);
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex flex-nowrap items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-red-500 hover:text-red-500 hover:bg-red-50 cursor-pointer"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 17L21 12L16 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 5H5C4.44772 5 4 5.44772 4 6V18C4 18.5523 4.44772 19 5 19H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className='text-nowrap'>Log Out</span>
    </button>
  );
};

export default LogOutButton;
