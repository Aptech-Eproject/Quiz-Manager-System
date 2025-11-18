import {
    Eye,
    EyeOff,
    Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { loginMutation, googleLoginMutation } = useAuth();
    const { isAuthenticated } = useAuthStore();

    // Handle successful login
    useEffect(() => {
        if (loginMutation.isSuccess) {
            navigate('/', { replace: true });
        }
        if (googleLoginMutation.isSuccess) {
            const user = googleLoginMutation.data?.data?.user;
            if (user?.provider === 'google' && !user?.is_password_set) {
                navigate('/set-password', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [loginMutation.isSuccess, googleLoginMutation.isSuccess, googleLoginMutation.data, navigate]);

    // Load Google Sign-In script
    useEffect(() => {
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
                    use_fedcm_for_prompt: false,
                });
                
                // Render button after initialization
                setTimeout(() => {
                    window.google.accounts.id.renderButton(
                        document.getElementById('google-signin-btn'),
                        { theme: 'outline', size: 'large', width: '100%' }
                    );
                }, 100);
            }
        };

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const handleGoogleResponse = (response) => {
        console.log('🔍 Google response:', response);
        if (response.credential) {
            console.log('🚀 Sending credential to backend:', response.credential.substring(0, 50) + '...');
            googleLoginMutation.mutate(response.credential);
        } else {
            console.error('❌ No credential in Google response');
        }
    };

    // Redirect if already authenticated
    if (isAuthenticated) {
        navigate('/', { replace: true });
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        loginMutation.mutate({ email, password });
    };

    const handleGoogleLogin = () => {
        // This function is no longer needed as button auto-renders
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
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
                        Sign in
                    </h1>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="aaron@column.com"
                            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••"
                            className="w-full px-4 py-3 bg-white border-2 border-blue-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12"
                            required
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

                    {/* Sign In Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loginMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition duration-200 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loginMutation.isPending ? 'Đang đăng nhập...' : 'Sign in'}
                    </button>

                    {/* Remember me */}
                    <div className="text-left flex items-center gap-2">
                        <input type="checkbox" className='cursor-pointer' />
                        <span className="text-gray-700">Remember me</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <div id="google-signin-btn" className="w-full"></div>

                {/* Sign up link */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end gap-2">
                    <p className="text-center text-gray-700">
                        Don't have a account yet?
                    </p>
                    <Link to="/register" className='text-blue-600 hover:underline cursor-pointer font-medium'>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}