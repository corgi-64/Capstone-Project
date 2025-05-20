const User = require('../models/userSchema');
const Activity = require('../models/Activity');

exports.followUser = async (req, res) => {
  try {
    const { currentUserId } = req.body; // id of the user who's clicking follow
    const { targetUserId } = req.params;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent duplicate follows
    if (targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUserId);

    await targetUser.save();
    await currentUser.save();

    // Log activity
    await Activity.create({
      type: 'FOLLOW',
      actor: currentUserId,
      targetUser: targetUserId
    });

    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    console.error("FOLLOW ERROR:", err);
    res.status(500).json({ error: 'Server error while following user' });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const { targetUserId } = req.params;

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is not following
    if (!targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    // Remove follower
    targetUser.followers.pull(currentUserId);
    currentUser.following.pull(targetUserId);

    await targetUser.save();
    await currentUser.save();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    console.error("UNFOLLOW ERROR:", err);
    res.status(500).json({ error: 'Server error while unfollowing user' });
  }
};

exports.getTimeline = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followingIds = currentUser.following;

    const activities = await Activity.find({ actor: { $in: followingIds } })
      .sort({ timestamp: -1 })
      .limit(50)
      .populate('actor targetUser post');

    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching timeline' });
  }
};