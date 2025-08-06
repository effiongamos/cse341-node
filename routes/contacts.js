const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactsController');

router.post('/', contactController.createContact);
// other routes...

module.exports = router;
