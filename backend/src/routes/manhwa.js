const express = require('express');
const {
  getManhwas,
  getManhwaById,
  createManhwa,
  updateManhwa,
  deleteManhwa,
  createChapter,
  updateWatchlist,
} = require('../controllers/manhwaController');
const { auth, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getManhwas);
router.get('/:id', getManhwaById);
router.post('/', auth, adminOnly, createManhwa);
router.put('/:id', auth, adminOnly, updateManhwa);
router.delete('/:id', auth, adminOnly, deleteManhwa);

router.post('/:manhwaId/chapters', auth, adminOnly, upload.array('images', 50), createChapter);
router.patch('/:manhwaId/watchlist/:chapterNumber', auth, updateWatchlist);

module.exports = router;
