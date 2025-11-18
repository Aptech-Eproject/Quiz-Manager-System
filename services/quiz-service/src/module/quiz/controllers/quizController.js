const quizService = require('../service/quizService');
const response = require('../../../shared/utils/response');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * ---------------------------------
 *          Config Multer
 * ---------------------------------
 */
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `thumbnail-${Date.now()}${ext}`;

    cb(null, fileName);
  }
});

const upload = multer({ storage });


/**
 * ---------------------------------
 *          Function CRUD
 * ---------------------------------
 */
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    response.success(res, `✅ Get all quizzes successfully`, quizzes);
  } catch (err) {
    response.error(res, `Failed to getting all quizzes`);
    console.log(`Error Detail: ${err.message}`);
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.quizId);
    response.success(res, `✅ Get the single quiz successfully`, quiz);

  } catch (err) {
    response.error(res, `Failed to getting the single quiz`);
    console.log(`Error Detail: ${err.message}`);
  }
};

const createQuiz = async (req, res) => {
  try {
    const quizData = { ...req.body };

    if (req.file) {
      quizData.thumbnail = `uploads/${req.file.filename}`;
    } else {
      const defaultImagePath = path.join(__dirname, '..', 'images', 'quiz-banner-default.jpg');
      const fileName = `thumbnail-${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);

      fs.copyFileSync(defaultImagePath, filePath);
      quizData.thumbnail = `uploads/${fileName}`;
    }

    console.log(`Thumbnail saved as: ${quizData.thumbnail}`);

    const newQuiz = await quizService.createQuiz(quizData);
    response.success(res, '✅ Created new quiz successfully', newQuiz, 201);

  } catch (err) {
    response.error(res, `Failed to creating new quiz`);
    console.log(`Error Detail: ${err.message}`);
  }
};

const updateQuiz = async (req, res) => {
  try {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    const quizId = req.params.quizId;
    console.log('quizId extracted:', quizId);

    if (req.file) {
      req.body.thumbnail = `uploads/${req.file.filename}`;
    }

    const updatedQuiz = await quizService.updateQuiz(quizId, req.body);
    response.success(res, `✅ Updated quiz successfully`, updatedQuiz);

  } catch (err) {
    response.error(res, `Failed to updating quiz`);
    console.log(`Error Detail: ${err.message}`);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await quizService.deleteQuiz(req.params.quizId);
    response.success(res, `✅ Deleted quiz successfully`, deletedQuiz);

  } catch (err) {
    response.error(res, `Failed to deleting quiz`);
    console.log(`Error Detail: ${err.message}`);
  }
};

module.exports = {
  upload,
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
};
