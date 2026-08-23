const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');
const UserWatchlist = require('../models/UserWatchlist');

const getMangas = async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, status, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let where = {};
    if (genre) where.genre = genre;
    if (status) where.status = status;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const { count, rows } = await Manga.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      mangas: rows,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت منگاها.' });
  }
};

const getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id, {
      include: [{
        model: Chapter,
        as: 'chapters',
        order: [['chapterNumber', 'ASC']],
      }],
    });

    if (!manga) {
      return res.status(404).json({ message: 'منگا مورد نظر یافت نشد.' });
    }

    res.json(manga);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت منگا.' });
  }
};

const createManga = async (req, res) => {
  try {
    const manga = await Manga.create(req.body);
    res.status(201).json(manga);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد منگا.' });
  }
};

const updateManga = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: 'منگا مورد نظر یافت نشد.' });
    }

    await manga.update(req.body);
    res.json(manga);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی منگا.' });
  }
};

const deleteManga = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: 'منگا مورد نظر یافت نشد.' });
    }

    await manga.destroy();
    res.json({ message: 'منگا با موفقیت حذف شد.' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف منگا.' });
  }
};

const createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create({
      ...req.body,
      mangaId: req.params.mangaId,
    });
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد فصل.' });
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { status } = req.body;
    const { mangaId, chapterNumber } = req.params;

    const [watchlist, created] = await UserWatchlist.findOrCreate({
      where: {
        userId: req.user.id,
        mangaId,
      },
      defaults: {
        userId: req.user.id,
        mangaId,
        lastChapter: parseInt(chapterNumber),
        status: status || 'watching',
      },
    });

    if (!created) {
      await watchlist.update({
        lastChapter: parseInt(chapterNumber),
        status: status || watchlist.status,
      });
    }

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی لیست تماشا.' });
  }
};

module.exports = {
  getMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga,
  createChapter,
  updateWatchlist,
};
