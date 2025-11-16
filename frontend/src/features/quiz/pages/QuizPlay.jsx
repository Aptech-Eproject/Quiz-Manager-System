import { useEffect, useState } from 'react';
import {
    Clock,
    Trophy,
    CheckCircle,
    XCircle,
    AlertCircle,
    Home,
    RotateCcw,
    ArrowRight,
    ArrowLeft,
    Lightbulb
} from 'lucide-react';
import { runConfetti } from '../../../shared/utils/cannonEffect';
import { Link } from 'react-router-dom';

const QuizPlay = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    // const [timeElapsed, setTimeElapsed] = useState(82); // in seconds

    const quizData = {
        title: "Computer Science",
        category: "Computer Science",
        totalQuestions: 6,
        questions: [
            {
                id: 1,
                question: "What is the time complexity of binary search?",
                options: [
                    { label: "A", text: "O(n)" },
                    { label: "B", text: "O(log n)" },
                    { label: "C", text: "O(n²)" },
                    { label: "D", text: "O(1)" }
                ],
                correctAnswer: 1,
                explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity."
            },
            {
                id: 2,
                question: "Which data structure uses LIFO (Last In, First Out) principle?",
                options: [
                    { label: "A", text: "Queue" },
                    { label: "B", text: "Array" },
                    { label: "C", text: "Stack" },
                    { label: "D", text: "Tree" }
                ],
                correctAnswer: 2,
                explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed."
            },
            {
                id: 3,
                question: "What is merge sort's space complexity?",
                options: [
                    { label: "A", text: "O(1)" },
                    { label: "B", text: "O(log n)" },
                    { label: "C", text: "O(n)" },
                    { label: "D", text: "O(n²)" }
                ],
                correctAnswer: 2,
                explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging."
            },
            {
                id: 4,
                question: "In machine learning, what is overfitting?",
                options: [
                    { label: "A", text: "Model performs well on test but poorly on training data" },
                    { label: "B", text: "Model performs well on training but poorly on test data" },
                    { label: "C", text: "Model performs poorly on both training and test data" },
                    { label: "D", text: "Model performs well on both training and test data" }
                ],
                correctAnswer: 1,
                explanation: "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new, unseen data."
            },
            {
                id: 5,
                question: "What is the Big O notation for the average case of quicksort?",
                options: [
                    { label: "A", text: "O(log n)" },
                    { label: "B", text: "O(n)" },
                    { label: "C", text: "O(n log n)" },
                    { label: "D", text: "O(n²)" }
                ],
                correctAnswer: 2,
                explanation: "Quicksort has an average-case time complexity of O(n log n), though worst-case is O(n²)."
            },
            {
                id: 6,
                question: "What is a variable in programming?",
                options: [
                    { label: "A", text: "A condition" },
                    { label: "B", text: "A loop" },
                    { label: "C", text: "A storage location" },
                    { label: "D", text: "A function" }
                ],
                correctAnswer: 2,
                explanation: "A variable is a named storage location that can hold data values."
            }
        ]
    };

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

            if (currentQuestion < quizData.totalQuestions - 1) {
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
            if (answers[key] === quizData.questions[key].correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    // const formatTime = (seconds) => {
    //     const mins = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${mins}:${secs.toString().padStart(2, '0')}`;
    // };

    // Results Page
    if (showResults) {
        const score = calculateScore();
        const percentage = Math.round((score / quizData.totalQuestions) * 100);
        const level = percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement";

        console.log(score);
        console.log(percentage);
        console.log(level);

        // Scroll to top khi vừa show kết quả
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (score === quizData.totalQuestions || percentage >= 80) {
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
                        <p className="text-gray-600">Here's how you performed</p>
                    </div>

                    {/* Score Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {score}/{quizData.totalQuestions}
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
                                <div className="text-sm text-gray-600 mb-1">Time Taken</div>
                                {/* <div className="text-2xl font-bold text-blue-500">{formatTime(timeElapsed)}</div> */}
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
                                const userAnswer = answers[index];
                                const isCorrect = userAnswer === q.correctAnswer;

                                return (
                                    <div
                                        key={q.id}
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
                                                <div className="text-gray-800 mb-3">{q.question}</div>

                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Your answer: </span>
                                                        <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                            {q.options[userAnswer]?.text || "Not answered"}
                                                        </span>
                                                    </div>
                                                    {!isCorrect && (
                                                        <div>
                                                            <span className="text-gray-600">Correct answer: </span>
                                                            <span className="text-green-600 font-medium">
                                                                {q.options[q.correctAnswer].text}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 p-3 bg-white rounded-lg">
                                                    <div className="text-sm text-gray-700">
                                                        {q.explanation}
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
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium cursor-pointer">
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
    const progress = ((currentQuestion + 1) / quizData.totalQuestions) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {quizData.category}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5" />
                        {/* <span className="font-medium">{formatTime(timeElapsed)}</span> */}
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 font-medium">
                            Question {currentQuestion + 1} of {quizData.totalQuestions}
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
                            {currentQ.question}
                        </h2>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-4">
                        {currentQ.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;

                            return (
                                <button
                                    key={index}
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
                                            {option.label}
                                        </div>
                                        <span className={`text-lg ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                            {option.text}
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
                            : currentQuestion === quizData.totalQuestions - 1
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                            }`}
                    >
                        {currentQuestion === quizData.totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPlay;