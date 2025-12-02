import {
    useEffect,
    useState
} from 'react';
import {
    Trophy,
    CheckCircle,
    XCircle,
    AlertCircle,
    Home,
    RotateCcw,
    ArrowRight,
    ArrowLeft,
    Lightbulb,
    Loader2
} from 'lucide-react';
import { runConfetti } from '../../../shared/utils/cannonEffect';
import { Link, useParams } from 'react-router-dom';
import { quizAPI } from '../../../shared/services/api';
import { toast } from 'react-toastify';

const QuizPlay = () => {
    const [quizData, setQuizData] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(true);

    const { quizId } = useParams();

    const getOptionLabel = (index) => {
        return String.fromCharCode(65 + index);
    };

    useEffect(() => {
        const fetchQuizPlay = async () => {
            try {
                setLoading(true);
                const response = await quizAPI.getById(quizId);
                setQuizData(response.data.data);
                console.log("Quiz play:", response.data.data);

            } catch (err) {
                toast.error('Failed to fetch quiz:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizPlay();
    }, [quizId]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer !== null) {
            const newAnswers = { ...answers };
            newAnswers[currentQuestion] = selectedAnswer;
            setAnswers(newAnswers);
            setSelectedAnswer(null);

            if (currentQuestion < quizData.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(answers[currentQuestion - 1] ?? null);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        Object.keys(answers).forEach((key) => {
            if (quizData.questions[key].options[answers[key]].isTrueOption) {
                correct++;
            }
        });
        return correct;
    };

    const handlePlayAgain = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswers({});
        setShowResults(false);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                        <Loader2 className="w-6 h-6 inline-block mr-2 animate-spin" />
                        Loading quiz...
                    </p>
                </div>
            </div>
        );
    }

    if (!quizData.questions || quizData.questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 font-medium">
                        Quiz not found or has no questions
                    </p>
                </div>
            </div>
        );
    }

    // Results Page
    if (showResults) {
        const score = calculateScore();
        const percentage = Math.round((score / quizData.questions.length) * 100);
        const level = percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement";

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (score === quizData.questions.length || percentage >= 80) {
            runConfetti();
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Results Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Quiz Complete!
                        </h1>
                        <p className="text-gray-600">
                            Here's how you performed
                        </p>
                    </div>

                    {/* Score Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {score}/{quizData.questions.length}
                            </div>
                            <div className="text-2xl text-gray-400 mb-4">({percentage}%)</div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                <span className="font-medium text-gray-700">{level}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-8">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">Score</div>
                                <div className="text-2xl font-bold text-red-500">{percentage}%</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">Questions</div>
                                <div className="text-2xl font-bold text-blue-500">{quizData.questions.length}</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">Level</div>
                                <div className="text-lg font-bold text-purple-500">{level}</div>
                            </div>
                        </div>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-600 mb-1">Category</div>
                            <div className="text-lg font-semibold text-gray-900">{quizData.category}</div>
                        </div>
                    </div>

                    {/* Question Review */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertCircle className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Question Review</h2>
                        </div>

                        <div className="space-y-6">
                            {quizData.questions.map((q, index) => {
                                const userAnswerIndex = answers[index];
                                const userAnswerOption = q.options[userAnswerIndex];
                                const isCorrect = userAnswerOption?.isTrueOption;

                                const correctOption = q.options.find(opt => opt.isTrueOption);
                                const correctOptionIndex = q.options.indexOf(correctOption);

                                return (
                                    <div
                                        key={q.questionId}
                                        className={`p-6 rounded-xl border-l-4 ${isCorrect
                                            ? 'bg-green-50 border-green-500'
                                            : 'bg-red-50 border-red-500'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            {isCorrect ? (
                                                <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-900 mb-2">
                                                    Question {index + 1}
                                                </div>
                                                <div className="text-gray-800 mb-3">{q.questionText}</div>

                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Your answer: </span>
                                                        <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                            ({getOptionLabel(userAnswerIndex)}) {userAnswerOption?.optionText || "Not answered"}
                                                        </span>
                                                    </div>
                                                    {!isCorrect && (
                                                        <div>
                                                            <span className="text-gray-600">Correct answer: </span>
                                                            <span className="text-green-600 font-medium">
                                                                ({getOptionLabel(correctOptionIndex)}) {correctOption?.optionText}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 p-3 bg-white rounded-lg">
                                                    <div className="text-sm text-gray-700">
                                                        {q.explanation || "No explanation provided"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                        <Link to='/' className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium cursor-pointer">
                            <Home className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <button
                            onClick={handlePlayAgain}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium cursor-pointer"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Play again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Quiz Play Page
    const currentQ = quizData.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-bold text-xl">
                            {quizData.title}
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {quizData.category}
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 font-medium">
                            Question {currentQuestion + 1} of {quizData.questions.length}
                        </span>
                        <span className="text-gray-600 font-medium">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex items-start gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shrink-0">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                            {currentQ.questionText}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-4">
                        {currentQ.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;

                            return (
                                <button
                                    key={option.optionId}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`w-full p-5 rounded-xl border-2 transition-all text-left cursor-pointer ${isSelected
                                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0 ${isSelected
                                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {getOptionLabel(index)}
                                        </div>
                                        <span className={`text-lg ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                            {option.optionText}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition cursor-pointer ${currentQuestion === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition cursor-pointer ${selectedAnswer === null
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : currentQuestion === quizData.questions.length - 1
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                            }`}
                    >
                        {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPlay;