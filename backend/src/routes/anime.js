const express = require('express');
const {
  getAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
  createEpisode,
  updateWatchlist,
} = require('../controllers/animeController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getAnimes);
router.get('/:id', getAnimeById);
router.post('/', auth, adminOnly, createAnime);
router.put('/:id', auth, adminOnly, updateAnime);
router.delete('/:id', auth, adminOnly, deleteAnime);

router.post('/:animeId/episodes', auth, adminOnly, upload.single('video'), createEpisode);
router.patch('/:animeId/watchlist/:episodeNumber', auth, updateWatchlist);

module.exports = router;
