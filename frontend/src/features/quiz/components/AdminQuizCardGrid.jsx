import {
    BookOpen,
    Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminQuizCardGrid({ quiz }) {

    return (
        <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer">
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

                {/* Status Quiz */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white ${quiz.status === 'DRAFT'
                    ? `bg-yellow-500`
                    : `bg-green-500`
                    }`}>
                    <span className={`font-bold`}>
                        {quiz.status}
                    </span>
                </div>
            </div>

            {/* Info Card */}
            <div className="p-6">
                {/* Category Quiz */}
                <div className="text-sm text-blue-600 font-medium mb-2">
                    {quiz.category}
                </div>

                {/* Title Quiz */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>

                {/* Description Quiz */}
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

                {/* Question & Duration Card */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {quiz.questions} questions
                    </div>
                    <div className="flex items-center gap-1 flex-1">
                        <Clock className="w-4 h-4" />
                        {quiz.duration}
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            <Link
                to='/admin/manage/quiz/1'
                className="absolute inset-0 flex items-center justify-center 
          bg-gray-200/70 text-white text-lg font-semibold 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          z-10 cursor-pointer"
            >
                <span className="text-blue-600 font-bold text-xl">
                    Edit / Management Quiz
                </span>
            </Link>
        </div >
    );
}

