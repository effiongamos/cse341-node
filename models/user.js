const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },

  role: {
    type: String,
    enum: ['admin', 'member', 'guest'],
    default: 'me'
  },
  bio: {
    type: String,
    maxlength: 200
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
