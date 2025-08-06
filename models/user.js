const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // Only for normal signup
  role: { type: String, default: 'user' }, // e.g., 'admin', 'user'
  token: String, // For JWT token storage
  googleId: String
});

module.exports = mongoose.model('user', userSchema);








