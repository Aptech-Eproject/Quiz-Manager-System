import {
    BookOpen,
    Clock,
    Heart,
    Play,
    Star,
    Trash2,
    Users
} from "lucide-react";

export default function FavoriteQuizCard({ quiz }) {
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

                {/* Overlay Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:scale-110 transition duration-300"></div>

                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 flex gap-3">
                    <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                    <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition cursor-pointer">
                        <Trash2 className="w-4 h-4 text-gray-700 group-hover/delete:text-red-500" />
                    </button>
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
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.duration}
                    </div>
                </div>

                {/* Rating, Participants & Start button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {quiz.rating}
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {quiz.participants}
                        </div>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition cursor-pointer"
                    >
                        <Play className="w-4 h-4" />
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}
