const { Quiz, Question, Option, Sequelize } = require('../../../../models');


const getAllQuizzes = async (page = 1, isAdmin = false) => {
  const limit = 9;
  const offset = (page - 1) * limit;

  const whereCondition = isAdmin ? {} : { status: 'published' }
  const totalCount = await Quiz.count({ where: whereCondition });

  const quizzes = await Quiz.findAll({
    where: whereCondition,
    limit: limit,
    offset: offset,
    order: [
      ['updatedAt', 'DESC']
    ],
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

  return {
    quizzes,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalQuizzes: totalCount
  };
};

const getQuizById = async (quizId) => {
  return await Quiz.findByPk(quizId, {
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

const showHome = async () => {
  return await Quiz.findAll({
    where: { status: 'published' },
    limit: 6,
    order: [
      ['updatedAt', 'DESC']
    ],
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

const createQuiz = async (quizData) => {
  return await Quiz.create(quizData);
};

const updateQuiz = async (quizId, quizData) => {
  const quiz = await Quiz.findOne({ where: { quizId } });
  if (!quiz) throw new Error(`Quiz with id ${quizId} not found`);

  return await quiz.update(quizData);
};

const publishQuiz = async (quizId, quizData) => {
  const quizDataPublished = {
    ...quizData,
    status: 'published'
  };

  const quiz = await Quiz.findOne({ where: { quizId } });
  if (!quiz) throw new Error(`Quiz with id ${quizId} not found`);

  return await quiz.update(quizDataPublished);
};

const deleteQuiz = async (quizId) => {
  const quiz = await Quiz.findByPk(quizId);
  if (!quiz) console.log(`Quiz with id ${quizId} not found`);

  return await quiz.destroy();
};

const statisticsByCategory = async () => {
  return await Quiz.findAll({
    attributes: [
      'category',
      [Sequelize.fn('COUNT', Sequelize.col('quizId')), 'total']
    ],
    where: { status: 'published' },
    group: ['category'],
    order: [
      ['category', 'ASC']
    ]
  });
}

module.exports = {
  getAllQuizzes,
  showHome,
  getQuizById,
  createQuiz,
  updateQuiz,
  publishQuiz,
  deleteQuiz,
  statisticsByCategory
};