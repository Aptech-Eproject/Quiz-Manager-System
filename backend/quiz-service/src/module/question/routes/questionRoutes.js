/**
 * ==========================================
 *              Question Routes
 * ==========================================
 */

/**
 * ----------------------------
 *   Import Module & Library
 * ----------------------------
 */
const express = require('express');
const questionRouter = express.Router({ mergeParams: true });
const questionController = require('../../question/controllers/questionController');

/**
 * ----------------------------
 *           Router
 * ----------------------------
 */
questionRouter.get(`/showAll`, questionController.getAllQuestions);
questionRouter.post(`/create`, questionController.createQuestion);
questionRouter.put(`/update/:questionId`, questionController.updateQuestion);
questionRouter.delete(`/delete/:questionId`, questionController.deleteQuestion);


/**
 * ----------------------------
 *       Export Module
 * ----------------------------
 */
module.exports = questionRouter;