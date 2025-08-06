// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
