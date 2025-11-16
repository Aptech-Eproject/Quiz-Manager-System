const { body } = require('express-validator');

const createQuizValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('questions').isArray().withMessage('Questions must be an array'),
];

const updateQuizValidator = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
];

module.exports = { createQuizValidator, updateQuizValidator };
