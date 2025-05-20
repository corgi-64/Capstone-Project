const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FOLLOW', 'POST'], // You can expand this later (LIKE, COMMENT, etc.)
    required: true
  },
  actor: { // the user who performed the action
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetUser: { // for FOLLOW actions
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: { // for POST actions
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);