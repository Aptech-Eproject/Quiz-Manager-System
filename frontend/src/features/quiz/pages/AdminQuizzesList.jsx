import {
    ChevronDown,
    Filter,
    Grid3x3,
    Hand,
    List,
    Plus,
    Search
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../../shared/components/Pagination";
import AdminQuizCardList from "../components/AdminQuizCardList";
import AdminQuizCardGrid from "../components/AdminQuizCardGrid";

export default function QuizzesList() {
    const user = 'name';

    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [status, setStatus] = useState('popular');

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
            trending: true,
            status: 'DRAFT'
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
            status: 'DRAFT'
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
            featured: true,
            status: 'DRAFT'
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
            status: 'DRAFT'
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
            status: 'DRAFT'
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
            trending: true,
            status: 'Public'
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
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=250&fit=crop",
            status: 'Public'
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
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop",
            status: 'Public'
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
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop",
            status: 'Public'
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
        if (localStorage.getItem('viewMode') === 'list') {
            setViewMode('list');
        } else {
            setViewMode('grid');
        }
    }, [viewMode]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-5">
                {/* Greeting */}
                <div className="mb-2 flex flex-col items-center gap-2 bg-white shadow-sm p-8 rounded-md text-center w-full">
                    <div className="flex items-center justify-center gap-3">
                        <Hand className="w-6 h-6 fill-yellow-500" />
                        <p className="text-xl font-bold text-gray-800">
                            Welcome back, {user.name || 'Marseille Hau'}
                        </p>
                    </div>

                    <p className="text-gray-600 text-sm">
                        Manage your workplace quizzes and settings here.
                    </p>
                </div>

                {/* Main Content */}
                <div className="p-6 mb-8">
                    {/* Header */}
                    <div className="mb-5 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            My Quizzes
                        </h1>

                        <div className="flex items-center gap-10">
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2">
                                <span>
                                    View Mode:
                                </span>
                                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => {
                                            setViewMode('grid');
                                            localStorage.setItem('viewMode', 'grid');
                                        }}
                                        className={`p-2 rounded cursor-pointer ${viewMode === 'grid'
                                            ? 'bg-white shadow-sm text-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <Grid3x3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setViewMode('list');
                                            localStorage.setItem('viewMode', 'list');
                                        }}
                                        className={`p-2 rounded cursor-pointer ${viewMode === 'list'
                                            ? 'bg-white shadow-sm text-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* New Quiz Button */}
                            <Link
                                to='/admin/create-quiz/step-1'
                                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                New Quiz
                            </Link>
                        </div>
                    </div>

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
                    <div className="flex flex-wrap items-center gap-4 mb-15">
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
                                <span className="text-sm text-gray-600 font-medium">Difficulty:</span>
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

                            {/* Status */}
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-600 font-medium">
                                    Status:
                                </span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="popular">
                                            Most Popular
                                        </option>
                                        <option value="rating">
                                            Highest Rated
                                        </option>
                                        <option value="newest">
                                            Newest
                                        </option>
                                        <option value="shortest">
                                            Shortest
                                        </option>
                                        <option value="longest">
                                            Longest
                                        </option>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="popular">
                                        Most Popular
                                    </option>
                                    <option value="rating">
                                        Highest Rated
                                    </option>
                                    <option value="newest">
                                        Newest
                                    </option>
                                    <option value="shortest">
                                        Shortest
                                    </option>
                                    <option value="longest">
                                        Longest
                                    </option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Quizzes List - Grid View */}
                    {viewMode === 'grid' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-15">
                            {quizzes.map((quiz) => (
                                <AdminQuizCardGrid
                                    key={quiz.id}
                                    quiz={quiz}
                                />
                            ))}
                        </div>
                    )}

                    {/* Quizzes List - List View */}
                    {viewMode === 'list' && (
                        <div className="space-y-6 pb-20">
                            {quizzes.map((quiz, index) => (
                                <AdminQuizCardList
                                    key={index}
                                    quiz={quiz}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination />
                </div>
            </div>
        </div>
    )
}
