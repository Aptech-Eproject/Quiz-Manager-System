import { ArrowDown } from "lucide-react";

import CreateStepTwoFooter from "../components/CreateStepTwoFooter";
import CreateStepTwoHeader from "../components/CreateStepTwoHeader";

export default function CreateStepTwo({ title, category, setCategory }) {
    return (
        <>
            <div className="w-screen h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <CreateStepTwoHeader />

                {/* Progress Bar */}
                <div className="border-b-4 border-blue-800 w-full transition" />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto w-full p-20 flex-1">
                    <div className="flex flex-col items-center justify-start h-full space-y-15">
                        <div className="flex flex-col space-y-5 justify-center items-center">
                            <p className="font-extrabold text-3xl">What category best fits the knowledge you'll share?</p>
                            <p className="font-semibold text-gray-800">If you're not sure about the right category, you can change it later.</p>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <div className="relative">
                                {/* Sort dropdown */}
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="appearance-none w-150 px-3 pr-10 py-2 border border-gray-400 rounded-md text-sm text-gray-600 font-semibold focus:outline-none focus:ring-purple-800 cursor-pointer"
                                >
                                    <option value="">Choose a category</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Science">Science</option>
                                    <option value="History">History</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Languages">Languages</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Geography">Geography</option>
                                </select>


                                {/* Custom arrow */}
                                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-purple-800">
                                    <ArrowDown className="w-5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <CreateStepTwoFooter title={title} category={category} />
            </div>
        </>
    );
}