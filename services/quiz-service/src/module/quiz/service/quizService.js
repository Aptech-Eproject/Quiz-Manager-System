const { Quiz, Question, Option } = require('../../../../models');

const getAllQuizzes = async () => {
  return await Quiz.findAll({
    include: [
      {
        model: Question,
        as: 'questions',
        include: [
          {
            model: Option,
            as: 'options'
          }
        ]
      }
    ]
  });
};

const getQuizById = async (id) => {
  return await Quiz.findByPk(id);
};

const createQuiz = async (quizData) => {
  return await Quiz.create(quizData);
};

const updateQuiz = async (quizId, quizData) => {
  const quiz = await Quiz.findOne({ where: { quizId } });
  if (!quiz) console.log(`Quiz with id ${quizId} not found`);

  return await quiz.update(quizData);
};

const deleteQuiz = async (quizId) => {
  const quiz = await Quiz.findByPk(quizId);
  if (!quiz) console.log(`Quiz with id ${quizId} not found`);

  return await quiz.destroy();
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
};