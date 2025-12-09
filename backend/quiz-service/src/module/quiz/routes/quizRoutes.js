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


/**
 * ----------------------------
 *           Router
 * ----------------------------
 */

// questions
quizRouter.use('/:quizId/questions', questionRouter);

// quiz
quizRouter.get('/showAll', quizController.getAllQuizzes);
quizRouter.get('/showHome', quizController.showHome);
quizRouter.get('/get/:quizId', quizController.getQuizById);
quizRouter.post('/create', quizController.upload.single('thumbnail'), quizController.createQuiz);
quizRouter.put('/update/:quizId', quizController.upload.single('thumbnail'), quizController.updateQuiz);
quizRouter.put('/publish/:quizId', quizController.upload.single('thumbnail'), quizController.publishQuiz);
quizRouter.delete('/delete/:quizId', quizController.deleteQuiz);
quizRouter.get('/statistics/category-by-quiz', quizController.statisticsByCategory);



/**
 * ----------------------------
 *       Export Module
 * ----------------------------
 */
module.exports = quizRouter;