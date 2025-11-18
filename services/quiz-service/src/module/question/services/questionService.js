/**
 * ==========================================
 *             Question Service
 * ==========================================
 */

/**
 * ---------------------------------
 *     Import Module & Library
 * ---------------------------------
 */
const { Question, Option, Quiz, sequelize } = require('../../../../models/');

/**
 * Get all questions with options
 */
const getAllQuestions = async (quizId) => {
    return await Question.findAll({
        where: { quizId },
        include: [
            {
                model: Option,
                as: 'options',
                attributes: ['optionId', 'optionText', 'isTrueOption']
            }
        ],
        order: [['createdAt', 'ASC']]
    });
};

/**
 * Get single question by ID
 */
const getQuestionById = async (quizId, questionId) => {
    return await Question.findOne({
        where: {
            questionId: questionId,
            quizId: quizId
        },
        include: [
            {
                model: Option,
                as: 'options',
                attributes: ['optionId', 'optionText', 'isTrueOption']
            }
        ]
    });
};

/**
 * Create question with options
 */
const createQuestion = async (quizId, questionData) => {
    const transaction = await sequelize.transaction();

    try {
        console.log('📝 Step 1: Checking if quiz exists...');
        const quiz = await Quiz.findByPk(quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }

        const newQuestion = await Question.create({
            quizId: quizId,
            questionText: questionData.questionText,
            questionExplain: questionData.questionExplain
        }, { transaction });

        const optionsToCreate = questionData.options.map(opt => ({
            questionId: newQuestion.questionId,
            optionText: opt.optionText,
            isTrueOption: opt.isTrueOption || false
        }));

        await Option.bulkCreate(optionsToCreate, { transaction });

        await transaction.commit();
        console.log('✅ Transaction committed successfully');

        const completeQuestion = await Question.findByPk(newQuestion.questionId, {
            include: [
                {
                    model: Option,
                    as: 'options',
                    attributes: [
                        'optionId',
                        'optionText',
                        'isTrueOption'
                    ]
                }
            ]
        });

        return completeQuestion;

    } catch (err) {
        await transaction.rollback();
        console.error('❌ Transaction rolled back due to error:', err.message);
        console.error('Error stack:', err.stack);
        throw err;
    }
};

/**
 * Update question and its options
 */
const updateQuestion = async (quizId, questionId, questionData) => {
    const transaction = await sequelize.transaction();

    try {
        const question = await Question.findOne({
            where: {
                questionId: questionId,
                quizId: quizId
            }
        });

        if (!question) {
            return null;
        }

        await question.update({
            questionText: questionData.questionText,
            questionExplain: questionData.questionExplain || null
        }, { transaction });

        if (questionData.options && questionData.options.length > 0) {
            await Option.destroy({
                where: { questionId: questionId },
                transaction
            });

            const optionsToCreate = questionData.options.map(option => ({
                questionId: questionId,
                optionText: option.optionText,
                isTrueOption: option.isTrueOption || false
            }));

            await Option.bulkCreate(optionsToCreate, { transaction });
        }

        await transaction.commit();

        return await Question.findByPk(questionId, {
            include: [
                {
                    model: Option,
                    as: 'options',
                    attributes: ['optionId', 'optionText', 'isTrueOption']
                }
            ]
        });

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

/**
 * Delete question and its options
 */
const deleteQuestion = async (quizId, questionId) => {
    const transaction = await sequelize.transaction();

    try {
        const question = await Question.findOne({
            where: {
                questionId: questionId,
                quizId: quizId
            }
        });

        if (!question) {
            return false;
        }

        await Option.destroy({
            where: { questionId: questionId },
            transaction
        });

        await question.destroy({ transaction });

        await transaction.commit();
        return true;

    } catch (error) {
        await transaction.rollback();
        throw error;
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