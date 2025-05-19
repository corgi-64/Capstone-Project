const express = require('express');
const router = express.Router();
const FollowerController = require('./controllers/FollowerController');

router.post('/follow/:targetUserId', FollowerController.followUser);
router.get('/timeline/:userId', FollowerController.getTimeline);

module.exports = router;