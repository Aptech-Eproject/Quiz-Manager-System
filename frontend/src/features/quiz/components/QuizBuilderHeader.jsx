import {
    MoveLeft,
    Trash
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizBuilderHeader({ title, status, course }) {
    const navigate = useNavigate();

    function formatDuration(totalSeconds) {
        if (!totalSeconds || totalSeconds <= 0) return "0s";

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (hrs > 0) {
            return `${hrs}h ${mins}m`;
        } else if (mins > 0) {
            return `${mins}m`;
        } else {
            return `${secs}s`;
        }
    }

    return (
        <header className="fixed w-full bg-white shadow-sm z-10 py-3">
            <div className="flex flex-wrap items-center space-x-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                {/* Back to quizzes */}
                <div
                    onClick={() => navigate("/admin/quizzes-list")}
                    className="flex items-center justify-center space-x-4 h-14 cursor-pointer hover:opacity-90 transition-opacity">
                    <MoveLeft
                        color="#000"
                        className="w-5"
                    />
                    <p className="text-black font-semibold">
                        Back to quizzes
                    </p>
                </div>

                {/* Name Course */}
                <div className="flex items-center justify-center space-x-2 h-14">
                    <p className="text-black text-xl font-medium">
                        {title || 'Javascript Programming'}
                    </p>
                </div>

                {/* DRAFT Box */}
                <div className="flex items-center justify-center space-x-2 h-14">
                    <div className="bg-yellow-500 rounded-md">
                        <p className="text-white text-[14px] font-bold py-1 px-4">
                            {status?.toUpperCase() || "DRAFT"}
                        </p>
                    </div>
                </div>

                {/* Minutes */}
                <div className="flex items-center justify-center space-x-2 h-14">
                    <p className="text-black font-semibold">
                        {formatDuration(course?.totalDuration)} of video content uploaded
                    </p>
                </div>

                {/* Preview button */}
                <div className="flex items-center justify-end flex-1 space-x-2 h-14">
                    <button className="w-30 relative px-5 py-2 text-sm font-bold rounded-md border border-gray-400 text-gray-600 overflow-hidden group cursor-pointer">
                        <span className="absolute inset-0 rounded-md bg-white opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-br from-blue-500 to-purple-500 transition-opacity duration-500 pointer-events-none"></span>
                        <span className="relative group-hover:text-white transition duration-500">
                            Preview
                        </span>
                    </button>
                </div>


                {/* Trash Icon */}
                <div className="flex items-center justify-center space-x-2 h-14">
                    <span className="px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                        <Trash
                            className="text-black cursor-pointer hover:opacity-90 transition-al w-6 h-6"
                        />
                    </span>
                </div>
            </div>
        </header>
    )
}
