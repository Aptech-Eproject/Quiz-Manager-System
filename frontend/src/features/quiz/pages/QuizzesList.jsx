import {
    ChevronDown,
    Filter,
    Package,
    Plus,
    Search
} from "lucide-react";
import { useEffect, useState } from "react";

import BlueContainer from "../../../shared/components/BlueContainer";
import QuizCardGrid from "../components/QuizCardGrid";
import Pagination from "../../../shared/components/Pagination";
import UserHeader from "../../../shared/components/UserHeader";
import { quizAPI } from "../../../shared/services/api";
import { Link } from "react-router-dom";

export default function QuizzesList() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [sortBy, setSortBy] = useState('popular');

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchQuizzes = async (page) => {
        try {
            setLoading(true);

            const quizzes = await quizAPI.getAll(page);
            setAllQuizzes(quizzes.data.data.quizzes);

            setCurrentPage(quizzes.data.data.currentPage);
            setTotalPages(quizzes.data.data.totalPages);

        } catch (err) {
            console.log("Failed to fetch all quizzes:", err);
        } finally {
            setLoading(false);
        }
    };

    // Apply filters and search
    useEffect(() => {
        let result = [...allQuizzes];

        // Search
        if (searchText) {
            result = result.filter(quiz =>
                quiz.title.toLowerCase().includes(searchText.toLowerCase()) ||
                quiz.category.toLowerCase().includes(searchText.toLowerCase()) ||
                (quiz.description && quiz.description.toLowerCase().includes(searchText.toLowerCase()))
            );
        }

        // Category
        if (selectedCategory !== 'All') {
            result = result.filter(quiz => quiz.category === selectedCategory);
        }

        // Difficulty
        if (selectedDifficulty !== 'All') {
            const normalizedDifficulty = selectedDifficulty.toLowerCase();
            result = result.filter(quiz =>
                quiz.level.toLowerCase() === normalizedDifficulty
            );
        }

        // Sort
        // if (sortBy === 'popular') {
        //     result.sort((a, b) => (b.views || 0) - (a.views || 0));
        // } else if (sortBy === 'rating') {
        //     result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        // } else if (sortBy === 'newest') {
        //     result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // } else if (sortBy === 'shortest') {
        //     result.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        // } else if (sortBy === 'longest') {
        //     result.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        // }

        setFilteredQuizzes(result);
    }, [allQuizzes, searchText, selectedCategory, selectedDifficulty, sortBy]);

    useEffect(() => {
        fetchQuizzes(currentPage);
    }, [currentPage]);

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No quizzes found
            </h3>
            <p className="text-gray-600 text-center mb-6">
                {searchText || selectedCategory !== 'All' || selectedDifficulty !== 'All'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start by creating your first quiz'}
            </p>
        </div>
    );

    const handlePageChange = (newPage) => {
        if (currentPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    const categories = [
        'All',
        'Mathematics',
        'Science',
        'History',
        'English',
        'Programming',
        'Music',
        'Sport',
        'Art',
        'Business',
        'Healthy'
    ];

    const levels = [
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

    if (loading) console.log(`Loading...`);
    else console.log(`End loading....`);

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
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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

                        {/* Desktop Filters */}
                        <div className="hidden md:flex flex-wrap items-center gap-4 flex-1">
                            {/* Category Filters */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                    Category:
                                </span>
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
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
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {levels.map(lev => (
                                            <option key={lev} value={lev}>
                                                {lev}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Sort By
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
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
                            </div> */}
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            Showing {" "}
                            <span className="font-semibold text-gray-900">{filteredQuizzes.length}</span> quizzes
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
                                    {levels.map(lev => (
                                        <option key={lev} value={lev}>
                                            {lev}
                                        </option>
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

                {filteredQuizzes.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {filteredQuizzes.map((quiz) => (
                                <QuizCardGrid quiz={quiz} key={quiz.quizId} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="p-6 mb-8 flex items-center justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}

            </main>
        </div>
    )
}