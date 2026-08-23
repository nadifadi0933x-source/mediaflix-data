const Chapter = require('../models/Chapter');

const getChapters = async (req, res) => {
  try {
    const { type, id } = req.params;
    const where = type === 'manga' ? { mangaId: id } : { manhwaId: id };

    const chapters = await Chapter.findAll({
      where,
      order: [['chapterNumber', 'ASC']],
    });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت فصل‌ها.' });
  }
};

const getChapterById = async (req, res) => {
  try {
    const { type, id, chapterNumber } = req.params;
    const where = {
      chapterNumber: parseInt(chapterNumber),
      ...(type === 'manga' ? { mangaId: id } : { manhwaId: id }),
    };

    const chapter = await Chapter.findOne({ where });
    if (!chapter) {
      return res.status(404).json({ message: 'فصل مورد نظر یافت نشد.' });
    }

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت فصل.' });
  }
};

module.exports = { getChapters, getChapterById };
