const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const db = require('./models');
const quizRouter = require('./src/module/quiz/routes/quizRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(__dirname, 'src/module/quiz/uploads');
app.use('/uploads', express.static(uploadsPath));

app.use(helmet());

app.get('/api/quiz/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'quiz-service'
  });
});

app.use('/api/quiz', quizRouter);

const PORT = process.env.PORT || 5001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🧠 Quiz Service running on port ${PORT}`);
  });
});