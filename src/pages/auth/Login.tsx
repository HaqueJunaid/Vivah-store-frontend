import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast';
import { loginUser, googleAuth as googleAuthApi } from '../../services/authService';
import { setAuthToken } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import type { LoginInputs as Inputs } from '../../types/allTypes';


const Login = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const googleButtonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.title = "VivahStore | Login";
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleResponse = async (response: any) => {
        if (!response?.credential) {
            toast.error('Google login failed.');
            return;
        }

        setLoading(true);
        try {
            const result = await googleAuthApi({ token: response.credential });
            const { token, user, message } = result.data;
            setToken(token, user.role, user);
            setAuthToken(token);
            toast.success(message || 'Logged in with Google successfully');
            navigate('/');
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Google login failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const initializeGoogleAuth = () => {
        const google = (window as any).google;
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (google?.accounts?.id && clientId) {
            try {
                google.accounts.id.cancel?.();
            } catch {
                // ignore if cancel is unavailable
            }

            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleResponse,
                ux_mode: 'popup',
                credential_helper: 'none',
                itp_support: true,
            });

            if (googleButtonRef.current) {
                google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: 'outline',
                    size: 'large',
                    width: '100%',
                });
            }

            return true;
        }

        return false;
    };

    useEffect(() => {
        document.title = 'VivahStore | Login';

        if (!initializeGoogleAuth()) {
            const interval = window.setInterval(() => {
                if (initializeGoogleAuth()) {
                    window.clearInterval(interval);
                }
            }, 200);

            return () => window.clearInterval(interval);
        }
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const response = await loginUser({ email: data.email, password: data.password });
            const { token, user, message } = response.data;
            setToken(token, user.role, user);
            setAuthToken(token);
            toast.success(message || 'Logged in successfully');
            navigate('/');
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Login failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full bg-stone-50 relative">
            {/* Left Design Panel */}
            <div className="w-full hidden md:flex relative items-center justify-center bg-[#FFF5F5] overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {/* Large abstract floral/mandala shapes */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 border-[40px] border-[#E41F66]/5 rounded-full"></div>
                    <div className="absolute -top-32 -left-32 w-96 h-96 border-[1px] border-[#E41F66]/10 rounded-full scale-150"></div>
                    <div className="absolute -top-32 -left-32 w-96 h-96 border-[1px] border-[#E41F66]/10 rounded-full scale-110"></div>
                    
                    <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] border-[60px] border-[#E41F66]/5 rounded-full"></div>
                    <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] border-[1px] border-[#E41F66]/10 rounded-full scale-125"></div>
                    <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] border-[1px] border-[#E41F66]/10 rounded-full scale-150"></div>
                    
                    {/* Subtle dot pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#E41F66 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-14 text-center max-w-lg">
                    <h1 className="text-4xl font-serif text-stone-800 mb-6 tracking-wider">Timeless Elegance</h1>
                    <div className="w-12 h-1 bg-[#E41F66] mx-auto mb-8 rounded-full opacity-80"></div>
                    <p className="text-stone-600 text-lg font-light leading-relaxed">
                        Discover bespoke wedding stationery and luxury hampers curated for your perfect day.
                    </p>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full flex flex-col items-center justify-center bg-stone-50 md:bg-white relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-8 md:left-8 md:hidden ">
                    <Link to="/"><img className='w-38' src="/Assets/Logo.svg" alt="Logo" /></Link>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-8 py-10 flex flex-col items-center justify-center">
                    <Link to="/" className="hidden md:block mb-8 hover:opacity-80 transition-opacity"><img className='w-48' src="/Assets/Logo.svg" alt="Logo" /></Link>

                    <div className="w-full text-center mb-8">
                        <h2 className="text-3xl text-stone-900 font-semibold tracking-tight">Welcome back</h2>
                        <p className="text-sm text-stone-500 mt-2">Sign in to continue your journey with us.</p>
                    </div>

                    <div className="w-full mb-6">
                        <div ref={googleButtonRef} className="w-full" />
                    </div>

                    <div className="flex items-center gap-4 w-full mb-6">
                        <div className="flex-1 h-px bg-stone-200"></div>
                        <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Or continue with</p>
                        <div className="flex-1 h-px bg-stone-200"></div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex items-center w-full bg-stone-50/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3 focus-within:border-[#E41F66] focus-within:ring-1 focus-within:ring-[#E41F66] focus-within:bg-white transition-all duration-300">
                            <MdOutlineAlternateEmail className="text-stone-400 text-lg" />
                            <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email Address" className="bg-transparent text-stone-700 placeholder-stone-400 outline-none text-sm w-full h-full" required />
                        </div>

                        <div className="flex items-center w-full bg-stone-50/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3 focus-within:border-[#E41F66] focus-within:ring-1 focus-within:ring-[#E41F66] focus-within:bg-white transition-all duration-300">
                            <LuKeyRound className="text-stone-400 text-lg" />
                            <input {...register("password", { required: "Password is required" })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="bg-transparent text-stone-700 placeholder-stone-400 outline-none text-sm w-full h-full"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="pr-5 outline-none focus:outline-none">
                                {showPassword ? (
                                    <FiEye className="text-stone-400 hover:text-stone-600 transition-colors text-lg" />
                                ) : (
                                    <FiEyeOff className="text-stone-400 hover:text-stone-600 transition-colors text-lg" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            {/* Optional: Add a remember me checkbox here later */}
                        </div>
                        <Link className="text-sm font-medium text-[#E41F66] hover:text-[#c60b4d] transition-colors" to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit" disabled={loading} className="mt-8 w-full h-14 rounded-xl font-semibold text-white bg-[#E41F66] hover:bg-[#c60b4d] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#E41F66]/20 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <p className="text-stone-500 text-sm mt-8">
                        Don't have an account? <Link className="font-semibold text-stone-800 hover:text-[#E41F66] transition-colors" to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login