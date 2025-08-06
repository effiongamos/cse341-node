// routes/contacts.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Contact = require('../models/contact'); // <-- import the model

// GET /contacts - Get all contacts for authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
