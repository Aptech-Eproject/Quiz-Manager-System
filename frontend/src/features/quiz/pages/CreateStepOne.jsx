import CreateStepOneHeader from "../components/CreateStepOneHeader";
import CreateStepOneFooter from "../components/CreateStepOneFooter";

export default function CreateStepOne({ title, setTitle }) {

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <CreateStepOneHeader />

                {/* Progress Bar */}
                <div className="border-b-4 border-blue-800 w-1/2 transition" />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto w-full p-20 flex-1">
                    <div className="flex flex-col items-center justify-start h-full space-y-15">
                        <div className="flex flex-col space-y-5 justify-center items-center">
                            <p className="font-extrabold text-3xl">
                                How about a working title?
                            </p>
                            <p className="font-semibold text-gray-800">
                                It's ok if you can't think of a good title now. You can change it later.
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <input
                                type="text"
                                placeholder="e.g. Learn Photoshop CS6 from Scratch"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-150 px-5 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                            />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <CreateStepOneFooter title={title} />
            </div>
        </>
    );
} 