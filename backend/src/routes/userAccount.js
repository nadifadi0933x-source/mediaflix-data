const express = require('express');
const { getWatchlist, updateProfile } = require('../controllers/userAccountController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/watchlist', auth, getWatchlist);
router.put('/profile', auth, updateProfile);

module.exports = router;
