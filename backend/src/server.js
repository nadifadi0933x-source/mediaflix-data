require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const sequelize = require('./config/database');
const { auth, adminOnly } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const animeRoutes = require('./routes/anime');
const mangaRoutes = require('./routes/manga');
const manhwaRoutes = require('./routes/manhwa');
const episodesRoutes = require('./routes/episodes');
const chaptersRoutes = require('./routes/chapters');
const userAccountRoutes = require('./routes/userAccount');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'درخواست‌های بیش از حد. لطفاً بعداً تلاش کنید.',
});
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/manga', mangaRoutes);
app.use('/api/manhwa', manhwaRoutes);
app.use('/api/episodes', episodesRoutes);
app.use('/api/chapters', chaptersRoutes);
app.use('/api/user', userAccountRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'سرور در حال اجراست.' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`سرور در حال اجراست: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('خطا در اتصال به دیتابیس:', err);
});

module.exports = app;
