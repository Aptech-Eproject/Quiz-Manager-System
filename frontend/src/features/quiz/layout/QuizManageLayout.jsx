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
                {/* <div className="flex w-full space-y-10 space-x-10"> */}
                {/* Sidebar */}
                {/* <QuizBuilderSidebar quizId={quizId} /> */}

                <Outlet />
                {/* </div> */}
            </main>
        </div>
    );
}