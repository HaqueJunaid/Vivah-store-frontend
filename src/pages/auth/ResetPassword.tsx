import { LuKeyRound } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast';
import { resetPasswordApi } from '../../services/authService';
import type { ResetPasswordPayload } from '../../types/allTypes';

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        document.title = "VivahStore | Reset Password";
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<{password: string, confirmPassword: string}>()

    const password = watch("password");

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const onSubmit: SubmitHandler<{password: string, confirmPassword: string}> = async (data) => {
        if (!token) {
            toast.error("Invalid or missing token");
            return;
        }

        setLoading(true);
        try {
            const response = await resetPasswordApi(token, { password: data.password });
            toast.success(response.data.message || 'Password reset successfully');
            navigate('/login');
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Failed to reset password';
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
                <div className="absolute left-1/2 -translate-x-1/2 top-8 left-8 md:hidden">
                    <Link to="/"><img className='w-38' src="/Assets/Logo.svg" alt="Logo" /></Link>
                </div>

                <div className="w-full max-w-md px-8 py-10 flex flex-col items-center justify-center">
                    <Link to="/" className="hidden md:block mb-8 hover:opacity-80 transition-opacity">
                        <img className="w-48" src="/Assets/Logo.svg" alt="Logo" />
                    </Link>

                    <div className="w-full text-center mb-8">
                        <h2 className="text-3xl text-stone-900 font-semibold tracking-tight">Reset Password</h2>
                        <p className="text-sm text-stone-500 mt-2">Enter your new password below.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="w-full space-y-4">
                            <div className="flex items-center w-full bg-stone-50/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3 focus-within:border-[#E41F66] focus-within:ring-1 focus-within:ring-[#E41F66] focus-within:bg-white transition-all duration-300">
                                <LuKeyRound className="text-stone-400 text-lg" />
                                <input 
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="New Password" 
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
                            {errors.password && <span className="text-red-500 text-xs ml-4">{errors.password.message}</span>}

                            <div className="flex items-center w-full bg-stone-50/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3 focus-within:border-[#E41F66] focus-within:ring-1 focus-within:ring-[#E41F66] focus-within:bg-white transition-all duration-300 mt-4">
                                <LuKeyRound className="text-stone-400 text-lg" />
                                <input 
                                    {...register("confirmPassword", { 
                                        required: "Please confirm your password",
                                        validate: value => value === password || "The passwords do not match"
                                    })} 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm New Password" 
                                    className="bg-transparent text-stone-700 placeholder-stone-400 outline-none text-sm w-full h-full" 
                                    required 
                                />
                                <button type="button" onClick={toggleConfirmPasswordVisibility} className="pr-5 outline-none focus:outline-none">
                                    {showConfirmPassword ? (
                                        <FiEye className="text-stone-400 hover:text-stone-600 transition-colors text-lg" />
                                    ) : (
                                        <FiEyeOff className="text-stone-400 hover:text-stone-600 transition-colors text-lg" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500 text-xs ml-4">{errors.confirmPassword.message}</span>}
                        </div>

                        <button type="submit" disabled={loading} className="mt-8 w-full h-14 rounded-xl font-semibold text-white bg-[#E41F66] hover:bg-[#c60b4d] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#E41F66]/20 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>

                    <p className="text-stone-500 text-sm mt-8 text-center">
                        <Link className="font-semibold text-stone-800 hover:text-[#E41F66] transition-colors" to="/login">Back to Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
