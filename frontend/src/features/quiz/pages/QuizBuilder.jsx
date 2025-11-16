import {
    Trash2,
    Plus,
    Clock,
    Upload,
    AlertCircle,
    GripVertical,
    Pencil,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const QuizBuilder = () => {
    const [quizData, setQuizData] = useState({
        title: '',
        category: '',
        description: '',
        duration: '',
        level: 'Beginner',
        thumbnail: '',
        pass_score: 70,
        status: 'DRAFT'
    });

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        questionText: '',
        questionExplain: '',
        options: [
            { id: 1, optionText: '', isTrueOption: false },
            { id: 2, optionText: '', isTrueOption: false }
        ]
    });
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState(null);

    const categories = [
        'Programming',
        'Science',
        'Mathematics',
        'Languages',
        'History',
        'Arts',
        'Business',
        'Other'
    ];

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    // Handle Quiz Data Changes
    const handleQuizChange = (field, value) => {
        setQuizData(prev => ({ ...prev, [field]: value }));
    };

    // Handle Question Changes
    const handleQuestionChange = (field, value) => {
        setCurrentQuestion(prev => ({ ...prev, [field]: value }));
    };

    // Handle Option Changes
    const handleOptionChange = (optionId, field, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.map(opt => {
                if (field === 'isTrueOption' && value) {
                    return opt.id === optionId
                        ? { ...opt, isTrueOption: true }
                        : { ...opt, isTrueOption: false };
                }
                return opt.id === optionId
                    ? { ...opt, [field]: value }
                    : opt;
            })
        }));
    };

    // Add New Option
    const handleAddOption = () => {
        if (currentQuestion.options.length < 5) {
            const newOption = {
                id: Date.now(),
                optionText: '',
                isTrueOption: false
            };
            setCurrentQuestion(prev => ({
                ...prev,
                options: [...prev.options, newOption]
            }));
        }
    };

    // Delete Option
    const handleDeleteOption = (optionId) => {
        if (currentQuestion.options.length > 2) {
            setCurrentQuestion(prev => ({
                ...prev,
                options: prev.options.filter(opt => opt.id !== optionId)
            }));
        }
    };

    // Save Question
    const handleSaveQuestion = () => {
        if (currentQuestion.questionText.trim() &&
            currentQuestion.options.some(opt => opt.isTrueOption) &&
            currentQuestion.options.every(opt => opt.optionText.trim())) {

            if (editingQuestionId) {
                setQuestions(prev => prev.map(q =>
                    q.id === editingQuestionId
                        ? { ...currentQuestion, id: editingQuestionId }
                        : q
                ));
                setEditingQuestionId(null);
            } else {
                setQuestions(prev => [...prev, { ...currentQuestion, id: Date.now() }]);
            }

            // Reset form
            setCurrentQuestion({
                questionText: '',
                questionExplain: '',
                options: [
                    { id: Date.now(), optionText: '', isTrueOption: false },
                    { id: Date.now() + 1, optionText: '', isTrueOption: false }
                ]
            });
            setIsAddingQuestion(false);
        }
    };

    // Edit Question
    const handleEditQuestion = (question) => {
        setCurrentQuestion(question);
        setEditingQuestionId(question.id);
        setIsAddingQuestion(true);
    };

    // Delete Question
    const handleDeleteQuestion = (questionId) => {
        setQuestions(prev => prev.filter(q => q.id !== questionId));
    };

    // Cancel Adding/Editing Question
    const handleCancelQuestion = () => {
        setCurrentQuestion({
            questionText: '',
            questionExplain: '',
            options: [
                { id: Date.now(), optionText: '', isTrueOption: false },
                { id: Date.now() + 1, optionText: '', isTrueOption: false }
            ]
        });
        setIsAddingQuestion(false);
        setEditingQuestionId(null);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen bg-white flex-1 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
            <div className="max-w-7xl mx-auto border border-gray-400">
                {/* Title Page */}
                <div className='w-full border-b p-8 max-w-7xl px md:px-12'>
                    <p className='font-bold text-2xl'>
                        Quiz Builder
                    </p>
                </div>

                {/* Notes */}
                <div className="flex flex-col space-y-13 w-full h-full py-10 px-12">
                    {/* Notice */}
                    <div className="flex flex-col gap-y-2">
                        <p>
                            When creating your quiz, focus on writing questions that are clear and easy to understand. Provide 3–4 answer options for each question so learners have a fair chance to choose the correct one.
                        </p>
                        <p>
                            Be sure to include explanations for the correct answers, helping learners grasp the underlying concepts. Also, set a reasonable passing score, usually between 60–80%, to fairly evaluate their understanding while keeping the quiz challenging."
                        </p>
                    </div>

                </div>

                <div className="grid lg:grid-cols-1 gap-8 px-12 mt-5">
                    {/* Main Content */}
                    <div className="lg:col-span-1 space-y-16">
                        {/* Basic Information */}
                        <div className="bg-white">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Basic Information
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Thumbnail */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Thumbnail Image
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 mb-1">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            PNG, JPG up to 5MB
                                        </p>
                                    </div>
                                </div>

                                {/* Quiz Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Quiz Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={quizData.title}
                                        onChange={(e) => handleQuizChange('title', e.target.value)}
                                        placeholder="Enter quiz title..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={quizData.category}
                                        onChange={(e) => handleQuizChange('category', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={quizData.description}
                                        onChange={(e) => handleQuizChange('description', e.target.value)}
                                        placeholder="Describe what this quiz covers..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Duration & Level */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Duration (minutes)
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="number"
                                                value={quizData.duration}
                                                onChange={(e) => handleQuizChange('duration', e.target.value)}
                                                placeholder="30"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Difficulty Level
                                        </label>
                                        <select
                                            value={quizData.level}
                                            onChange={(e) => handleQuizChange('level', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {levels.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Pass Score */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pass Score (%)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={quizData.pass_score}
                                            onChange={(e) => handleQuizChange('pass_score', e.target.value)}
                                            className="flex-1"
                                        />
                                        <span className="text-2xl font-bold text-black min-w-[60px]">
                                            {quizData.pass_score}%
                                        </span>
                                    </div>
                                </div>

                                {/* Thumbnail */}

                            </div>
                        </div>

                        {/* Questions Section */}
                        <div className="bg-white pb-15">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Questions
                                        </h2>
                                        <p className="text-sm text-gray-500">{questions.length} questions added</p>
                                    </div>
                                </div>

                                {!isAddingQuestion && (
                                    <button
                                        onClick={() => setIsAddingQuestion(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Question
                                    </button>
                                )}
                            </div>

                            {/* Add/Edit Question Form */}
                            {isAddingQuestion && (
                                <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {editingQuestionId ? 'Edit Question' : 'New Question'}
                                        </h3>
                                        <button
                                            onClick={handleCancelQuestion}
                                            className="p-1 hover:bg-white rounded-lg transition"
                                        >
                                            <X className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Question Text */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Question <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={currentQuestion.questionText}
                                                onChange={(e) => handleQuestionChange('questionText', e.target.value)}
                                                placeholder="Enter your question..."
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            />
                                        </div>

                                        {/* Question Explanation */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Explanation (Optional)
                                            </label>
                                            <textarea
                                                value={currentQuestion.questionExplain}
                                                onChange={(e) => handleQuestionChange('questionExplain', e.target.value)}
                                                placeholder="Provide additional context or explanation..."
                                                rows={2}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            />
                                        </div>

                                        {/* Options */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-sm font-semibold text-gray-700">
                                                    Answer Options <span className="text-red-500">*</span>
                                                </label>
                                                <button
                                                    onClick={handleAddOption}
                                                    disabled={currentQuestion.options.length >= 5}
                                                    className="text-sm px-3 py-1 border border-gray-600 text-black rounded-md hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    + New Option
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {currentQuestion.options.map((option, index) => (
                                                    <div key={option.id} className="flex items-start gap-3 group">
                                                        {/* Radio Button */}
                                                        <div className="pt-3">
                                                            <input
                                                                type="radio"
                                                                checked={option.isTrueOption}
                                                                onChange={() => handleOptionChange(option.id, 'isTrueOption', true)}
                                                                className="w-5 h-5 accent-green-600 cursor-pointer"
                                                            />
                                                        </div>

                                                        {/* Option Content */}
                                                        <div className="flex-1 space-y-2">
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-3 text-sm font-bold text-gray-400">
                                                                    {String.fromCharCode(65 + index)}.
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    value={option.optionText}
                                                                    onChange={(e) => handleOptionChange(option.id, 'optionText', e.target.value)}
                                                                    placeholder="Enter answer option..."
                                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Delete Button */}
                                                        {currentQuestion.options.length > 2 && (
                                                            <button
                                                                onClick={() => handleDeleteOption(option.id)}
                                                                className="mt-2 p-2 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 className="w-5 h-5 text-red-500" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-sm text-gray-500 mt-3">
                                                Select the correct answer by clicking the radio button. Add up to 5 options.
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-end gap-3 pt-4">
                                            <button
                                                onClick={handleCancelQuestion}
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveQuestion}
                                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={
                                                    !currentQuestion.questionText.trim() ||
                                                    !currentQuestion.options.some(opt => opt.isTrueOption) ||
                                                    !currentQuestion.options.every(opt => opt.optionText.trim())
                                                }
                                            >
                                                {editingQuestionId ? 'Update Question' : 'Save Question'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Questions List */}
                            {questions.length > 0 ? (
                                <div className="space-y-3">
                                    {questions.map((question, index) => (
                                        <div
                                            key={question.id}
                                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <span className="font-bold text-gray-900">Q{index + 1}.</span>
                                                            <span className="ml-2 text-gray-800">{question.questionText}</span>
                                                        </div>
                                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                                            <button
                                                                onClick={() => handleEditQuestion(question)}
                                                                className="p-1.5 hover:bg-blue-100 rounded-lg transition"
                                                            >
                                                                <Pencil className="w-4 h-4 text-blue-600" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteQuestion(question.id)}
                                                                className="p-1.5 hover:bg-red-100 rounded-lg transition"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="ml-6 text-sm text-gray-600">
                                                        {question.options.length} options •
                                                        <span className="text-green-600 font-medium ml-1">
                                                            Correct: {question.options.find(o => o.isTrueOption)?.optionText}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center pb-16">
                                    <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">
                                        No questions added yet
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Click "Add Question" to create your first question
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizBuilder;
