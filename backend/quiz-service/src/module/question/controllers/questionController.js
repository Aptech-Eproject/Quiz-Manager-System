/**
 * ==========================================
 *            Question Controller
 * ==========================================
 */

/**
 * ---------------------------------
 *     Import Module & Library
 * ---------------------------------
 */
const response = require('../../../shared/utils/response');
const questionService = require('../services/questionService');


/**
 * ---------------------------------
 *          Function CRUD
 * ---------------------------------
 */
const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions(req.params.quizId);
        response.success(res, '✅ Get all questions successfully', questions);

    } catch (err) {
        response.error(res, `Failed to getting all questions`);
        console.log(`Error Detail: ${err.message}`);
    }
};

const getQuestionById = async (req, res) => {

};

const createQuestion = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { questionText, questionExplain, options } = req.body;

        // Validate required fields
        if (!questionText || !questionText.trim()) {
            return response.error(res, 'Question text is required', 400);
        }
        if (!options || !Array.isArray(options) || options.length < 2) {
            return response.error(res, 'At least 2 options are required', 400);
        }

        const hasCorrectAnswer = options.some(opt => opt.isTrueOption === true);
        if (!hasCorrectAnswer) {
            return response.error(res, 'At least one option must be marked as correct', 400);
        }

        const allOptionsHaveText = options.every(opt => opt.optionText && opt.optionText.trim());
        if (!allOptionsHaveText) {
            return response.error(res, 'All options must have text', 400);
        }

        const questionData = {
            questionText: questionText.trim(),
            questionExplain: questionExplain.trim(),
            options: options.map(opt => ({
                optionText: opt.optionText.trim(),
                isTrueOption: opt.isTrueOption || false
            }))
        };

        const newQuestion = await questionService.createQuestion(quizId, questionData);

        response.success(res, `✅ Created new question successfully`, newQuestion);

    } catch (err) {
        response.error(res, `Failed to creating new question`);
        console.log(`Error Detail: ${err.message}`);
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { quizId, questionId } = req.params;
        const { questionText, questionExplain, options } = req.body;

        // Validate IDs
        if (!quizId || !questionId) {
            return response.error(res, 'Quiz ID and Question ID are required', 400);
        }

        // Validate question text
        if (!questionText || !questionText.trim()) {
            return response.error(res, 'Question text is required', 400);
        }

        // Validate options if provided
        if (options) {
            if (!Array.isArray(options) || options.length < 2) {
                return response.error(res, 'At least 2 options are required', 400);
            }

            // Validate that at least one option is correct
            const hasCorrectAnswer = options.some(opt => opt.isTrueOption === true);
            if (!hasCorrectAnswer) {
                return response.error(res, 'At least one option must be marked as correct', 400);
            }

            // Validate all options have text
            const allOptionsHaveText = options.every(opt => opt.optionText && opt.optionText.trim());
            if (!allOptionsHaveText) {
                return response.error(res, 'All options must have text', 400);
            }

            // Prepare question data
            const questionData = {
                questionText: questionText.trim(),
                questionExplain: questionExplain?.trim() || '',
                options: options ? options.map(opt => ({
                    optionText: opt.optionText.trim(),
                    isTrueOption: opt.isTrueOption || false
                })) : []
            };

            // update 
            const updatedQuestion = await questionService.updateQuestion(quizId, questionId, questionData);

            if (!updatedQuestion) {
                return response.error(res, 'Question not found', 404);
            }

            response.success(res, '✅ Updated question successfully', updatedQuestion);

        }
    } catch (err) {
        response.error(res, `Failed to update question: ${err.message}`, 500);
        console.log(`Error Detail: ${err.message}`);
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { quizId, questionId } = req.params;

        // Validate required parameters
        if (!quizId) {
            return response.error(res, 'Quiz ID is required', 400);
        }
        if (!questionId) {
            return response.error(res, 'Question ID is required', 400);
        }

        // Call service to delete question and its options
        const deleted = await questionService.deleteQuestion(quizId, questionId);
        if (!deleted) {
            return response.error(res, 'Question not found or already deleted', 404);
        }

        response.success(res, '✅ Question and its options deleted successfully');

    } catch (err) {
        response.error(res, `Failed to delete question: ${err.message}`, 500);
        console.log(`Error Detail: ${err.message}`);
    }
};


/**
 * ---------------------------------
 *           Export Module
 * ---------------------------------
 */
module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}; 
