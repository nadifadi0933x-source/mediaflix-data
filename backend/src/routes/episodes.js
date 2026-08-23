const express = require('express');
const { getEpisodes, getEpisodeById } = require('../controllers/episodesController');

const router = express.Router();

router.get('/:animeId', getEpisodes);
router.get('/:animeId/:episodeNumber', getEpisodeById);

module.exports = router;
