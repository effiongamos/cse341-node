const express = require('express');
const { getContacts, createContact } = require('../controllers/contactsController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getContacts);
router.post('/', auth, createContact);

module.exports = router;
