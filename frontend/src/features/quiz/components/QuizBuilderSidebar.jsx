import { Link, useLocation } from "react-router-dom";

export default function QuizBuilderSidebar() {
    const location = useLocation();
    const checkActive = (path) => location.pathname === path;

    return (
        <div className="min-w-55 h-full pt-10 flex flex-col space-y-8">
            <div className="flex flex-col space-y-10 w-full">
                {/* Create your quiz */}
                <div className="flex flex-col">
                    <p className="py-2 text-[18px] font-bold">
                        Create your quiz
                    </p>
                    <Link
                        to='/admin/manage/quiz/1/builder'
                        className={`py-1.5 px-9 text-left text-[16px] cursor-pointer hover:bg-gray-200 
                            ${checkActive(`/admin/manage/quiz/1/builder`) ? `border-l-4` : ''}`}
                    >
                        Builder
                    </Link>
                </div>

                {/* Manage your course */}
                <div className="flex flex-col">
                    <p className="py-2 text-[18px] font-bold">
                        Manage your course
                    </p>
                    <Link
                        to='/admin/manage/quiz/1/statistics'
                        className={`py-1.5 px-9 text-left text-[16px] cursor-pointer hover:bg-gray-200
                        ${checkActive(`/admin/manage/quiz/1/statistics`) ? `border-l-4` : ''}`}
                    >
                        Statistics
                    </Link>

                </div>
            </div>

            {/* Submit Button */}
            <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold w-full py-2 px-5 rounded-sm cursor-pointer hover:bg-purple-600 transition shadow-xl"
            >
                Public Quiz
            </button>
        </div>
    )
}