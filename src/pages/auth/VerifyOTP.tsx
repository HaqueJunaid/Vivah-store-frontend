import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import toast from 'react-hot-toast';
import { verifyOTP, resendOTP } from '../../services/authService';
import { setAuthToken } from '../../services/api';
import { useAuthStore } from '../../store/authStore';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const setToken = useAuthStore((state) => state.setToken);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const initialEmail = location.state?.email || localStorage.getItem('registerEmail') || "";
    const [email] = useState(initialEmail);

    useEffect(() => {
        document.title = "VivahStore | Verify OTP";
    }, []);

    useEffect(() => {
        if (!email) {
            navigate('/register');
            return;
        }
        localStorage.setItem('registerEmail', email);
    }, [email, navigate]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await verifyOTP({ email, otp: otpCode });
            const { token, user, message } = response.data;
            setToken(token, user.role, user);
            setAuthToken(token);
            setSuccess(true);
            localStorage.removeItem('registerEmail');
            toast.success(message || 'OTP verified successfully');
            navigate('/');
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to verify OTP. Please try again.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            toast.error('Email is required to resend OTP');
            return;
        }

        setLoading(true);
        try {
            const response = await resendOTP({ email });
            setOtp(["", "", "", "", "", ""]);
            setError("");
            toast.success(response.data.message || 'OTP resent to your email');
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to resend OTP. Please try again.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

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
                <div className="absolute left-1/2 -translate-x-1/2 top-8 md:left-8 md:hidden">
                    <Link to="/"><img className='w-38' src="/Assets/Logo.svg" alt="Logo" /></Link>
                </div>

                <form onSubmit={handleVerifyOtp} className="w-full max-w-md px-8 py-10 flex flex-col items-center justify-center">
                    <Link to="/" className="hidden md:block mb-8 hover:opacity-80 transition-opacity">
                        <img className="w-48" src="/Assets/Logo.svg" alt="Logo" />
                    </Link>

                    <div className="w-full text-center mb-8">
                        <h2 className="text-3xl text-stone-900 font-semibold tracking-tight">Verify OTP</h2>
                        <p className="text-sm text-stone-500 mt-2">Enter the 6-digit code sent to your email.</p>
                    </div>

                    {email && (
                        <div className="flex items-center mt-2 w-full bg-stone-100/50 border border-stone-200 h-14 rounded-xl overflow-hidden pl-5 gap-3">
                            <MdOutlineAlternateEmail className="text-stone-400 text-lg" />
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="bg-transparent text-stone-500 outline-none text-sm w-full h-full cursor-not-allowed"
                            />
                        </div>
                    )}

                    <div className="flex gap-2 mt-8 justify-center w-full">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#E41F66] focus:ring-1 focus:ring-[#E41F66] focus:bg-white transition-all duration-300"
                                placeholder="0"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm mt-4 text-center bg-red-50 p-2 rounded-lg w-full">{error}</p>}
                    {success && <p className="text-green-600 text-sm mt-4 text-center bg-green-50 p-2 rounded-lg w-full font-medium">✓ OTP verified successfully!</p>}

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="mt-8 w-full h-14 rounded-xl font-semibold text-white bg-[#E41F66] hover:bg-[#c60b4d] hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#E41F66]/20 transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                        {loading ? "Verifying..." : success ? "Verified" : "Verify OTP"}
                    </button>

                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="mt-4 w-full h-14 rounded-xl font-medium text-[#E41F66] bg-[#E41F66]/5 border border-[#E41F66]/20 hover:bg-[#E41F66]/10 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending...' : 'Resend OTP'}
                    </button>

                    <p className="text-stone-500 text-sm mt-8">
                        Don't want to verify? <Link className="font-semibold text-stone-800 hover:text-[#E41F66] transition-colors" to="/register">Back to Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
