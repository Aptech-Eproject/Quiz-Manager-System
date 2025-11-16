import { Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateStepOneHeader() {
    const navigate = useNavigate();

    const handleExitCreate = () => {
        navigate("/admin/quizzes-list");
    }

    return (
        <header className="bg-white shadow-sm max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
                <div className="flex justify-between items-center h-20 gap-6">
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

                    {/* Current Step */}
                    <div className="text-left mr-auto">
                        <p className="text-left text-lg font-semibold">
                            Step 1 of 2
                        </p>
                    </div>

                    {/* Exit */}
                    <div className="flex items-center space-x-4 px-12">
                        <span
                            onClick={handleExitCreate}
                            className="hover:bg-purple-100 transition rounded-md p-2 font-bold cursor-pointer">
                            Exit
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
