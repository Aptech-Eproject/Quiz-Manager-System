const { body } = require('express-validator');

const submitResultValidator = [
  body('quizId').notEmpty().withMessage('Quiz ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('answers').isArray().withMessage('Answers must be an array'),
  body('score').optional().isNumeric().withMessage('Score must be a number'),
];

module.exports = { submitResultValidator };
