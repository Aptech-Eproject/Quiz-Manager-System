import {
    Star,
    Zap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function UserHeader() {
    // const [showAvatar, setShowAvatar] = useState(false);

    // useEffect(() => {
    //     const user = localStorage.getItem(`user_info`);
    //     if (user) setShowAvatar(true);
    // }, []);

    const navItems = [
        {
            path: '/',
            label: 'Home'
        },
        {
            path: '/quizzes-list',
            label: 'Quizzes List'
        },
        {
            path: '/favorite-quizzes',
            label: 'Favorite Quizzes'
        },
    ];

    const location = useLocation();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 py-4.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Menu */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to='/' className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                <Zap className="w-6 h-6 text-white" />
                            </span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            QuizMaster
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => {
                            const isCurrentPage = location.pathname === item.path && location.pathname.startsWith(item.path);

                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`flex items-center gap-2 transition 
                                        ${isCurrentPage
                                            ? "text-gray-700 font-medium hover:text-blue-600"
                                            : "text-gray-600 hover:text-blue-600"
                                        }`}
                                >
                                    {item.path === "/favorite-quizzes" && (
                                        <Star
                                            className={`w-4 h-4 ${isCurrentPage
                                                ? "fill-yellow-400 text-yellow-400"
                                                : ""
                                                }`}
                                        />
                                    )}
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Auth Buttons & Avatar */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Auth Buttons */}
                        <Link
                            to='/login'
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition cursor-pointer"
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
                        >
                            Sign Up
                        </Link>

                        {/* Avatar */}
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full cursor-pointer hover:ring-2 ring-blue-500 transition" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 hover:bg-slate-50 hover:cursor-pointer"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            {/* Custom Menu Icon */}
                            <span className="w-ful h-0.5 bg-gray-800" />
                            <span className="w-ful h-0.5 bg-gray-800" />
                            <span className="w-ful h-0.5 bg-gray-800" />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden py-4 mt-4 border-t">
                    <nav className="flex flex-col space-y-4">
                        <a
                            href="#"
                            className="text-blue-600 font-medium"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-gray-600"
                        >
                            Quizzes List
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 flex items-center gap-2"
                        >
                            <Star className="w-4 h-4" />
                            Favorite Quizzes
                        </a>
                        <div className="flex gap-4 pt-2">
                            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-slate-50 transform hover:scale-105 hover:shadow-lg 
                            transition duration-300 ease-in-out">
                                Login
                            </button>
                            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
                            text-white rounded-lg cursor-pointer 
                            hover:from-blue-700 hover:to-purple-700 
                            transform hover:scale-105 hover:shadow-lg 
                            transition duration-300 ease-in-out">
                                Sign Up
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
