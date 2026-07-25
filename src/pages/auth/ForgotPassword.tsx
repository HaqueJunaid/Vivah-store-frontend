import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast';
import { forgotPasswordApi } from '../../services/authService';
import type { ForgotPasswordPayload } from '../../types/allTypes';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        document.title = "VivahStore | Forgot Password";
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm<ForgotPasswordPayload>()

    const onSubmit: SubmitHandler<ForgotPasswordPayload> = async (data) => {
        setLoading(true);
        try {
            const response = await forgotPasswordApi(data);
            toast.success(response.data.message || 'Password reset link sent to your email');
            setEmailSent(true);
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Failed to send reset link';
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
                <div className="absolute top-8 left-8 md:hidden">
                    <Link to="/"><img className='w-32' src="/Assets/Logo.svg" alt="Logo" /></Link>
                </div>

                <div className="w-full max-w-md px-8 py-10 bg-white md:bg-transparent rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:shadow-none border border-stone-100 md:border-none flex flex-col items-center justify-center">
                    <Link to="/" className="hidden md:block mb-8 hover:opacity-80 transition-opacity">
                        <img className="w-48" src="/Assets/Logo.svg" alt="Logo" />
                    </Link>

                    <div className="w-full text-center mb-8">
                        <h2 className="text-3xl text-stone-900 font-semibold tracking-tight">Forgot Password</h2>
                        {!emailSent && (
                            <p className="text-sm text-stone-500 mt-2">Enter your email and we'll send a reset link.</p>
                        )}
                    </div>
                    
                    {!emailSent ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                            <div className="flex items-center w-full bg-stone-50/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3 focus-within:border-[#E41F66] focus-within:ring-1 focus-within:ring-[#E41F66] focus-within:bg-white transition-all duration-300">
                                <MdOutlineAlternateEmail className="text-stone-400 text-lg" />
                                <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email Address" className="bg-transparent text-stone-700 placeholder-stone-400 outline-none text-sm w-full h-full" required />
                            </div>

                            <button type="submit" disabled={loading} className="mt-8 w-full h-14 rounded-xl font-semibold text-white bg-[#E41F66] hover:bg-[#c60b4d] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#E41F66]/20 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        <div className="w-full text-center">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-stone-900 mb-2">Check your email</h3>
                            <p className="text-sm text-stone-500 mb-8 leading-relaxed">We've sent a password reset link to your email address.</p>
                            <Link to="/login" className="w-full flex items-center justify-center h-14 rounded-xl font-semibold text-white bg-[#E41F66] hover:bg-[#c60b4d] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#E41F66]/20 transition-all duration-300 cursor-pointer">
                                Return to Login
                            </Link>
                        </div>
                    )}

                    <p className="text-stone-500 text-sm mt-8 text-center">
                        <Link className="font-semibold text-stone-800 hover:text-[#E41F66] transition-colors" to="/login">Back to Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
