import { LuUserRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast';
import { registerUser, googleAuth as googleAuthApi } from '../../services/authService';
import { setAuthToken } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import type { RegisterInputs as Inputs } from '../../types/allTypes';


const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const setToken = useAuthStore((state) => state.setToken);
    const googleButtonRef = useRef<HTMLDivElement | null>(null);

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
            toast.success(message || 'Signed up with Google successfully');
            navigate('/');
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Google signup failed';
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
        document.title = 'VivahStore | Signup';

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
            const response = await registerUser({
                name: data.username,
                email: data.email,
                password: data.password,
            });
            const { email } = response.data;
            localStorage.setItem('registerEmail', email);
            toast.success('Registration successful. Verify OTP.');
            navigate('/verify-otp', { state: { email } });
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full bg-stone-50 relative">
            <div className="w-full hidden md:inline-block">
                <img className="h-full w-full object-cover" src="/Assets/login_wedding_banner.png" alt="login_wedding_banner" />
            </div>


            <div className="w-full flex flex-col items-center justify-center">

                <form onSubmit={handleSubmit(onSubmit)} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <Link to="/"><img className='w-50 mb-5' src="/Assets/Logo.svg" alt="Logo" /></Link>

                    <h2 className="text-4xl text-stone-900 font-medium">Sign up</h2>
                    <p className="text-sm text-stone-500/90 mt-3">Create an account to get started</p>

                    <div ref={googleButtonRef} className="w-full mt-8" />

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-stone-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-stone-500/90">or sign up with email</p>
                        <div className="w-full h-px bg-stone-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <LuUserRound className="text-stone-500/80" />
                        <input type="text" {...register("username", { required: "Username is required" })} placeholder="Username" className="bg-transparent text-stone-700 placeholder-stone-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <MdOutlineAlternateEmail className="text-stone-500/80" />
                        <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email id" className="bg-transparent text-stone-700 placeholder-stone-500/80 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-stone-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <LuKeyRound className="text-stone-500/80" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-transparent text-stone-700 placeholder-stone-500/80 outline-none text-sm w-full h-full"
                            required
                            {...register("password", { required: "Password is required" })}
                        />
                        {showPassword ? (
                            <FiEye
                                className="text-stone-500/80 mr-5 text-xl cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <FiEyeOff
                                className="text-stone-500/80 mr-5 text-xl cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="mt-8 w-full h-11 rounded-full text-white bg-[#E41F66] hover:scale-101 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? 'Creating account...' : 'Sign up'}
                    </button>
                    <p className="text-stone-500/90 text-sm mt-4">Already have an account? <Link className="text-stone-700 hover:underline" to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register