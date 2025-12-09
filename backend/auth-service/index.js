const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

const healthHandler = (req, res) => {
  res.json({ status: 'OK', service: 'auth-service' });
};

app.get('/health', healthHandler);
app.get('/api/auth/health', healthHandler);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🔐 Auth Service running on port ${PORT}`);
  });
});
