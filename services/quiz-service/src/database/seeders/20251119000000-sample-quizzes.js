'use strict';

const quizzes = require('../data/quizzes-data'); // Sẽ tạo file này
const questions = require('../data/questions-data'); // Sẽ tạo file này
const options = require('../data/options-data'); // Sẽ tạo file này

module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    up: async (queryInterface, Sequelize) => {
        // 1. Seed Quiz table
        await queryInterface.bulkInsert('quizzes', quizzes.map(q => ({
            quizId: q.quizId,
            category: q.category,
            title: q.title,
            description: q.description,
            duration: q.duration,
            level: q.level,
            thumbnail: q.thumbnail,
            pass_score: q.pass_score,
            status: q.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        })), {});

        // 2. Seed Question table
        await queryInterface.bulkInsert('questions', questions.map(qs => ({
            questionId: qs.questionId,
            quizId: qs.quizId,
            questionText: qs.questionText,
            questionExplain: qs.questionExplain,
            createdAt: new Date(),
            updatedAt: new Date(),
        })), {});

        // 3. Seed Option table
        await queryInterface.bulkInsert('options', options.map(opt => ({
            optionId: opt.optionId,
            questionId: opt.questionId,
            optionText: opt.optionText,
            isTrueOption: opt.isTrueOption,
            createdAt: new Date(),
            updatedAt: new Date(),
        })), {});
    },

    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     */
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('options', null, {});
        await queryInterface.bulkDelete('questions', null, {});
        await queryInterface.bulkDelete('quizzes', null, {});
    }
};