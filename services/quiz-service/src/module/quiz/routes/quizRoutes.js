/**
 * ==========================================
 *              Quiz Routes
 * ==========================================
 */

/**
 * ----------------------------
 *   Import Module & Library
 * ----------------------------
 */
const express = require('express');
const quizRouter = express.Router();
const quizController = require('../controllers/quizController');
const questionRouter = require('../../question/routes/questionRoutes');
const questionController = require('../../question/controllers/questionController');

/**
 * ----------------------------
 *           Router
 * ----------------------------
 */
// question
quizRouter.use('/:quizId/questions', questionRouter);


quizRouter.get('/showAll', quizController.getAllQuizzes);
quizRouter.get('/get/:quizId', quizController.getQuizById);
quizRouter.post('/create', quizController.upload.single('thumbnail'), quizController.createQuiz);
quizRouter.put('/update/:quizId', quizController.upload.single('thumbnail'), quizController.updateQuiz);
quizRouter.delete('/:quizId', quizController.deleteQuiz);



/**
 * ----------------------------
 *       Export Module
 * ----------------------------
 */
module.exports = quizRouter;