const express = require('express');
const { getChapters, getChapterById } = require('../controllers/chaptersController');

const router = express.Router();

router.get('/:type/:id', getChapters);
router.get('/:type/:id/:chapterNumber', getChapterById);

module.exports = router;
