import {
    Award,
    BarChart3,
    Heart,
    Users,
} from "lucide-react";

export default function StatsGrid({ stats }) {
    if (!stats) return null;

    const questions = stats.questions || [];
    const quizData = stats.quizData || { pass_score: 0, duration: 0 };

    return (
        <div className="flex flex-col gap-10 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl py-8 dark:border-slate-700/50 transition-all duration-300 group">
            <h3 className="font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <BarChart3 className="w-7 h-7 text-blue-600" />
                <p className="font-bold text-2xl">
                    Quick Stats
                </p>
            </h3>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                    <div className="flex flex-col items-center justify-center bg-gray-50 hover:shadow-md shadow:sm dark:bg-blue-900/20 rounded-lg gap-y-4 py-4">
                        <span className="text-xl text-gray-600 dark:text-gray-400 mb-1">
                            Questions
                        </span>
                        <span className="text-3xl font-bold text-black">
                            {questions.length || 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 hover:shadow-md shadow:sm dark:bg-purple-900/20 rounded-lg gap-y-4 py-4">
                        <span className="text-xl text-gray-600 dark:text-gray-400 mb-1">
                            Pass Score
                        </span>
                        <span className="text-3xl font-bold text-black">
                            {quizData.pass_score || 0}%
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 hover:shadow-md shadow:sm dark:bg-green-900/20 rounded-lg gap-y-4 py-4">
                        <span className="text-xl text-gray-600 dark:text-gray-400 mb-1">
                            Duration
                        </span>
                        <span className="text-3xl font-bold text-black">
                            {quizData.duration || '--'}m
                        </span>
                    </div>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 ">
                {/* Total Participants */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-300/50 shadow-xs dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                                Total Participants
                            </p>
                            <p className="text-3xl pb-0 mb-0 font-bold text-slate-800 dark:text-white">
                                1,234
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-100 group-hover:scale-110 transition-all duration-300">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Total Favorites */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-300/50 shadow-xs dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                                Total Favorites
                            </p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-white">
                                892
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-100 group-hover:scale-110 transition-all duration-300">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        </div>
                    </div>
                </div>

                {/* Average Score */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-300/50 shadow-xs dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                                Average Score
                            </p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-white">
                                82%
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-100 group-hover:scale-110 transition-all duration-300">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
