import {
    ChevronDown,
    Filter,
    Search
} from "lucide-react";
import { useEffect, useState } from "react";

import BlueContainer from "../../../shared/components/BlueContainer";
import QuizCardGrid from "../components/QuizCardGrid";
import Pagination from "../../../shared/components/Pagination";
import UserHeader from "../../../shared/components/UserHeader";

export default function QuizzesList() {
    const [showFilters, setShowFilters] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [sortBy, setSortBy] = useState('popular');

    const quizzes = [
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
            trending: true
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
            image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=250&fit=crop"
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
            featured: true
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
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop"
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
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop"
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
            trending: true
        },
        {
            id: 7,
            title: "World Geography",
            description: "Test your knowledge of countries, capitals, and landmarks",
            questions: 50,
            difficulty: "Advanced",
            participants: 678,
            rating: 4.4,
            duration: "50 min",
            category: "Geography",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=250&fit=crop"
        },
        {
            id: 8,
            title: "Art History",
            description: "Discover famous artworks, artists, and art movements",
            questions: 22,
            difficulty: "Intermediate",
            participants: 534,
            rating: 4.6,
            duration: "28 min",
            category: "Arts",
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop"
        },
        {
            id: 9,
            title: "Physics Fundamentals",
            description: "Understand mechanics, energy, and basic physics principles",
            questions: 32,
            difficulty: "Advanced",
            participants: 1089,
            rating: 4.7,
            duration: "42 min",
            category: "Science",
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop"
        }
    ];

    const categories = [
        'All',
        'Programming',
        'Science',
        'History',
        'Mathematics',
        'Languages',
        'Arts',
        'Geography'
    ];

    const difficulties = [
        'All',
        'Beginner',
        'Intermediate',
        'Advanced'
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

            {/* Blue Header Container */}
            <BlueContainer />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 lg:py-8">
                {/* Search & Filters Bar */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search quizzes by title, topic, or keyword..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Filter Toggle Button (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>

                        {/* Desktop Filers */}
                        <div className="hidden md:flex flex-wrap items-center gap-4 flex-1">
                            {/* Category Filters */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                    Category:
                                </span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {categories.map((cat) => (
                                            <option
                                                key={cat}
                                                value={cat}
                                            >
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                    Difficulty:
                                </span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {difficulties.map(diff => (
                                            <option key={diff} value={diff}>{diff}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="newest">Newest</option>
                                        <option value="shortest">Shortest</option>
                                        <option value="longest">Longest</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            Showing {" "}
                            <span className="font-semibold text-gray-900">{quizzes.length}</span> quizzes
                        </div>
                    </div>

                    {/* Mobile Filters Dropdown */}
                    {showFilters && (
                        <div className="md:hidden mt-4 pt-4 border-t space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {difficulties.map(diff => (
                                        <option key={diff} value={diff}>{diff}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest</option>
                                    <option value="shortest">Shortest</option>
                                    <option value="longest">Longest</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quiz Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {quizzes.map((quiz) => (
                        <QuizCardGrid quiz={quiz} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination />
            </main>
        </div>
    )
}
