import {
    BookOpen,
    Clock,
    Star,
    Users
} from "lucide-react";
import { Link } from "react-router-dom";

export default function QuizCardList({ quiz }) {
    return (
        <div
            key={quiz.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
        >
            <Link to='/admin/manage/quiz/1/builder' className="flex flex-col sm:flex-row">
                {/* Thumbnail Quiz */}
                <div className="relative w-full sm:w-70 h-32 sm:h-auto shrink-0 overflow-hidden">
                    <img
                        src={quiz.image}
                        alt={quiz.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Quiz */}
                <div className="flex-1 p-6 over:opacity-30 group relative overflow-hidden">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm text-blue-600 font-medium">{quiz.category}</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {quiz.difficulty}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {quiz.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-7">
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {quiz.questions} questions
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {quiz.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {quiz.rating}
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {quiz.participants}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                            {quiz.status && (
                                <div>
                                    <span className="text-gray-600">
                                        Status: {" "}
                                    </span>
                                    <span className={`font-bold ${quiz.status === 'DRAFT'
                                        ? `text-yellow-600`
                                        : `text-green-600`
                                        } `}>
                                        {quiz.status}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hover Overlay */}
                    <div
                        className="absolute inset-0 flex items-center justify-center 
                    bg-gray-200/70 text-white text-lg font-semibold 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    z-10 cursor-pointer"
                    >
                        <span className="text-blue-600 font-medium text-xl">
                            Edit / Management Quiz
                        </span>
                    </div>
                </div>
            </Link>
        </div >
    )
}
