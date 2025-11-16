import { Link } from "react-router-dom";

import QuizCardGrid from "../../features/quiz/components/QuizCardGrid";

export default function FeaturedQuizzes() {
    const featuredQuizzes = [
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
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop"
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
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop"
        },
        {
            id: 4,
            title: "Science & Nature",
            description: "Discover the wonders of our planet and the science behind it",
            questions: 30,
            difficulty: "Intermediate",
            participants: 1675,
            rating: 4.7,
            duration: "35 min",
            category: "Science",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop"
        },
        {
            id: 5,
            title: "Geography Challenge",
            description: "Test your knowledge of countries, capitals, and world landmarks",
            questions: 25,
            difficulty: "Intermediate",
            participants: 1402,
            rating: 4.8,
            duration: "30 min",
            category: "Geography",
            image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=250&fit=crop"
        },
        {
            id: 6,
            title: "English Vocabulary Master",
            description: "Improve your English vocabulary and test your word power",
            questions: 35,
            difficulty: "Beginner",
            participants: 1987,
            rating: 4.9,
            duration: "25 min",
            category: "Language",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
        }

    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 bg-white">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Featured Quizzes
                </h2>
                <Link
                    to='quizzes-list'
                    className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-2 cursor-pointer "
                >
                    View All
                    <span>→</span>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredQuizzes.map((quiz) => (
                    <QuizCardGrid key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </section>
    )
}
