const express = require('express');
const {
  getMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga,
  createChapter,
  updateWatchlist,
} = require('../controllers/mangaController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getMangas);
router.get('/:id', getMangaById);
router.post('/', auth, adminOnly, createManga);
router.put('/:id', auth, adminOnly, updateManga);
router.delete('/:id', auth, adminOnly, deleteManga);

router.post('/:mangaId/chapters', auth, adminOnly, upload.array('images', 50), createChapter);
router.patch('/:mangaId/watchlist/:chapterNumber', auth, updateWatchlist);

module.exports = router;
