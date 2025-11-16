import {
    BookOpen,
    Clock,
    Play,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function QuizCardGrid({ quiz }) {
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer"
        >
            {/* Top Card */}
            <div className="relative h-48">
                {/* Image Quiz */}
                <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Annotation Quiz */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    {quiz.difficulty}
                </div>
            </div>

            {/* Info Card */}
            <div className="p-6">
                {/* Category Quiz */}
                <div className="text-sm text-blue-600 font-medium mb-2">
                    {quiz.category}
                </div>

                {/* Title Quiz */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {quiz.title}
                </h3>

                {/* Description Quiz */}
                <p className="text-gray-600 text-sm mb-4">
                    {quiz.description}
                </p>

                {/* Question & Duration Card */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {quiz.questions} questions
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                        <Clock className="w-4 h-4" />
                        {quiz.duration}
                    </div>
                    {/* Start button */}
                    <Link
                        to='/quiz/1/play'
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition cursor-pointer"
                    >
                        <Play className="w-4 h-4" />
                        Start
                    </Link>
                </div>
            </div>
        </div>
    )
}
