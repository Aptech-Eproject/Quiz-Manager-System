import { Outlet, useParams } from "react-router-dom";

import QuizBuilderSidebar from "../components/QuizBuilderSidebar";
import QuizBuilderHeader from "../components/QuizBuilderHeader";

export default function QuizManager() {
    const { quizId } = useParams();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <QuizBuilderHeader quizId={quizId} />

            <main className="pt-30 max-w-7xl mx-auto w-full flex flex-1 bg-gray-100 p-7">
                <Outlet />
            </main>
        </div>
    );
}