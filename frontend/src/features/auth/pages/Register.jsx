import {
    Eye,
    EyeOff,
    Zap,
    User,
    Mail,
    Lock
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
            alert('Passwords do not match!');
            return;
        }

        if (!agreedToTerms) {
            alert('Please agree to the Terms and Conditions');
            return;
        }

        console.log('Register:', formData);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md px-12">
                {/* Logo */}
                <div className='flex items-center flex-col justify-center gap-y-4 mb-5'>
                    <a href='/' className="flex items-center space-x-3 hover:scale-105 transition">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                <Zap className="w-7 h-7 text-white" />
                            </span>
                        </div>
                    </a>

                    {/* Title */}
                    <h1 className="text-3xl font-semibold text-center text-gray-900">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-600 text-center">
                        Join QuizMaster and start your learning journey
                    </p>
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
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms and Conditions
                            </a>
                            {' '}and{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!agreedToTerms}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        Create Account
                    </button>
                </div>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-700">
                        Already have an account?{' '}
                        <a
                            href='/login'
                            className='text-blue-600 hover:underline cursor-pointer font-medium'>
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}