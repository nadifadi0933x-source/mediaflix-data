const Episode = require('../models/Episode');

const getEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.findAll({
      where: { animeId: req.params.animeId },
      order: [['episodeNumber', 'ASC']],
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت قسمت‌ها.' });
  }
};

const getEpisodeById = async (req, res) => {
  try {
    const episode = await Episode.findOne({
      where: {
        animeId: req.params.animeId,
        episodeNumber: req.params.episodeNumber,
      },
    });

    if (!episode) {
      return res.status(404).json({ message: 'قسمت مورد نظر یافت نشد.' });
    }

    res.json(episode);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت قسمت.' });
  }
};

module.exports = { getEpisodes, getEpisodeById };
