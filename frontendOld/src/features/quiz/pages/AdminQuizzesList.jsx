import {
    ChevronDown,
    Filter,
    Grid3x3,
    Hand,
    List,
    Plus,
    Search,
    Package
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../../shared/components/Pagination";
import AdminQuizCardList from "../components/AdminQuizCardList";
import AdminQuizCardGrid from "../components/AdminQuizCardGrid";
import { quizAPI } from "../../../shared/services/api";
import AdminHeader from "../../../shared/components/AdminHeader";

export default function QuizzesList() {
    const user = 'Maarseille Hau';

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    // const [sortBy, setSortBy] = useState('popular');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

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

    const difficulties = [
        'All',
        'Beginner',
        'Intermediate',
        'Advanced'
    ];

    const fetchQuizzes = async (page) => {
        try {
            setLoading(true);
            const quizzes = await quizAPI.getAllAdmin(page, true);
            setAllQuizzes(quizzes.data.data.quizzes);
            setCurrentPage(quizzes.data.data.currentPage);
            setTotalPages(quizzes.data.data.totalPages);
        } catch (err) {
            console.log("Failed to fetch all quizzes:", err);
        } finally {
            setLoading(false);
        }
    };

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
        // }

        setFilteredQuizzes(result);
    }, [allQuizzes, searchText, selectedCategory, selectedDifficulty]);

    useEffect(() => {
        fetchQuizzes(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (currentPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('viewMode') === 'list') {
            setViewMode('list');
        } else {
            setViewMode('grid');
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-600 text-center mb-6">
                {searchText || selectedCategory !== 'All' || selectedDifficulty !== 'All'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start by creating your first quiz'}
            </p>
            {!(searchText || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
                <Link
                    to='/admin/create-quiz/step-1'
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Create First Quiz
                </Link>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <AdminHeader />

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
                                <span>View Mode:</span>
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
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Level Filter */}
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
                                        {difficulties.map(diff => (
                                            <option key={diff} value={diff}>{diff}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Sort By */}
                            {/* <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-600 font-medium">
                                    Sort by:
                                </span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="newest">Newest</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div> */}
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredQuizzes.length}</span> quizzes
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
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div> */}
                        </div>
                    )}

                    {/* ✅ Empty State OR Content */}
                    {filteredQuizzes.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {loading ? (
                                <div className="w-full flex justify-center py-10">
                                    {/* Loading placeholder */}
                                </div>
                            ) : (
                                <>
                                    {/* Grid View */}
                                    {viewMode === 'grid' && (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-15">
                                            {filteredQuizzes.map((quiz) => (
                                                <AdminQuizCardGrid
                                                    key={quiz.quizId}
                                                    quiz={quiz}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* List View */}
                                    {viewMode === 'list' && (
                                        <div className="space-y-6 pb-20">
                                            {filteredQuizzes.map((quiz) => (
                                                <AdminQuizCardList
                                                    key={quiz.quizId}
                                                    quiz={quiz}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    <div className="flex justify-center mt-8">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            handlePageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}