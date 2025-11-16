import { useNavigate } from "react-router-dom";

export default function CreateStepOneFooter({ title }) {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/admin/create-quiz/step-2");
    }

    return (
        <footer className="bg-white shadow-sm">
            <div>
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center justify-end w-full space-x-4 px-6">
                        {/* Continue button */}
                        <button
                            onClick={handleContinue}
                            className="w-36 px-5 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-md shadow hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={!title}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
