import { useNavigate } from "react-router-dom";

export default function CreateStepTwoFooter({ category }) {
    const navigate = useNavigate();

    const handlePreviousStep = () => {
        navigate("/admin/create-quiz/step-1");
    }

    const handleCreateQuiz = () => {
        navigate("/admin/manage/quiz/1/builder");
    }

    return (
        <footer className="bg-white shadow-sm">
            <div>
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center justify-between w-full space-x-4 px-6">
                        {/* Previous button */}
                        <button
                            onClick={handlePreviousStep}
                            className="px-5 py-2 cursor-pointer border bg-transparent text-blue-600 font-bold rounded-md hover:bg-blue-100 transition duration-300">
                            Previous
                        </button>

                        {/* Create Quiz button */}
                        <button
                            onClick={handleCreateQuiz}
                            className="w-36 px-5 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-md shadow hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={category === ""}
                        >
                            Create Quiz
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
