const express = require('express');
const router = express.Router();
const FollowerController = require('./controllers/FollowerController');
const User = require('./models/userSchema');

router.post('/follow/:targetUserId', FollowerController.followUser);
router.get('/timeline/:userId', FollowerController.getTimeline);
router.post('/unfollow/:targetUserId', FollowerController.unfollowUser);
router.get('/search-users', async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username, $options: 'i' }
    }).select('_id username');
    res.json(users);
  } catch (err) {
    console.error("User search failed:", err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /user/follow-stats/:userId
router.get('/user/follow-stats/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('followers following');
    res.json({
      followersCount: user.followers.length,
      followingCount: user.following.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get follower data' });
  }
});

// Get list of followers
router.get('/user/:userId/followers', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('followers', '_id username');
    res.json(user.followers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
});

// Get list of users being followed
router.get('/user/:userId/following', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('following', '_id username');
    res.json(user.following);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch following list' });
  }
});

module.exports = router;