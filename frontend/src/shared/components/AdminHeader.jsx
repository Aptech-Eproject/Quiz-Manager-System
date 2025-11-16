import {
    LayoutDashboard,
    LogOut,
    Zap
} from "lucide-react"
import { Link } from "react-router-dom";

export default function AdminHeader() {
    const handleLogout = () => {
        console.log(`Logout`);
    }

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left side - Logo and Title */}
                    <div className="flex items-center space-x-5">
                        {/* Logo */}
                        <Link to='/admin/quizzes-list' className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    <Zap className="w-6 h-6 text-white" />
                                </span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                QuizMaster
                            </span>
                        </Link>

                        {/* Vertical Line */}
                        <div className="hidden sm:block w-px h-8 bg-gray-300" />

                        <div className="hidden sm:flex items-center space-x-2">
                            <LayoutDashboard className="w-5 h-5 text-gray-600" />
                            <span className="text-lg font-semibold text-gray-800">
                                Quiz Management System
                            </span>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Admin Info */}
                        <div className="hidden md:flex flex-col items-end mr-8 ml-5">
                            <span className="text-sm font-medium text-gray-700">
                                Admin
                            </span>
                            <span className="text-xs text-gray-500">
                                Workplace Manager
                            </span>
                        </div>

                        {/* Logout Button */}
                        <Link
                            to='/'
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}