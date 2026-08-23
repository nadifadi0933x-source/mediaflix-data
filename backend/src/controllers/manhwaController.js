const Manhwa = require('../models/Manhwa');
const Chapter = require('../models/Chapter');
const UserWatchlist = require('../models/UserWatchlist');

const getManhwas = async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, status, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let where = {};
    if (genre) where.genre = genre;
    if (status) where.status = status;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const { count, rows } = await Manhwa.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      manhwas: rows,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت مانهواها.' });
  }
};

const getManhwaById = async (req, res) => {
  try {
    const manhwa = await Manhwa.findByPk(req.params.id, {
      include: [{
        model: Chapter,
        as: 'chapters',
        order: [['chapterNumber', 'ASC']],
      }],
    });

    if (!manhwa) {
      return res.status(404).json({ message: 'مانهوا مورد نظر یافت نشد.' });
    }

    res.json(manhwa);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت مانهوا.' });
  }
};

const createManhwa = async (req, res) => {
  try {
    const manhwa = await Manhwa.create(req.body);
    res.status(201).json(manhwa);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد مانهوا.' });
  }
};

const updateManhwa = async (req, res) => {
  try {
    const manhwa = await Manhwa.findByPk(req.params.id);
    if (!manhwa) {
      return res.status(404).json({ message: 'مانهوا مورد نظر یافت نشد.' });
    }

    await manhwa.update(req.body);
    res.json(manhwa);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی مانهوا.' });
  }
};

const deleteManhwa = async (req, res) => {
  try {
    const manhwa = await Manhwa.findByPk(req.params.id);
    if (!manhwa) {
      return res.status(404).json({ message: 'مانهوا مورد نظر یافت نشد.' });
    }

    await manhwa.destroy();
    res.json({ message: 'مانهوا با موفقیت حذف شد.' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف مانهوا.' });
  }
};

const createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create({
      ...req.body,
      manhwaId: req.params.manhwaId,
    });
    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'خطا در ایجاد فصل.' });
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { status } = req.body;
    const { manhwaId, chapterNumber } = req.params;

    const [watchlist, created] = await UserWatchlist.findOrCreate({
      where: {
        userId: req.user.id,
        manhwaId,
      },
      defaults: {
        userId: req.user.id,
        manhwaId,
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
  getManhwas,
  getManhwaById,
  createManhwa,
  updateManhwa,
  deleteManhwa,
  createChapter,
  updateWatchlist,
};
