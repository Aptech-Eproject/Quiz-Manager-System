import {
    Eye,
    EyeOff,
    Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', { email, password });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md px-12">
                {/* Logo */}
                <div className='flex items-center flex-col justify-center gap-y-4 mb-5'>
                    <Link to='/' className="flex items-center space-x-3 hover:scale-105 transition">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                <Zap className="w-7 h-7 text-white" />
                            </span>
                        </div>

                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl font-semibold text-center text-gray-900">
                        Sign in
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 cursor-pointer"
                    >
                        Sign in
                    </button>

                    {/* Forgot Password Link */}
                    <div className="text-left flex items-center gap-2">
                        <input type="checkbox" className='cursor-pointer' />
                        Remember me
                    </div>
                </form>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end gap-2">
                    <p className="text-center text-gray-700">
                        Don't have a account yet?
                    </p>
                    <Link
                        to='/register'
                        className='text-blue-600 hover:underline cursor-pointer font-medium'>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}