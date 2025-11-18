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
import { useParams } from 'react-router-dom';
import { questionAPI, quizAPI } from '../../../shared/services/api';
import QuizBuilderSidebar from '../components/QuizBuilderSidebar';

const QuizBuilder = () => {
    const { quizId } = useParams();

    const [quizData, setQuizData] = useState({
        title: '',
        category: '',
        description: '',
        duration: '',
        level: '',
        thumbnail: '',
        pass_score: '',
        status: '',
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        questionText: '',
        questionExplain: '',
        options: [
            { id: Date.now(), optionText: '', isTrueOption: false },
            { id: Date.now() + 1, optionText: '', isTrueOption: false }
        ]
    });

    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [saving, setSaving] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    useEffect(() => {
        const handleFetchQuizData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch quiz details
                const { data: quizResponse } = await quizAPI.getById(quizId);
                const quiz = quizResponse.data;

                // Fetch all questions with options
                const { data: questionsResponse } = await questionAPI.getAll(quizId);
                const questions = questionsResponse.data || [];

                setQuizData({
                    title: quiz.title || '',
                    category: quiz.category || '',
                    description: quiz.description || '',
                    duration: quiz.duration || '',
                    level: quiz.level || 'Beginner',
                    thumbnail: quiz.thumbnail || '',
                    pass_score: quiz.pass_score || 70,
                    status: quiz.status || 'draft',
                    questions: questions
                });

                console.log('✅ Quiz data loaded:', {
                    quizId,
                    title: quiz.title,
                    questionsCount: questions.length
                });

            } catch (err) {
                console.error("❌ Failed to fetch quiz data:", err);
                setError(err.message || 'Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            handleFetchQuizData();
        }
    }, [quizId]);

    const categories = [
        'Mathematics',
        'Science',
        'History',
        'English',
        'Programming',
        'Music',
        'Sport',
        'Art',
        'Business',
        'Healthy'
    ];

    console.log(thumbnailFile);

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    // Handle Quiz Data Changes
    const handleQuizChange = (field, value) => {
        setQuizData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle Question Changes
    const handleQuestionChange = (field, value) => {
        setCurrentQuestion(prev => ({
            ...prev,
            [field]: value
        }));
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

    const handleSaveQuestion = async () => {
        // Validation
        if (!currentQuestion.questionText.trim()) {
            alert('Please enter question text');
            return;
        }

        if (!currentQuestion.options.some(opt => opt.isTrueOption)) {
            alert('Please select at least one correct answer');
            return;
        }

        if (!currentQuestion.options.every(opt => opt.optionText.trim())) {
            alert('Please fill in all option texts');
            return;
        }

        try {
            setSaving(true);

            // Prepare data for API
            const questionData = {
                questionText: currentQuestion.questionText.trim(),
                questionExplain: currentQuestion.questionExplain?.trim() || '',
                options: currentQuestion.options.map(opt => ({
                    optionText: opt.optionText.trim(),
                    isTrueOption: opt.isTrueOption
                }))
            };

            if (editingQuestionId) {
                // ✅ UPDATE existing question
                const { data } = await questionAPI.update(quizId, editingQuestionId, questionData);
                const updatedQuestion = data.data;

                // Update local state
                setQuizData(prev => ({
                    ...prev,
                    questions: prev.questions.map(q =>
                        q.questionId === editingQuestionId
                            ? updatedQuestion
                            : q
                    )
                }));

                alert('Question updated successfully!');

            } else {
                // CREATE new question
                const { data } = await questionAPI.create(quizId, questionData);
                const newQuestion = data.data;

                // Add to local state
                setQuizData(prev => ({
                    ...prev,
                    questions: [
                        ...prev.questions,
                        newQuestion
                    ]
                }));

                alert('Question created successfully!');
            }

            // Reset form
            setCurrentQuestion({
                questionText: '',
                questionExplain: '',
                options: [
                    {
                        id: Date.now(),
                        optionText: '',
                        isTrueOption: false
                    },
                    {
                        id: Date.now() + 1,
                        optionText: '',
                        isTrueOption: false
                    }
                ]
            });

            setIsAddingQuestion(false);
            setEditingQuestionId(null);

        } catch (err) {
            console.error('❌ Failed to save question:', err);
            alert(`Failed to save question: ${err.response?.data?.message || err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleEditQuestion = (question) => {
        const normalizedQuestion = {
            ...question,
            options: question.options.map((opt, index) => ({
                ...opt,
                id: Date.now() + index  // Tạo id mới unique cho mỗi option
            }))
        };

        setCurrentQuestion(normalizedQuestion);
        setEditingQuestionId(question.questionId);
        setIsAddingQuestion(true);
    };

    const handleDeleteQuestion = async (questionId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this question?\n\n' +
            'This action cannot be undone and will also delete all options associated with this question.'
        );

        if (!confirmed) {
            console.log('❌ Delete cancelled by user');
            return;
        }

        try {
            await questionAPI.delete(quizId, questionId);

            setQuizData(prev => ({
                ...prev,
                questions: prev.questions.filter(q => q.questionId !== questionId)
            }));

            alert('Question deleted successfully!');

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
            alert(`Failed to delete question: ${errorMessage}`);
        }
    };

    const handleCancelQuestion = () => {
        setCurrentQuestion({
            questionText: '',
            questionExplain: '',
            options: [
                {
                    id: Date.now(),
                    optionText: '',
                    isTrueOption: false
                },
                {
                    id: Date.now() + 1,
                    optionText: '',
                    isTrueOption: false
                }
            ]
        });

        setIsAddingQuestion(false);
        setEditingQuestionId(null);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (PNG, JPG)');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            // Set file and create preview
            setThumbnailFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
                handleQuizChange('thumbnail', reader.result); // Save to quizData
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveThumbnail = () => {
        setThumbnailPreview(null);
        setThumbnailFile(null);
        handleQuizChange('thumbnail', '');
    };

    const handleThumbnailClick = () => {
        document.getElementById('thumbnail-input').click();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        Loading quiz data...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmitQuiz = async () => {
        if (quizData.status === 'draft') {
            // Publish quiz
            await quizAPI.update(quizId);

            // ...

            alert('Question deleted successfully!');

        } else {
            // Update quiz

        }
    }

    return (
        <div className="flex w-full space-y-10 space-x-10">
            {/* Sidebar */}
            <QuizBuilderSidebar handleSubmitQuiz={handleSubmitQuiz} quizId={quizId} />

            {/* Main Content */}
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
                        <div className="flex flex-col gap-y-2">
                            <p>
                                When creating your quiz, focus on writing questions that are clear and easy to understand. Provide 3–4 answer options for each question so learners have a fair chance to choose the correct one.
                            </p>
                            <p>
                                Be sure to include explanations for the correct answers, helping learners grasp the underlying concepts. Also, set a reasonable passing score, usually between 60–80%, to fairly evaluate their understanding while keeping the quiz challenging.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-1 gap-8 px-12 mt-5">
                        <div className="lg:col-span-1 space-y-16">
                            {/* Quiz Information */}
                            <div className="bg-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Basic Information
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Thumbnail Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Thumbnail Image
                                        </label>

                                        {/* Hidden File Input */}
                                        <input
                                            id="thumbnail-input"
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleThumbnailChange}
                                            className="hidden"
                                        />

                                        {/* Upload area or Preview */}
                                        {/* Upload area or Preview */}
                                        {thumbnailPreview ? (
                                            // Preview Image
                                            <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                                                <img
                                                    src={thumbnailPreview}
                                                    alt="Thumbnail preview"
                                                    className="w-full h-64 object-cover"
                                                />

                                                {/* Remove button */}
                                                <button
                                                    onClick={handleRemoveThumbnail}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                {/* Change image button */}
                                                <button
                                                    onClick={handleThumbnailClick}
                                                    className="absolute bottom-2 right-2 px-4 py-1 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                                                >
                                                    Change Image
                                                </button>
                                            </div>
                                        ) : (
                                            // Upload Area
                                            <div
                                                onClick={handleThumbnailClick}
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer"
                                            >
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 mb-1">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quiz Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Quiz Title
                                            <span className="text-red-500">*</span>
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
                                            <option value="">
                                                Select a category
                                            </option>
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
                                </div>
                            </div>

                            {/* Questions Information */}
                            <div className="bg-white pb-15">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Questions
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {quizData.questions.length} questions added
                                            </p>
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
                                {quizData.questions.length > 0 && !isAddingQuestion ? (
                                    <div className="space-y-3">
                                        {quizData.questions.map((question, index) => (
                                            <div
                                                key={question.questionId}
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
                                                                    onClick={() => handleDeleteQuestion(question.questionId)}
                                                                    className="p-1.5 hover:bg-red-100 rounded-lg transition"
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="ml-6 text-sm text-gray-600">
                                                            {question.options?.length || 0} options
                                                            {question.options?.find(o => o.isTrueOption) && (
                                                                <>
                                                                    {' '}•{' '}
                                                                    <span className="text-green-600 font-medium">
                                                                        Correct: {question.options.find(o => o.isTrueOption).optionText}
                                                                    </span>
                                                                </>
                                                            )}
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
        </div>
    )
};

export default QuizBuilder;
