const UserWatchlist = require('../models/UserWatchlist');
const Anime = require('../models/Anime');
const Manga = require('../models/Manga');
const Manhwa = require('../models/Manhwa');

const getWatchlist = async (req, res) => {
  try {
    const watchlists = await UserWatchlist.findAll({
      where: { userId: req.user.id },
      order: [['updatedAt', 'DESC']],
    });

    const populated = await Promise.all(
      watchlists.map(async (wl) => {
        let item = null;
        if (wl.animeId) {
          item = await Anime.findByPk(wl.animeId);
        } else if (wl.mangaId) {
          item = await Manga.findByPk(wl.mangaId);
        } else if (wl.manhwaId) {
          item = await Manhwa.findByPk(wl.manhwaId);
        }
        return { ...wl.toJSON(), item };
      })
    );

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت لیست تماشا.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد.' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'خطا در به‌روزرسانی پروفایل.' });
  }
};

module.exports = { getWatchlist, updateProfile };
