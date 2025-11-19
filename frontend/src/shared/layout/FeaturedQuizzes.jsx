import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { quizAPI } from "../services/api";

import QuizCardGrid from "../../features/quiz/components/QuizCardGrid";

export default function FeaturedQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);

                const quizzes = await quizAPI.showHome();
                setQuizzes(quizzes.data.data);

            } catch (err) {
                console.log("Failed to fetch all quizzes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);


    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
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
                    {quizzes.map((quiz) => (
                        <QuizCardGrid key={quiz.id} quiz={quiz} />
                    ))}
                </div>
            </div>
        </section>
    )
}
