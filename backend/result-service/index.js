const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const db = require('./models');

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'result-service' });
});

const PORT = process.env.PORT || 5002;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`📊 Result Service running on port ${PORT}`);
  });
});
