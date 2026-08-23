const Anime = require('../models/Anime');
const Episode = require('../models/Episode');
const UserWatchlist = require('../models/UserWatchlist');

const getAnimes = async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, status, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let where = {};
    if (genre) where.genre = genre;
    if (status) where.status = status;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const { count, rows } = await Anime.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      animes: rows,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت انیمه‌ها.' });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id, {
      include: [{
        model: Episode,
        as: 'episodes',
        order: [['episodeNumber', 'ASC']],
      }],
    });

    if (!anime) {
      return res.status(404).json({ message: 'انیمه مورد نظر یافت نشد.' });
    }

    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت انیمه.' });
  }
};

const createAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.status(201).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد انیمه.' });
  }
};

const updateAnime = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'انیمه مورد نظر یافت نشد.' });
    }

    await anime.update(req.body);
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی انیمه.' });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'انیمه مورد نظر یافت نشد.' });
    }

    await anime.destroy();
    res.json({ message: 'انیمه با موفقیت حذف شد.' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف انیمه.' });
  }
};

const createEpisode = async (req, res) => {
  try {
    const episode = await Episode.create({
      ...req.body,
      animeId: req.params.animeId,
    });
    res.status(201).json(episode);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد قسمت.' });
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { status } = req.body;
    const { animeId, episodeNumber } = req.params;

    const [watchlist, created] = await UserWatchlist.findOrCreate({
      where: {
        userId: req.user.id,
        animeId,
      },
      defaults: {
        userId: req.user.id,
        animeId,
        lastEpisode: parseInt(episodeNumber),
        status: status || 'watching',
      },
    });

    if (!created) {
      await watchlist.update({
        lastEpisode: parseInt(episodeNumber),
        status: status || watchlist.status,
      });
    }

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی لیست تماشا.' });
  }
};

module.exports = {
  getAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  createEpisode,
  updateWatchlist,
};
