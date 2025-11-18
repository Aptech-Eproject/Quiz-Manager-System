import {
    Eye,
    EyeOff,
    Zap,
    User,
    Mail,
    Lock
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();
    const { registerMutation, googleLoginMutation } = useAuth();
    const { mutate: triggerGoogleSignup } = googleLoginMutation;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu không khớp!');
            return;
        }

        if (!agreedToTerms) {
            toast.error('Vui lòng đồng ý với điều khoản và điều kiện');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        const registerData = { ...formData };
        delete registerData.confirmPassword;
        registerMutation.mutate(registerData, {
            onSuccess: () => {
                navigate('/login');
            }
        });
    };

    const handleGoogleSignUp = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    const handleGoogleResponse = useCallback((response) => {
        if (response.credential) {
            triggerGoogleSignup(response.credential, {
                onSuccess: () => {
                    navigate('/');
                }
            });
        }
    }, [navigate, triggerGoogleSignup]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Load Google Sign-In script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });
            }
        };

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [handleGoogleResponse]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md px-12">
                {/* Logo */}
                <div className='flex items-center flex-col justify-center gap-y-4 mb-5'>
                    <div className="flex items-center space-x-3 hover:scale-105 transition cursor-pointer">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                <Zap className="w-7 h-7 text-white" />
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-semibold text-center text-gray-900">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-600 text-center">
                        Join QuizMaster and start your learning journey
                    </p>
                </div>

                {/* Google Sign Up Button */}
                <button
                    onClick={handleGoogleSignUp}
                    disabled={googleLoginMutation.isPending}
                    className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-50 cursor-pointer disabled:cursor-not-allowed text-gray-700 font-medium py-3 rounded-lg transition duration-200 border-2 border-gray-200 flex items-center justify-center gap-3 mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {googleLoginMutation.isPending ? 'Đang đăng nhập...' : 'Sign up with Google'}
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-500">Or sign up with email</span>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full pl-12 pr-12 py-3 bg-white border-2 border-blue-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                        <div className="space-y-2">
                            <div className="flex gap-1">
                                <div className={`h-1 flex-1 rounded-full transition ${formData.password.length >= 1 ? 'bg-red-500' : 'bg-gray-200'
                                    }`}></div>
                                <div className={`h-1 flex-1 rounded-full transition ${formData.password.length >= 6 ? 'bg-yellow-500' : 'bg-gray-200'
                                    }`}></div>
                                <div className={`h-1 flex-1 rounded-full transition ${formData.password.length >= 10 ? 'bg-green-500' : 'bg-gray-200'
                                    }`}></div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Password strength: {
                                    formData.password.length >= 10 ? 'Strong' :
                                        formData.password.length >= 6 ? 'Medium' : 'Weak'
                                }
                            </p>
                        </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className='mt-1 cursor-pointer accent-blue-600'
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                            I agree to the{' '}
                            <span className="text-blue-600 hover:underline cursor-pointer">
                                Terms and Conditions
                            </span>
                            {' '}and{' '}
                            <span className="text-blue-600 hover:underline cursor-pointer">
                                Privacy Policy
                            </span>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!agreedToTerms || registerMutation.isPending}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {registerMutation.isPending ? 'Đang tạo tài khoản...' : 'Create Account'}
                    </button>
                </div>

                {/* Sign in link */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-600 hover:underline cursor-pointer font-medium'>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
