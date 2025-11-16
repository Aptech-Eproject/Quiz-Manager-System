import {
    ChevronDown,
    Heart,
    Search
} from "lucide-react";
import { useEffect } from "react";

import UserHeader from "../../../shared/components/UserHeader";
import FavoriteQuizCard from "../components/FavoriteQuizCard";

export default function FavoriteQuizzes() {
    const favoriteQuizzes = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            description: "Test your knowledge of JavaScript basics and ES6 features",
            questions: 25,
            difficulty: "Intermediate",
            participants: 1234,
            rating: 4.8,
            duration: "30 min",
            category: "Programming",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
            progress: 60, // advanced
            lastAttempt: "2 days ago", // advanced
            bestScore: 85 // advanced
        },
        {
            id: 2,
            title: "World History",
            description: "Journey through major historical events and civilizations",
            questions: 40,
            difficulty: "Advanced",
            participants: 892,
            rating: 4.6,
            duration: "45 min",
            category: "History",
            image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=250&fit=crop",
            progress: 100,
            lastAttempt: "1 week ago",
            bestScore: 92
        },
        {
            id: 3,
            title: "Basic Mathematics",
            description: "Essential math concepts for everyday problem solving",
            questions: 20,
            difficulty: "Beginner",
            participants: 2156,
            rating: 4.9,
            duration: "20 min",
            category: "Mathematics",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
            progress: 0,
            lastAttempt: null,
            bestScore: null
        },
        {
            id: 4,
            title: "Python Programming",
            description: "Master Python syntax, data structures, and algorithms",
            questions: 35,
            difficulty: "Intermediate",
            participants: 1567,
            rating: 4.7,
            duration: "40 min",
            category: "Programming",
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
            progress: 45,
            lastAttempt: "5 days ago",
            bestScore: 78
        },
        {
            id: 5,
            title: "Biology Basics",
            description: "Explore cells, genetics, and human body systems",
            questions: 30,
            difficulty: "Beginner",
            participants: 945,
            rating: 4.5,
            duration: "35 min",
            category: "Science",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
            progress: 30,
            lastAttempt: "3 days ago",
            bestScore: 65
        },
        {
            id: 6,
            title: "English Grammar",
            description: "Perfect your grammar skills with comprehensive exercises",
            questions: 28,
            difficulty: "Intermediate",
            participants: 1823,
            rating: 4.8,
            duration: "25 min",
            category: "Languages",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
            progress: 80,
            lastAttempt: "Yesterday",
            bestScore: 88
        }
    ];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
            {/* Header */}
            <UserHeader />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-5">
                {/* Actions */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                                My Favorites
                            </h1>
                            <p className="text-gray-600">
                                {favoriteQuizzes.length} quizzes saved
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                                    <option>
                                        Recently Added
                                    </option>
                                    <option>
                                        Last Attempted
                                    </option>
                                    <option>
                                        Highest Score
                                    </option>
                                    <option>
                                        Not Started
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search in favorites..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Quiz Cards - Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteQuizzes.map((quiz) => (
                        <FavoriteQuizCard quiz={quiz} />
                    ))}
                </div>

                {/* Empty Favorite Quiz */}
                {favoriteQuizzes.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No favorites yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start adding quizzes to your favorites to see them here
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer">
                            Browse Quizzes
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
